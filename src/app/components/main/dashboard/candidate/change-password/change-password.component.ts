import { Component, inject, OnInit } from '@angular/core';
import { SidebarComponent } from '../../../../reusable/sidebar/sidebar.component';
import { HeaderComponent } from '../../../../reusable/header/header.component';
import { faUser, faBriefcase, faProjectDiagram, faFileAlt, faBookmark, faCheckCircle, faExclamationCircle, faDashboard, faLocationArrow, faContactBook,
   faMailForward, faUserEdit, faEdit, faTrash, faEyeSlash, faEye, faBook, faBusinessTime, faBookBookmark, faGraduationCap} from '@fortawesome/free-solid-svg-icons';
import { ReactiveFormsModule, FormControl, FormGroup, Validators } from '@angular/forms';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { AuthService } from '../../../../../services/auth/auth.service';
import { GeneralResponse } from '../../../../../model/response';
import { NgIf } from '@angular/common';
import Swal from 'sweetalert2';
import { RouterOutlet } from '@angular/router';
@Component({
  selector: 'app-change-password',
  standalone: true,
  imports: [SidebarComponent, HeaderComponent,ReactiveFormsModule, FaIconComponent, NgIf, RouterOutlet],
  templateUrl: './change-password.component.html', 
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {

  checkCircle = faCheckCircle; excCircle = faExclamationCircle; location = faLocationArrow; contact = faContactBook; mail = faMailForward; edit = faEdit; delete = faTrash; 
  eyeSlash = faEyeSlash; eye = faEye

  collapsed = false;
  showCurrentPassword: boolean = false
  showNewPassword: boolean = false

  menuItems = [
    { label: 'Dashboard', link: '/candidate/dashboard', icon: faDashboard},
    { label: 'Profile', link: '/candidate/profile', icon: faUser },
    { label: 'Academics', link: '/candidate/academics', icon: faGraduationCap },
    { label: 'Experiences', link: '/candidate/experiences', icon: faBriefcase },
    { label: 'Projects', link: '/candidate/projects', icon: faProjectDiagram },
    { label: 'Applied Jobs', link: '/candidate/applied-jobs', icon: faFileAlt },
    { label: 'Saved Jobs', link: '/candidate/saved-jobs', icon: faBookmark },
    { label: 'Change Password', link: '/candidate/change-password', icon: faEdit}

  ];


  authService = inject(AuthService)
  id! : string

  password: FormGroup = new FormGroup({
    currentPassword: new FormControl('', [Validators.required]),
    newPassword: new FormControl('', [Validators.required])
  })

  mobileSidebarVisible: boolean = false

  toggleMobileSidebar(){
    this.mobileSidebarVisible = !this.mobileSidebarVisible
  }

  ngOnInit(): void {
    this.authService.getMyDetails().subscribe({
      next: (response) => {
        this.id = response.id
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
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: response.message,
            showConfirmButton: false,
            timer: 1500
          });
          this.authService.logout()
        }else{
          Swal.fire({
            position: "top-end",
            icon: "error",
            title: response.message,
            showConfirmButton: false,
            timer: 1500
          });
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