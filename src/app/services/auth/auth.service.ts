import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Login } from '../../model/login';
import { map, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { ThemeService } from '../theme/theme.service';
import { UserModel } from '../../model/user';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  apiUrl = 'https://localhost:44304/api/'
  private TokenKey = 'newToken'

  constructor(private http: HttpClient) { }

  login(data:Login):Observable<any>{
    return this.http.post<any>(`${this.apiUrl}Auth/Login`, data).pipe(map((response) => {
      if(response.newToken  ){
        localStorage.setItem(this.TokenKey, response.newToken)
      }
      return response
    })) 

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
  }

  private getToken = (): string | null => localStorage.getItem(this.TokenKey) || ''
  
}
