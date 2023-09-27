import { Routes } from '@angular/router';
import {HomeFacade} from "./views/home/home.facade";
import {SelectedClubFacade} from "./views/home/components/selected-club/selected-club.facade";

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', loadComponent: () => import('./views/home/home.component').then(m => m.HomeComponent), providers: [HomeFacade, SelectedClubFacade]}
];
