import {Component, inject, OnChanges} from '@angular/core';
import { CommonModule } from '@angular/common';
import {HomeFacade} from "../../home.facade";
import {TableComponent} from "../../../../core/components/table/table.component";
import {SpinnerComponent} from "../../../../core/components/spinner/spinner.component";
import {CompetitionListFacade} from "./competition-list.facade";

@Component({
  selector: 'app-competition-list',
  standalone: true,
  imports: [CommonModule, TableComponent, SpinnerComponent],
  providers: [CompetitionListFacade],
  templateUrl: './competition-list.component.html',
  styleUrls: ['./competition-list.component.scss']
})
export class CompetitionListComponent {
  readonly competitionListFacade = inject(CompetitionListFacade);
  readonly homeFacade = inject(HomeFacade);

  // readonly objects
  readonly competitions = this.competitionListFacade.searchResults;
  readonly loading = this.homeFacade.loading;
  readonly numberOfCompetitions = this.competitionListFacade.numberOfCompetitions;
  readonly filterString = this.competitionListFacade.filterString;

  search(filter: string) {
    this.competitionListFacade.updateSearchFilter(filter);
  }
}
