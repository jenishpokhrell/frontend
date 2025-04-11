import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GetJobForCandidate, GetMyJob, Job } from '../../model/job';
import { GeneralResponse } from '../../model/response';

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

  getMyJobById(id: number):Observable<GetMyJob>{
    return this.http.get<any>(`${this.apiUrl}job/getmyjobbyid/${id}`)
  }

  postJob(data: Job):Observable<GeneralResponse>{
    return this.http.post<GeneralResponse>(`${this.apiUrl}job/post-job`, data)
  }

  updateJob(id: number, data: Job):Observable<GeneralResponse>{
    return this.http.put<GeneralResponse>(`${this.apiUrl}job/update-job/${id}`, data)
  }
}
