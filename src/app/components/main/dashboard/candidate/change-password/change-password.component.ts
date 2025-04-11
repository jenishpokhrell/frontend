import { Component, inject, OnInit } from '@angular/core';
import { SidebarComponent } from '../../../../reusable/sidebar/sidebar.component';
import { HeaderComponent } from '../../../../reusable/header/header.component';
import { faUser, faBriefcase, faProjectDiagram, faFileAlt, faBookmark, faCheckCircle, faExclamationCircle, faDashboard, faLocationArrow, faContactBook,
   faMailForward, faUserEdit, faEdit, faTrash, faEyeSlash, faEye, faBook, faBusinessTime, faBookBookmark, faGraduationCap} from '@fortawesome/free-solid-svg-icons';
import { ReactiveFormsModule, FormControl, FormGroup } from '@angular/forms';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { AuthService } from '../../../../../services/auth/auth.service';
import { GeneralResponse } from '../../../../../model/response';
@Component({
  selector: 'app-candidate',
  standalone: true,
  imports: [SidebarComponent, HeaderComponent,ReactiveFormsModule, FaIconComponent],
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
    { label: 'Update Profile', link: '/candidate/update-profile', icon: faUserEdit},
    { label: 'Change Password', link: '/candidate/change-password', icon: faEdit}

  ];


  authService = inject(AuthService)
  id! : string

  password: FormGroup = new FormGroup({
    currentPassword: new FormControl(''),
    newPassword: new FormControl('')
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