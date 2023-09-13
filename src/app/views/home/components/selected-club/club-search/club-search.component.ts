import {Component, EventEmitter, inject, Input, Output} from '@angular/core';
import { CommonModule } from '@angular/common';
import {HomeFacade} from "../../../home.facade";
import {FormsModule} from "@angular/forms";
import {ClubModel} from "../../../../../core/models/club.model";
import {ClubSearchListComponent} from "./club-search-list/club-search-list.component";

@Component({
  selector: 'app-club-search',
  standalone: true,
  imports: [CommonModule, FormsModule, ClubSearchListComponent],
  templateUrl: './club-search.component.html',
  styleUrls: ['./club-search.component.scss']
})
export class ClubSearchComponent {
  @Input() searchFilter: string | null = null;
  @Input() searchClubResults: ClubModel[] = [];
  @Output() onFilter = new EventEmitter<string>();

  homeFacade = inject(HomeFacade);

  readonly searchClubEnabled = this.homeFacade.searchClubEnabled;

  search(filter: string) {
    this.onFilter.emit(filter);
  }

  updateSelectedClub(clubId: number) {
    this.homeFacade.updateSelectedClubId(clubId);
  }
}
