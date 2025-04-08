import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Academic } from '../../model/academic';
import { GeneralResponse } from '../../model/response';

@Injectable({
  providedIn: 'root'
})
export class AcademicService {

  apiUrl = 'https://localhost:44304/api/'

  constructor(private http: HttpClient) { }

  getMyAcademics():Observable<any>{
    return this.http.get<any>(`${this.apiUrl}Academics/GetMyAcademics`)
  }

  saveAcademics(data: Academic):Observable<GeneralResponse>{
    return this.http.post<GeneralResponse>(`${this.apiUrl}academics/add-academics`, data)
  }

  updateAcademics(id: number, data: Academic ):Observable<GeneralResponse>{
    return this.http.put<GeneralResponse>(`${this.apiUrl}academics/updateacademics/${id}`, data)
  } 
}
