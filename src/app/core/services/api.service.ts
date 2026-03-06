import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry, map } from 'rxjs/operators';
import { Session, Driver, Lap } from '../models/f1.models';

@Injectable({
  providedIn: 'root'
})
export class F1ApiService {
  private http = inject(HttpClient);
  private readonly BASE_URL = 'https://api.openf1.org/v1';

  
  getSessions(year: number = 2024): Observable<Session[]> {
    const params = new HttpParams().set('year', year.toString());
    return this.http.get<Session[]>(`${this.BASE_URL}/sessions`, { params }).pipe(
      retry(2), // Reintenta si falla la red
      catchError(this.handleError)
    );
  }


  getDrivers(sessionKey: number): Observable<Driver[]> {
    return this.http.get<Driver[]>(`${this.BASE_URL}/drivers?session_key=${sessionKey}`).pipe(
      map(drivers => drivers.filter(d => d.broadcast_name)),
      catchError(this.handleError)
    );
  }

  
  getDriverLaps(sessionKey: number, driverNumber: number): Observable<Lap[]> {
    const url = `${this.BASE_URL}/laps?session_key=${sessionKey}&driver_number=${driverNumber}`;
    return this.http.get<Lap[]>(url).pipe(
      catchError(this.handleError)
    );
  }


  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'Ocurrió un error desconocido';
    if (error.error instanceof ErrorEvent) {
      errorMessage = `Error: ${error.error.message}`;
    } else {
      errorMessage = `Código de error: ${error.status}, mensaje: ${error.message}`;
    }
    console.error(errorMessage);
    return throwError(() => new Error(errorMessage));
  }
}