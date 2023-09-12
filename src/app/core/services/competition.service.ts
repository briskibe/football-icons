import {inject, Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {CompetitionModel} from "../models/competition.model";
import {BACKEND_URL} from "../../app.config";

@Injectable({ providedIn: 'root' })
export class CompetitionService {
  readonly backendUrl = inject(BACKEND_URL);
  readonly httpClient = inject(HttpClient);

  getCompetitions(): Observable<CompetitionModel[]> {
    return this.httpClient.get<CompetitionModel[]>(
      this.backendUrl + '/live/competition/list/active/609'
    );
  }
}
