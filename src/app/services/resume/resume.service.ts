import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ResumeService {

  apiUrl  = 'https://localhost:44304/api/Resume/'

  constructor(private http: HttpClient) { }

  getCandidateResume(id: string):Observable<any>{
    return this.http.get<any>(`${this.apiUrl}getresumebycandidateid/${id}`)
  }

  getMyResume():Observable<any>{
    return this.http.get<any>(`${this.apiUrl}getmyresume`)
  }
}
