import {Component, inject, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import {HomeFacade} from "../../home.facade";
import {SpinnerComponent} from "../../../../core/components/spinner/spinner.component";
import {TableComponent} from "../../../../core/components/table/table.component";
import {ImageComponent} from "../../../../core/components/image/image.component";
import {ClubDetailComponent} from "./club-detail/club-detail.component";
import {ClubSearchComponent} from "./club-search/club-search.component";

@Component({
  selector: 'app-selected-club',
  standalone: true,
  imports: [CommonModule, SpinnerComponent, TableComponent, ImageComponent, ClubDetailComponent, ClubSearchComponent],
  templateUrl: './selected-club.component.html',
  styleUrls: ['./selected-club.component.scss']
})
export class SelectedClubComponent {
  homeFacade = inject(HomeFacade);

  readonly selectedClub = this.homeFacade.selectedClub;
  readonly filterClubString = this.homeFacade.filterClubString;
  readonly searchClubResults = this.homeFacade.searchClubResults;

  search(filter: string) {
    this.homeFacade.updateSearchClubFilter(filter);
  }
}
