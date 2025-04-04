import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Login } from '../../model/login';
import { map, Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ThemeService } from '../theme/theme.service';
import { UserModel } from '../../model/user';
import { jwtDecode } from 'jwt-decode';
import { Token } from '../../model/token';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  apiUrl = 'https://localhost:44304/api/'
  private TokenKey = 'token'
  route = inject(Router)

  constructor(private http: HttpClient) { }

  login(data:Login):Observable<UserModel>{
    return this.http.post<UserModel>(`${this.apiUrl}Auth/Login`, data).pipe(map((response) => {
      if(response.newToken){
        localStorage.setItem(this.TokenKey, response.newToken)
      }
      return response
    })) 

  }

  getMyDetails():Observable<UserModel>{
    const token = localStorage.getItem('token')
    const body = {
      token: token
    }
    return this.http.post<any>(`${this.apiUrl}Auth/Me`, body ).pipe(
      map(response => response.userInfo)
    )
  }

  isLoggedIn = () : boolean => {
    const token = this.getToken()
    if(!token) return false

    return !this.isTokenExpired()
  }

  private isTokenExpired(){
    const token = this.getToken()
    if(!token) return true;

    const decoded = jwtDecode(token);

    const isTokenExpired = Date.now() >= decoded['exp']! * 1000

    if(isTokenExpired) this.logout()
    return isTokenExpired
  } 

  logout():void{
    localStorage.removeItem(this.TokenKey)
    window.location.reload()
    location.replace("/login")
  }

  private getToken = (): string | null => localStorage.getItem(this.TokenKey) || ''
  
}
