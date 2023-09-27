import {Component, inject, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import {HomeFacade} from "../../home.facade";
import {SpinnerComponent} from "../../../../core/components/spinner/spinner.component";
import {TableComponent} from "../../../../core/components/table/table.component";
import {ImageComponent} from "../../../../core/components/image/image.component";
import {ClubDetailComponent} from "./club-detail/club-detail.component";
import {ClubSearchComponent} from "./club-search/club-search.component";
import {SelectedClubFacade} from "./selected-club.facade";

@Component({
  selector: 'app-selected-club',
  standalone: true,
  imports: [CommonModule, SpinnerComponent, TableComponent, ImageComponent, ClubDetailComponent, ClubSearchComponent],
  templateUrl: './selected-club.component.html',
  styleUrls: ['./selected-club.component.scss']
})
export class SelectedClubComponent {
  selectedClubFacade = inject(SelectedClubFacade);
  homeFacade = inject(HomeFacade);

  readonly loading = this.homeFacade.loading;
  readonly selectedClub = this.selectedClubFacade.selectedClub;
  readonly filterClubString = this.selectedClubFacade.filterClubString;
  readonly searchClubResults = this.selectedClubFacade.searchClubResults;

  search(filter: string) {
    this.selectedClubFacade.updateSearchClubFilter(filter);
  }
}
