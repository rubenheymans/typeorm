import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Hippo } from './hippo.interface';

@Injectable({
  providedIn: 'root'
})
export class HippoService {

  private url = environment.production ? 'https://us-central1-typeorm.cloudfunctions.net/' : 'http://localhost:5001/typeorm/us-central1/';  // URL to web api

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient,) { }

  /** GET heroes from the server */
  get(): Observable<Hippo[]> {
    return this.http.get<Hippo[]>(`${this.url}getHippos`)
      .pipe(
        tap(_ => console.log('fetched hippos')),
        // catchError(this.handleError<Hero[]>('getHeroes', []))
        catchError((error) => {
          console.log(error)
          return [];
        })
      );
  }

  /** GET heroes from the server */
  testCall(): Observable<string[]> {
    return this.http.get<string[]>(`${this.url}testCall`)
      .pipe(
        tap(_ => console.log('fetched strings')),
        // catchError(this.handleError<Hero[]>('getHeroes', []))
        catchError((error) => {
          console.log(error)
          return [];
        })
      );
  }
}
