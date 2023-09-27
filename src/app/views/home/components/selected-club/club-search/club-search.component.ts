import {Component, EventEmitter, inject, Input, Output} from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule} from "@angular/forms";
import {ClubModel} from "../../../../../core/models/club.model";
import {ClubSearchListComponent} from "./club-search-list/club-search-list.component";
import {SelectedClubFacade} from "../selected-club.facade";

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

  selectedClubFacade = inject(SelectedClubFacade);

  readonly searchClubEnabled = this.selectedClubFacade.searchClubEnabled;

  search(filter: string) {
    this.onFilter.emit(filter);
  }

  updateSelectedClub(clubId: number) {
    this.selectedClubFacade.updateSelectedClubId(clubId);
  }
}
