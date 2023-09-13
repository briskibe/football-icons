import {Component, EventEmitter, Input, Output} from '@angular/core';
import { CommonModule } from '@angular/common';
import {ClubModel} from "../../../../../../core/models/club.model";

@Component({
  selector: 'app-club-search-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './club-search-list.component.html',
  styleUrls: ['./club-search-list.component.scss']
})
export class ClubSearchListComponent {
  @Input() searchClubResults: ClubModel[] | null  = null;
  @Output() onSelectedClub = new EventEmitter<number>();


  updateSelectedClub(clubId: number) {
    this.onSelectedClub.emit(clubId);
  }
}
