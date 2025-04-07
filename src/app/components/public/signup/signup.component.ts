import { NgFor, NgIf } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { FooterComponent } from "../../reusable/footer/footer.component";
import { FormArray, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../../services/auth/auth.service';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [NgIf, RouterOutlet, RouterLink, FooterComponent,  ReactiveFormsModule],
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
    roles: new FormControl(''),
    firstname: new FormControl('', [Validators.required]),
    lastname: new FormControl(''),
    username: new FormControl(''),
    address: new FormControl(''),
    email: new FormControl(''),
    contact: new FormControl(''),
    gender: new FormControl(''),
    jobtitle: new FormControl(''),
    years_of_experience: new FormControl(''),
    profilePhoto: new FormControl(''),
    password: new FormControl('')
  })

  register(){
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

    return this.authService.register(formData).subscribe({
      next: (response) => {
        console.log(response.Message)
        this.route.navigate(['/login'])
      },
      error: (err) => {
        console.error("Error while registering", err)
      }
    })
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
}
