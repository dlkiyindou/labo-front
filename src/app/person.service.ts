import {Injectable} from '@angular/core';
import {Observable, of} from 'rxjs';
import {Person} from './person';
import {PERSONS} from './mock-persons';
import {MessageService} from './message.service';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {catchError, tap} from 'rxjs/operators';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};


@Injectable({
  providedIn: 'root'
})
export class PersonService {


  private personURL = 'http://127.0.0.1:8080/person';


  constructor(
    private http: HttpClient,
    private messageService: MessageService) { }

  getPersons(): Observable<Person[]> {
    return this.http.get<Person[]>(this.personURL)
      .pipe(
        tap(_ => this.log('fetched persons')),
        catchError(this.handleError<Person[]>('getPersons', []))
      );
  }

  getPerson(id: number): Observable<Person> {
    return this.http.get<Person>(`${this.personURL}/${id}`)
      .pipe(
        tap(_ => this.log('fetched persons')),
        catchError(this.handleError<Person>(`getPerson id=${id}`))
      );
  }

  updatePerson(person: Person): Observable<any> {
    return this.http.put(this.personURL, person, httpOptions)
      .pipe(
        tap(_ => this.log(`updated person id=${person.id}`)),
        catchError(this.handleError<any>('updatePerson'))
      );
  }

  addPerson(person: Person): Observable<Person> {
    return this.http.post<Person>(this.personURL, person, httpOptions)
      .pipe(
        tap((newPerson: Person) => this.log(`added person w/ id=${newPerson.id}`)),
        catchError(this.handleError<Person>('addPerson'))
      );
  }

  deletePerson(person: Person | number): Observable<Person> {
    const id = typeof person === 'number' ? person : person.id;
    const url = `${this.personURL}/${id}`;

    return this.http.delete<Person>(url, httpOptions).pipe(
      tap(_ => this.log(`deleted person id=${id}`)),
      catchError(this.handleError<Person>('deletePerson'))
    );
  }

  /* GET persons whose name contains search term */
  searchPersons(term: string): Observable<Person[]> {
    if (!term.trim()) {
      // if not search term, return empty person array.
      return of([]);
    }
    return this.http.get<Person[]>(`${this.personURL}/?name=${term}`).pipe(
      tap(_ => this.log(`found persons matching "${term}"`)),
      catchError(this.handleError<Person[]>('searchPersons', []))
    );
  }

  private log(message: string) {
    this.messageService.add(`PersonService: ${message}`);
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}



