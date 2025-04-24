import { NgClass, NgFor, NgIf } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { FooterComponent } from "../../reusable/footer/footer.component";
import { FormArray, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../../services/auth/auth.service';
import Swal from 'sweetalert2';
import { GeneralResponse } from '../../../model/response';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [NgIf, RouterOutlet, RouterLink, FooterComponent,  ReactiveFormsModule, NgClass],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent {

  authService = inject(AuthService)

  selectedImage : string | ArrayBuffer | null = null;

  route = inject(Router)

  roles = ['Candidate', 'Employer']

  showPassword : boolean = false;

  signUp: FormGroup = new FormGroup({
    roles: new FormControl('', [Validators.required]),
    firstname: new FormControl('', [Validators.required]),
    lastname: new FormControl('', [Validators.required]),
    username: new FormControl('', [Validators.required]),
    address: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    contact: new FormControl('', [
      Validators.required,
      Validators.pattern(/^[0-9]{10}$/) // Assuming 10-digit mobile numbers
    ]),
    gender: new FormControl('', [Validators.required]),
    jobtitle: new FormControl('', [Validators.required]),
    years_of_experience: new FormControl('', [
      Validators.required,
      Validators.pattern(/^[0-9]+$/)
    ]),
    profilePhoto: new FormControl(''),
    password: new FormControl('', [Validators.required, Validators.minLength(8)])
  });

  register(){
    if(this.signUp.invalid){
      this.signUp.markAllAsTouched()
      return;
    }
    const formData = new FormData()

    Object.keys(this.signUp.controls).forEach(controlName => {
      const controlValue = this.signUp.get(controlName)?.value;
      if(controlValue !== null && controlValue !== undefined){
        formData.append(controlName, controlValue)
      }
    })

    const profilePhoto = this.signUp.get('profilePhoto')?.value
    if(profilePhoto){
      formData.append('profilePhoto', profilePhoto, profilePhoto.name)
    }else{
      console.error("No vaild profile photo is selected.")
    }

    this.authService.register(formData).subscribe((response: GeneralResponse) => {
        if(response.isSuccess){ 
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: response.message,
            showConfirmButton: false,
            timer: 3000
          });
          this.route.navigate(['/login'])
        }else{
          Swal.fire({
            position: "top-end",
            icon: "error",
            title: response.message,
            showConfirmButton: false,
            timer: 3000
          });
        }
      }
    )
  } 

  onFileSelected(event:Event) : void{
    const input = event.target as HTMLInputElement

    if(!input.files || input.files.length == 0)
      return;

    const file = input.files[0]
      const reader = new FileReader();

      reader.onload = () => {
        this.selectedImage = reader.result as string | ArrayBuffer
      }

      reader.readAsDataURL(file)

      this.signUp.patchValue({
        profilePhoto: file
      })

    }
    togglePasswordVisibility(): void{
      this.showPassword = !this.showPassword
    }

    // ------------------------- HELPER METHOD FOR ADDING VALIDATORS -------------------------------

    isInvalid(field: string){
      const value = this.signUp.get(field);
      return !!(value && value.touched && value.invalid)
    }

    isValid(field: string){
      const value = this.signUp.get(field);
      return !!(value && value.touched && value.valid)
    }
}
