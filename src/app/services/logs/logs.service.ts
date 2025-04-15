import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LogsService {

  private apiUrl = 'https://localhost:44304/api/Logs/'

  constructor(private http: HttpClient) { }

  getAllLogs():Observable<any>{
    return this.http.get<any>(`${this.apiUrl}getalllogs`)
  }
}
