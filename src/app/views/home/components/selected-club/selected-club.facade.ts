import {inject, Injectable, signal} from "@angular/core";
import {ClubService} from "../../../../core/services/club.service";
import {ClubModel} from "../../../../core/models/club.model";
import {takeUntilDestroyed, toObservable, toSignal} from "@angular/core/rxjs-interop";
import {debounceTime, delay, distinctUntilChanged, filter, map, of, switchMap} from "rxjs";
import {HomeFacade} from "../../home.facade";

@Injectable()
export class SelectedClubFacade {
  readonly clubService = inject(ClubService);
  readonly homeFacade = inject(HomeFacade);

  // signals
  private _filterClubString = signal<string>('');
  private _searchClubEnabled = signal<boolean>(false);

  readonly selectedClub = toSignal(
    toObservable(this.homeFacade.selectedClubId).pipe(
      switchMap(() => this.#loadClub()),
      takeUntilDestroyed()
    ), { initialValue: null as ClubModel | null }
  )
  readonly filterClubString = this._filterClubString.asReadonly();
  readonly searchClubEnabled = this._searchClubEnabled.asReadonly();

  readonly searchClubResults = toSignal(
    toObservable(this.filterClubString).pipe(
      debounceTime(1000),
      distinctUntilChanged(),
      filter(filter => {
        return filter != null && (filter.length > 3 || filter == '')
      }),
      switchMap(filter => (filter !== '') ? this.clubService.searchClubs(filter) : of([])),
      map(data => data.result)
    )
  );

  #loadClub() {
    this.homeFacade.updateLoading(true);
    return this.clubService.getClub(this.homeFacade.selectedClubId()).pipe(delay(1000));
  }

  updateSearchClubFilter(filter: string) {
    this._filterClubString.set(filter);
  }

  updateSearchClubEnabled() {
    this._searchClubEnabled.set(!this.searchClubEnabled());
  }

  updateSelectedClubId(clubId: number) {
    this.updateSearchClubEnabled();
    this.updateSearchClubFilter('');
    this.homeFacade.updateSelectedClubId(clubId);
  }
}
