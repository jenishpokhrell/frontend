import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GetJobForCandidate, GetMyJob } from '../../model/job';

@Injectable({
  providedIn: 'root'
})
export class JobService {

  apiUrl = 'https://localhost:44304/api/'

  constructor(private http: HttpClient) { }

  getJobsForCandidate(){
    return this.http.get<any>(`${this.apiUrl}job/GetAllJobsForCandidate`)
  }

  getJobByIdForCandidate(id: number):Observable<GetJobForCandidate>{
    return this.http.get<any>(`${this.apiUrl}job/GetJobByIdForCandidate/${id}`)
  }

  getMySavedJobs():Observable<GetJobForCandidate[]>{
    return this.http.get<any>(`${this.apiUrl}savedjob/getmysavedjobs`)
  }

  getMyJobs():Observable<GetMyJob[]>{
    return this.http.get<any>(`${this.apiUrl}job/getmyjobs`)
  }
}
