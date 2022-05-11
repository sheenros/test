import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {catchError, Observable, of} from "rxjs";
import {Dog} from "../model/dog";
import {Race} from "../model/race";

@Injectable({
  providedIn: 'root'
})
export class DogService {

  private apiUrl = 'http://localhost:8080/dogs/';



  constructor(private http: HttpClient) { }

  getAllDog(): Observable<Dog[]> {
    return this.http.get<Dog[]>(this.apiUrl)
      .pipe(
        catchError(this.handleError<Dog[]>('getDog', []))
      );
  }

  addDog(dog: any): Observable<any> {
    return this.http.post<any>(this.apiUrl+'post', dog).pipe(
      catchError(this.handleError<any>('addDog'))
    );
  }

  deleteDog(id: bigint): Observable<any> {
    const url = `${this.apiUrl+'delete/'}${id}`;

    return this.http.delete(url)
      .pipe(
        catchError(this.handleError<any>(`deleteDog-${id}`))
      );
  }

  updateDog(dog: any): Observable<any> {
    const url = `${this.apiUrl+'update/'}${dog.id}`;

    return this.http.patch(url, dog)
      .pipe(
        catchError(this.handleError<any>(`updateDog-${dog}`))
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
