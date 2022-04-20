import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FetchDataService {
  constructor(private readonly http: HttpClient) {}

  get<T>(url: string): Observable<T> {
    return this.http.get<T>(url);
  }

  delete<T>(url: string): Observable<T> {
    return this.http.delete<T>(url);
  }

  private static httpOptions() {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    return { headers, responseType: 'text' as 'json' };
  }

  post<T>(url: string, values: any): Observable<T> {
    const httpOptions = FetchDataService.httpOptions();
    return this.http.post<T>(url, values, httpOptions);
  }

  put<T>(url: string, values: any): Observable<T> {
    return this.http.put<T>(url, values);
  }

  patch<T>(url: string, values: any): Observable<T> {
    const httpOptions = FetchDataService.httpOptions();
    return this.http.patch<T>(url, values, httpOptions);
  }
}
