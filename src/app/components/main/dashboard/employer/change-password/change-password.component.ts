import { Component, inject, OnInit } from '@angular/core';
import { SidebarComponent } from '../../../../reusable/sidebar/sidebar.component';
import { HeaderComponent } from '../../../../reusable/header/header.component';
import { faUser, faBriefcase, faProjectDiagram, faFileAlt, faBookmark, faCheckCircle, faExclamationCircle, faDashboard, faLocationArrow, faContactBook,
   faMailForward, faUserEdit, faEdit, faTrash, faEyeSlash, faEye, faBook, faBusinessTime, faBookBookmark} from '@fortawesome/free-solid-svg-icons';
import { ReactiveFormsModule, FormControl, FormGroup, Validators } from '@angular/forms';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { AuthService } from '../../../../../services/auth/auth.service';
import { GeneralResponse } from '../../../../../model/response';
import { NgIf } from '@angular/common';
@Component({
  selector: 'app-candidate',
  standalone: true,
  imports: [SidebarComponent, HeaderComponent,ReactiveFormsModule, FaIconComponent, NgIf],
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class EmployerChangePasswordComponent implements OnInit {

  checkCircle = faCheckCircle; excCircle = faExclamationCircle; location = faLocationArrow; contact = faContactBook; mail = faMailForward; edit = faEdit; delete = faTrash; 
  eyeSlash = faEyeSlash; eye = faEye

  collapsed = false;
  showCurrentPassword: boolean = false
  showNewPassword: boolean = false

  menuItems = [
    { label: 'Dashboard', link: '/employer/dashboard', icon: faDashboard},
    { label: 'Profile', link: '/employer/profile', icon: faUser },
    { label: 'Experiences', link: '/employer/experiences', icon: faBriefcase },
    { label: 'Post Job', link: '/employer/post-job', icon: faBook },
    { label: 'My Jobs', link: '/employer/jobs', icon: faBusinessTime },
    { label: 'Shortlisted Candidates', link: '/employer/shortlisted-candidates', icon: faBookBookmark},
    { label: 'Change Password', link: '/employer/change-password', icon: faEdit}
  ];

  authService = inject(AuthService)
  id! : string

  password: FormGroup = new FormGroup({
    currentPassword: new FormControl('', [Validators.required]),
    newPassword: new FormControl('', [Validators.required])
  })

  ngOnInit(): void {
    this.authService.getMyDetails().subscribe({
      next: (response) => {
        this.id = response.id
        console.log(this.id)
      },
      error: (err) => {
        console.error(err)
      }
    })
  }

  changePassword(){
    if(this.password.invalid){
      this.password.markAllAsTouched()
      return
    }
    const data = this.password.value
    if(this.id){
      this.authService.changePassword(this.id, data).subscribe((response: GeneralResponse) => {
        if(response.isSuccess){
          alert(response.message)
          this.authService.logout()
        }else{
          console.log('Error in updating password.')
        }
      })
    }else{
      console.log('Error in fetching id')
    }
  }


  isInvalid(field: string){
    const value = this.password.get(field)
    return !!(value && value.touched && value.invalid)
  }


  toggleCurrentPasswordVisibility() : void{
    this.showCurrentPassword = !this.showCurrentPassword
  }

  toggleNewPasswordVisibility() : void{
    this.showNewPassword = !this.showNewPassword
  }

  toggleSidebar(): void {
    this.collapsed = !this.collapsed;
  }

}