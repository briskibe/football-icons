import {computed, inject, Injectable, signal} from "@angular/core";
import {toObservable, toSignal} from "@angular/core/rxjs-interop";
import {debounceTime, delay, distinctUntilChanged, map, merge, Observable, switchMap, tap} from "rxjs";
import {CompetitionModel} from "../../../../core/models/competition.model";
import {CompetitionService} from "../../../../core/services/competition.service";
import {HomeFacade} from "../../home.facade";

@Injectable()
export class CompetitionListFacade {
  readonly competitionService = inject(CompetitionService);
  readonly homeFacade = inject(HomeFacade);

  // signals
  private _filterString = signal<string | null>(null);

  // readonly objects
  readonly filterString = this._filterString.asReadonly();
  readonly numberOfCompetitions = computed(() => this.searchResults().length);
  readonly competitions = toSignal(
    toObservable(this.homeFacade.selectedClubId).pipe(
      switchMap((clubId) => {
        this._filterString.set('');
        return this.#loadCompetitions(clubId)
      })
    ), { initialValue: [] as CompetitionModel[]}
  );

  readonly searchResults = toSignal(
    merge(this.filterStringChangedObservable$(), toObservable(this.competitions)), { initialValue: [] as CompetitionModel[]}
  );

  private filterStringChangedObservable$() {
    return toObservable(this.filterString).pipe(
      debounceTime(300),
      distinctUntilChanged(),
      map(filter =>
        filter != null ?
          this.competitions().filter(competition => competition.name.toLowerCase().includes(filter.toLowerCase()))
          : this.competitions()
      )
    )
  }

  #loadCompetitions(teamId: number): Observable<CompetitionModel[]>  {
    return this.competitionService.getCompetitions(teamId).pipe(
      delay(1000),
      tap(() => this.homeFacade.updateLoading(false))
    );
  }

  updateSearchFilter(filter: string) {
    this._filterString.set(filter);
  }
}
