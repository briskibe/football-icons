import {inject, Injectable} from "@angular/core";
import {BACKEND_URL} from "../../app.config";
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {ClubModel} from "../models/club.model";

@Injectable({
  providedIn: 'root'
})
export class ClubService {
  readonly backendUrl = inject(BACKEND_URL);
  readonly httpClient = inject(HttpClient);

  getClub(id: number): Observable<ClubModel> {
    return this.httpClient.get<ClubModel>(
      this.backendUrl + '/live/team/' + id
    );
  }

  searchClubs(keyword: string): Observable<any> {
    console.log('here');
    let params = new HttpParams()
      .set('keyword', keyword)
      .set('page', '1')
      .set('pageSize', '10');

    return this.httpClient.get<ClubModel[]>(
      this.backendUrl + '/live/team/search', {params: params}
    );
  }
}
