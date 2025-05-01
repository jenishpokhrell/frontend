import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GetJobForCandidate, GetMyJob, GetShortlistedCandidate, Job, MyJobApplications, UpdateJobApplication } from '../../model/job';
import { GeneralResponse } from '../../model/response';

@Injectable({
  providedIn: 'root'
})
export class JobService {

  apiUrl = 'https://localhost:44304/api/'

  constructor(private http: HttpClient) { }

  getJobsForCandidate():Observable<GetJobForCandidate[]>{
    return this.http.get<GetJobForCandidate[]>(`${this.apiUrl}job/GetAllJobsForCandidate`)
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

  getSavedCandidates():Observable<GetShortlistedCandidate[]>{
    return this.http.get<GetShortlistedCandidate[]>(`${this.apiUrl}savedcandidate/getsavedcandidates`)
  }
  
  getMyJobById(id: number):Observable<GetMyJob>{
    return this.http.get<any>(`${this.apiUrl}job/getmyjobbyid/${id}`)
  }

    getMyJobApplications():Observable<MyJobApplications[]>{
      return this.http.get<MyJobApplications[]>(`${this.apiUrl}jobapplication/getmyjobapplications`)
    }

  getAllJobs():Observable<any>{
    return this.http.get<any>(`${this.apiUrl}job/getalljobs`)
  }

  getJobById(id: number):Observable<any>{
    return this.http.get<any>(`${this.apiUrl}job/getjobbyid/${id}`)
  }

  postJob(data: Job):Observable<GeneralResponse>{
    return this.http.post<GeneralResponse>(`${this.apiUrl}job/post-job`, data)
  }

  applyForJob(id: number):Observable<GeneralResponse>{
    return this.http.post<GeneralResponse>(`${this.apiUrl}job/applyforjob/${id}`, null)
  }

  saveJob(id: number):Observable<GeneralResponse>{
    return this.http.post<GeneralResponse>(`${this.apiUrl}savedjob/savejobs/${id}`, null)
  }

  updateJob(id: number, data: Job):Observable<GeneralResponse>{
    return this.http.put<GeneralResponse>(`${this.apiUrl}job/update-job/${id}`, data)
  }

  updateJobApplication(jobApplicationId: number, data: UpdateJobApplication):Observable<GeneralResponse>{
    return this.http.put<GeneralResponse>(`${this.apiUrl}jobapplication/updatejobapplicationstatus/${jobApplicationId}`, data);
  } 

  deleteJob(id: number):Observable<GeneralResponse>{
    return this.http.delete<GeneralResponse>(`${this.apiUrl}job/delete-job/${id}`)
  }
}
