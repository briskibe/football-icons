import {Component, EventEmitter, Input, OnChanges, Output} from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterLink} from "@angular/router";
import {FormsModule} from "@angular/forms";
import {CompetitionModel} from "../../models/competition.model";

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent {
  @Input() competitions: CompetitionModel[] = [];
  @Input() numberOfCompetitions = 0;
  @Input() searchFilter: string | null = null;
  @Output() onFilter = new EventEmitter<string>();

  search(filter: string) {
    this.onFilter.emit(filter);
  }
}
