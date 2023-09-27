import {Component, inject, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterLink} from "@angular/router";
import {TableComponent} from "../../core/components/table/table.component";
import {SpinnerComponent} from "../../core/components/spinner/spinner.component";
import {CompetitionListComponent} from "./components/competition-list/competition-list.component";
import {SelectedClubComponent} from "./components/selected-club/selected-club.component";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterLink, TableComponent, SpinnerComponent, CompetitionListComponent, SelectedClubComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {

}
