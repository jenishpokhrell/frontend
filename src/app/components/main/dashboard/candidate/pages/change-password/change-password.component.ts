import { Component, inject, OnInit } from '@angular/core';
import { faCheckCircle, faExclamationCircle, faLocationArrow, faContactBook, faMailForward, faEdit, faTrash, faEyeSlash, faEye} from '@fortawesome/free-solid-svg-icons';
import { ReactiveFormsModule, FormControl, FormGroup, Validators } from '@angular/forms';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { AuthService } from '../../../../../../services/auth/auth.service';
import { GeneralResponse } from '../../../../../../model/response';
import { NgIf } from '@angular/common';
import Swal from 'sweetalert2';
import { RouterOutlet } from '@angular/router';
@Component({
  selector: 'app-change-password',
  standalone: true,
  imports: [ReactiveFormsModule, FaIconComponent, NgIf, RouterOutlet],
  templateUrl: './change-password.component.html', 
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {

  checkCircle = faCheckCircle; excCircle = faExclamationCircle; location = faLocationArrow; contact = faContactBook; mail = faMailForward; edit = faEdit; delete = faTrash; 
  eyeSlash = faEyeSlash; eye = faEye

  showCurrentPassword: boolean = false
  showNewPassword: boolean = false


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
}