import {inject, Injectable} from "@angular/core";
import {BACKEND_URL} from "../../app.config";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {ClubModel} from "../models/club.model";

@Injectable({
  providedIn: 'root'
})
export class ImageService {
  readonly backendUrl = inject(BACKEND_URL);
  readonly httpClient = inject(HttpClient);

  getImage(uuid: string | undefined): Observable<any> {
    return this.httpClient.get<any>(
      this.backendUrl + '/live/images/' + uuid
    );
  }
}
