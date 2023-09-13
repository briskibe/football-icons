import {Component, Input} from '@angular/core';
import { CommonModule } from '@angular/common';
import {ClubModel} from "../../../../../core/models/club.model";

@Component({
  selector: 'app-club-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './club-detail.component.html',
  styleUrls: ['./club-detail.component.scss']
})
export class ClubDetailComponent {
  @Input() club: ClubModel | null = null;
}
