import {inject, Injectable, signal} from "@angular/core";
import {INITIAL_CLUB_ID} from "../../app.config";

@Injectable()
export class HomeFacade {
  readonly INITIAL_CLUB_ID = inject(INITIAL_CLUB_ID);

  // signals
  private _loading = signal<boolean>(false);
  private _selectedClubId = signal<number>(this.INITIAL_CLUB_ID);


  // readonly objects
  readonly loading = this._loading.asReadonly();
  readonly selectedClubId = this._selectedClubId.asReadonly();


  updateLoading(loading: boolean) {
    this._loading.set(loading);
  }

  updateSelectedClubId(clubId: number) {
    this._selectedClubId.set(clubId);
  }
}
