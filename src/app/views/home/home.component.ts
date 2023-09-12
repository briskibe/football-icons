import {Component, inject, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import {HomeFacade} from "./home.facade";
import {RouterLink} from "@angular/router";
import {TableComponent} from "../../core/components/table/table.component";
import {SpinnerComponent} from "../../core/components/spinner/spinner.component";
import {CompetitionListComponent} from "./components/competition-list/competition-list.component";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterLink, TableComponent, SpinnerComponent, CompetitionListComponent],
  providers: [HomeFacade],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {

}
