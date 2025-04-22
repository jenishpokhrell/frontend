import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GeneralResponse } from '../../model/response';
import { Skills } from '../../model/skill';

export interface SKills{
  skillId: number,
  skill: string
}

@Injectable({
  providedIn: 'root'
})
export class SkillsService {

  private apiUrl = 'https://localhost:44304/api/CandidateSkill/'

  

  constructor( private http: HttpClient ) { }

  addSkills(id: number[]):Observable<GeneralResponse>{
    return this.http.post<GeneralResponse>(`${this.apiUrl}add-skills`, {
      skillId : id,
    })
  }

  getAvailableSkills():Observable<any[]>{
    return this.http.get<any[]>(`${this.apiUrl}GetAvailableSkills`)
  }

  getMySkills():Observable<any[]>{
    return this.http.get<any[]>(`${this.apiUrl}getmyskills`)
  }

  getCandidateSkills(id: string):Observable<any[]>{
    return this.http.get<any[]>(`${this.apiUrl}getcandidateskills/${id}`)
  }
  
  deletSkill(id: number):Observable<GeneralResponse>{
    return this.http.delete<GeneralResponse>(`${this.apiUrl}removeskill/${id}`)
  }
}
