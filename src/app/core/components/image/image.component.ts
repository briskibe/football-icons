import {Component, inject, Input, OnChanges, OnInit} from '@angular/core';
import {CommonModule, NgOptimizedImage} from '@angular/common';
import {ImageService} from "../../services/image.service";
import {Observable, Subscription} from "rxjs";

@Component({
  selector: 'app-image',
  standalone: true,
  imports: [CommonModule, NgOptimizedImage],
  templateUrl: './image.component.html',
  styleUrls: ['./image.component.scss']
})
export class ImageComponent implements OnChanges {
  @Input() uuid: string | undefined;
  @Input() width: number = 200;
  @Input() height: number = 100;
  // @ts-ignore
  image$: Observable<any>;

  imageService = inject(ImageService);

  getImagePath(src: string) {
      return "data:image/png;base64," + src;
  }

  ngOnChanges() {
    this.image$ = this.imageService.getImage(this.uuid);
  }
}
