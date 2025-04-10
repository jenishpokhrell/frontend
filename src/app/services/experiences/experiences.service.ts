import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { Experience } from '../../model/experience';
import { GeneralResponse } from '../../model/response';

@Injectable({
  providedIn: 'root'
})
export class ExperiencesService {

  apiUrl = 'https://localhost:44304/api/experience/'

  constructor(private http: HttpClient) { } 

  getAllExperiences():Observable<Experience[]>{
    return this.http.get<Experience[]>(`${this.apiUrl}getallexperiences`)
  }

  getMyExperiences():Observable<any>{
    return this.http.get<any>(`${this.apiUrl}getmyexperiences`)
  }

  getExperienceById(experienceId: number){
    return this.http.get<Experience>(`${this.apiUrl}getexperiencebyid/${experienceId}`)
  } 

  saveExperiences(data: Experience):Observable<GeneralResponse>{
    return this.http.post<GeneralResponse>(`${this.apiUrl}add-experience`, data)
  }

  updateExperiences(id: number, data: Experience):Observable<GeneralResponse>{
    return this.http.put<GeneralResponse>(`${this.apiUrl}update-experience/${id}`, data)
  }

  deleteExperiences(id: number):Observable<GeneralResponse>{
    return this.http.delete<GeneralResponse>(`${this.apiUrl}delete-experience/${id}`)
  }

}
