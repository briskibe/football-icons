import {computed, inject, Injectable, Signal, signal} from "@angular/core";
import {CompetitionService} from "../../core/services/competition.service";
import {takeUntilDestroyed, toObservable, toSignal} from "@angular/core/rxjs-interop";
import {CompetitionModel} from "../../core/models/competition.model";
import {
  combineLatest,
  debounceTime,
  delay,
  distinctUntilChanged,
  filter,
  map,
  merge,
  Observable,
  switchMap,
  tap
} from "rxjs";
import {ClubService} from "../../core/services/club.service";
import {ClubModel} from "../../core/models/club.model";
import {INITIAL_CLUB_ID} from "../../app.config";
import { of } from "rxjs";

@Injectable()
export class HomeFacade {
  readonly competitionService = inject(CompetitionService);
  readonly clubService = inject(ClubService);
  readonly INITIAL_CLUB_ID = inject(INITIAL_CLUB_ID);

  // signals - competition view
  private _competitions = signal<CompetitionModel[]>([]);
  private _loading = signal<boolean>(false);
  private _filterString = signal<string | null>(null);

  // readonly objects - competition view
  readonly competitions = this._competitions.asReadonly();
  readonly loading = this._loading.asReadonly();
  readonly filterString = this._filterString.asReadonly();
  readonly numberOfCompetitions = computed(() => this.searchResults().length);
  readonly searchResults = toSignal(
    merge(this.filterStringChangedObservable$(), toObservable(this.competitions)).pipe(tap((res) => console.log(res))), { initialValue: [] as CompetitionModel[]}
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


  // signals - club detail view
  private _selectedClubId = signal<number>(this.INITIAL_CLUB_ID);
  private _selectedClub = signal<ClubModel | null>(null);
  private _filterClubString = signal<string>('');
  private _searchClubEnabled = signal<boolean>(false);

  // readonly objects - club detail view
  readonly selectedClubId = this._selectedClubId.asReadonly();
  readonly selectedClub = this._selectedClub.asReadonly();
  readonly filterClubString = this._filterClubString.asReadonly();
  readonly searchClubEnabled = this._searchClubEnabled.asReadonly();

  readonly searchClubResults: Signal<ClubModel[]> = toSignal(
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


  constructor() {
    /*toObservable(this._selectedClubId).pipe(
      switchMap(() => this.#loadClub()),
      switchMap(club => {
        this._selectedClub.set(club);
        return this.#loadCompetitions(club.id)
      }),
      takeUntilDestroyed()
    ).subscribe((data) => {
      this._competitions.set(data);
      this.updateSearchFilter('');
    });*/

    toObservable(this._selectedClubId).pipe(
      switchMap((clubId) => combineLatest([this.#loadClub(), this.#loadCompetitions(clubId)])),
      takeUntilDestroyed()
    ).subscribe((data) => {
      this._selectedClub.set(data[0]);
      this._competitions.set(data[1]);
      this.updateSearchFilter('');
    });
  }


  #loadCompetitions(teamId: number): Observable<CompetitionModel[]>  {
    return this.competitionService.getCompetitions(teamId).pipe(
      delay(1000),
      tap(() => this._loading.set(false))
    );
  }

  #loadClub() {
    this._selectedClub.set(null);
    this._loading.set(true);
    return this.clubService.getClub(this.selectedClubId()).pipe(delay(1000));
  }


  updateSearchFilter(filter: string) {
    this._filterString.set(filter);
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
    this._selectedClubId.set(clubId);
  }
}
