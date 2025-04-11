import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Project } from '../../model/project';
import { GeneralResponse } from '../../model/response';

@Injectable({
  providedIn: 'root'
})
export class ProjectsService {

  apiUrl = 'https://localhost:44304/api/Projects/'

  constructor(private http: HttpClient) { }

  getMyProjects():Observable<Project[]>{
    return this.http.get<Project[]>(`${this.apiUrl}getmyprojects`)
  }

  getProjectById(id: number):Observable<Project>{
    return this.http.get<Project>(`${this.apiUrl}getprojectbyid/${id}`)
  }

  getProjectByCandidateId(id: string):Observable<any>{
    return this.http.get<any>(`${this.apiUrl}getprojectbycandidateid/${id}`)
  }

  saveProject(data: Project):Observable<GeneralResponse>{
    return this.http.post<GeneralResponse>(`${this.apiUrl}add-project`, data)
  }

  updateProject(id: number, data: Project):Observable<GeneralResponse>{
    return this.http.put<GeneralResponse>(`${this.apiUrl}update-project/${id}`, data)
  }

  deleteProject(id: number):Observable<GeneralResponse>{
    return this.http.delete<GeneralResponse>(`${this.apiUrl}deleteproject/${id}`)
  }

}
