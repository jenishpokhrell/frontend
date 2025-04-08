import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GetJobForCandidate } from '../../model/job';

@Injectable({
  providedIn: 'root'
})
export class JobService {

  apiUrl = 'https://localhost:44304/api/Job/'

  constructor(private http: HttpClient) { }

  getJobsForCandidate(){
    return this.http.get<any>(`${this.apiUrl}GetAllJobsForCandidate`)
  }

  getJobByIdForCandidate(id: number):Observable<GetJobForCandidate>{
    return this.http.get<any>(`${this.apiUrl}GetJobByIdForCandidate/${id}`)
  }
}
