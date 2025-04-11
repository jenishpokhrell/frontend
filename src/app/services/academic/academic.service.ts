import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Academic } from '../../model/academic';
import { GeneralResponse } from '../../model/response';

@Injectable({
  providedIn: 'root'
})
export class AcademicService {

  apiUrl = 'https://localhost:44304/api/academics/'

  constructor(private http: HttpClient) { }

  getMyAcademics():Observable<any>{
    return this.http.get<any>(`${this.apiUrl}GetMyAcademics`)
  }

  getCandidateAcademicsById(id: string):Observable<any[]>{
    return this.http.get<any>(`${this.apiUrl}getacademicsbycandidateid/${id}`)
  }

  saveAcademics(data: Academic):Observable<GeneralResponse>{
    return this.http.post<GeneralResponse>(`${this.apiUrl}add-academics`, data)
  }

  updateAcademics(id: number, data: Academic ):Observable<GeneralResponse>{
    return this.http.put<GeneralResponse>(`${this.apiUrl}updateacademics/${id}`, data)
  } 

  deleteAcademics(id: number):Observable<GeneralResponse>{
    return this.http.delete<GeneralResponse>(`${this.apiUrl}deleteacademics/${id}`)
  }
}
