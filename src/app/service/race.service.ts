import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {catchError, Observable, of, tap} from "rxjs";

import {Race} from "../model/race";

@Injectable({
  providedIn: 'root'
})
export class RaceService {
  private apiUrl = 'http://localhost:8080/race/';

  constructor(private http: HttpClient) { }

  getAllRace(): Observable<Race[]> {
    return this.http.get<Race[]>(this.apiUrl)
      .pipe(
        catchError(this.handleError<Race[]>('getAllRaces', []))
      );
  }

  addRace(race: any): Observable<any> {
    console.log(race);

    return this.http.post<any>(this.apiUrl+'post', race).pipe(
      tap((newRace: any) => console.log('added race')),
      catchError(this.handleError<any>('addRace'))
    );
  }

  deleteRace(id: bigint): Observable<any> {
    const url = `${this.apiUrl+'delete/'}${id}`;

    return this.http.delete(url)
      .pipe(
        catchError(this.handleError<any>(`deleteRace-${id}`))
      );
  }

  updateRace(race: any): Observable<any> {
    const url = `${this.apiUrl+'update/'}${race.id}`;

    return this.http.patch(url, race)
      .pipe(
        catchError(this.handleError<any>(`updateApartment-${race}`))
      );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any) :Observable<T> => {
      //TODO: send the error to notification logger
      console.error(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }
}
