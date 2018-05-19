import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as theMovieDb from 'themoviedb-javascript-library';
import { Observable, Subject, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiKey = '526a2f059c5450afa042042af5b00c00';

  constructor(
    private  http: HttpClient,
  ) {
  }

  search(query: string, page = '1'): Observable<any> {
    return this.http.get('https://api.themoviedb.org/3/search/movie', {
      params: {
        api_key: this.apiKey,
        query,
        page,
      }
    });
  }

  movie(id: number): Observable<any> {
    return this.http.get(`https://api.themoviedb.org/3/movie/${id}`, {
      params: {
        api_key: this.apiKey,
      }
    });
  }

  credits(id: number): Observable<any> {
    return this.http.get(`https://api.themoviedb.org/3/movie/${id}/credits`, {
      params: {
        api_key: this.apiKey,
      }
    });
  }

}
