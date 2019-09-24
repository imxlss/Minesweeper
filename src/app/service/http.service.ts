import { IRankList, IHttpResponse } from './../core/type';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

const APPEND_SCORE_API = `/api/append_score`;
const RANK_LIST_API = `/api/ranking_list`;

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private http: HttpClient) { }

  /**
   * 获取rankList
   * @param params
   */
  getRankList(params: IRankList = { level: 0 }) {
    const query = new HttpParams()
      .append(`level`, `${params.level}`);

    return this.http.get<IHttpResponse>(
      environment.prefix + RANK_LIST_API, { params: query }
    ) as Observable<IHttpResponse>;
  }

}
