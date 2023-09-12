import {Component, inject} from '@angular/core';
import { CommonModule } from '@angular/common';
import {HomeFacade} from "../../home.facade";
import {TableComponent} from "../../../../core/components/table/table.component";
import {SpinnerComponent} from "../../../../core/components/spinner/spinner.component";

@Component({
  selector: 'app-competition-list',
  standalone: true,
  imports: [CommonModule, TableComponent, SpinnerComponent],
  providers: [HomeFacade],
  templateUrl: './competition-list.component.html',
  styleUrls: ['./competition-list.component.scss']
})
export class CompetitionListComponent {
  homeFacade = inject(HomeFacade);

  // readonly objects
  readonly competitions = this.homeFacade.searchResults;
  readonly loading = this.homeFacade.loading;
  readonly numberOfCompetitions = this.homeFacade.numberOfCompetitions;
  readonly filterString = this.homeFacade.filterString;

  search(filter: string) {
    this.homeFacade.updateSearchFilter(filter);
  }
}
