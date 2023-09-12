import {computed, inject, Injectable, signal, WritableSignal} from "@angular/core";
import {CompetitionService} from "../../core/services/competition.service";
import {takeUntilDestroyed, toObservable, toSignal} from "@angular/core/rxjs-interop";
import {CompetitionModel} from "../../core/models/competition.model";
import {debounceTime, delay, distinctUntilChanged, map, Observable, tap} from "rxjs";
import {query} from "@angular/animations";

@Injectable()
export class HomeFacade {
  readonly competitionService = inject(CompetitionService);

  // signals
  private _competitions = signal<CompetitionModel[]>([]);
  private _loading = signal<boolean>(false);
  private _filterString = signal<string | null>(null);

  // readonly objects
  readonly competitions = this._competitions.asReadonly();
  readonly loading = this._loading.asReadonly();
  readonly filterString = this._filterString.asReadonly();
  readonly numberOfCompetitions = computed(() => this.searchResults().length);
  readonly searchResults = toSignal(
    toObservable(this.filterString).pipe(
      debounceTime(300),
      distinctUntilChanged(),
      map(filter =>
        filter != null ?
          this.competitions().filter(competition => competition.name.toLowerCase().includes(filter.toLowerCase()))
          : this.competitions()
      ),
    ), { initialValue: [] as CompetitionModel[]}
  );


  constructor() {
    this.#loadCompetitions().pipe(
      takeUntilDestroyed()
    ).subscribe((data) => {
      this._competitions.set(data);
      this._filterString.set('');
    });
  }


  #loadCompetitions(): Observable<CompetitionModel[]>  {
    this._loading.set(true);
    return this.competitionService.getCompetitions().pipe(
      delay(1000),
      tap(() => this._loading.set(false))
    );
  }


  updateSearchFilter(filter: string) {
    this._filterString.set(filter);
  }
}
