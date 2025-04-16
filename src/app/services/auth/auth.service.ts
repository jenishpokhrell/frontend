import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Login } from '../../model/login';
import { map, Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ThemeService } from '../theme/theme.service';
import { UpdateUser, UserModel } from '../../model/user';
import { jwtDecode } from 'jwt-decode';
import { Token } from '../../model/token';
import { Router } from '@angular/router';
import { Register } from '../../model/register';
import { GeneralResponse } from '../../model/response';
import { ChangePassword } from '../../model/password';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  apiUrl = 'https://localhost:44304/api/auth/'
  private TokenKey = 'token'
  route = inject(Router)

  constructor(private http: HttpClient) { }

  login(data:Login):Observable<UserModel>{
    return this.http.post<UserModel>(`${this.apiUrl}Login`, data).pipe(map((response) => {
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
    return this.http.post<any>(`${this.apiUrl}Me`, body ).pipe(
      map(response => response.userInfo)
    )
  }

  register(formData: FormData):Observable<GeneralResponse>{
    return this.http.post<GeneralResponse>(`${this.apiUrl}createuser`, formData)
  }

  getUserById(id: string):Observable<UserModel>{
    return this.http.get<UserModel>(`${this.apiUrl}getuserbyid/${id}`)
  }

  getAllUsers():Observable<any>{
    return this.http.get<any>(`${this.apiUrl}getallusers`)
  }

  getPendingEmployers():Observable<UserModel[]>{
    return this.http.get<UserModel[]>(`${this.apiUrl}getpendingemployers`)
  }

  approveEmployer(id: string):Observable<GeneralResponse>{
    return this.http.post<GeneralResponse>(`${this.apiUrl}approveemployer/${id}`, null)
  }

  updateProfile(id: string, data: FormData): Observable<GeneralResponse>{
    return this.http.put<GeneralResponse>(`${this.apiUrl}update-user/${id}`, data)
  }

  changePassword(id: string, data: ChangePassword):Observable<GeneralResponse>{
    return this.http.put<GeneralResponse>(`${this.apiUrl}changepassword/${id}`, data)
  }


  isLoggedIn = () : boolean => {
    const token = this.getToken()
    if(!token) return false

    return !this.isTokenExpired()
  }

  getRoles = () : string[] | null => {
    const token = this.getToken();
    if(!token) return null

    const decodedToken:any = jwtDecode(token)
    const roles = decodedToken['http://schemas.microsoft.com/ws/2008/06/identity/claims/role']
    return Array.isArray(roles) ? roles : [roles]
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

  getToken = (): string | null => localStorage.getItem(this.TokenKey) || ''
  
}
