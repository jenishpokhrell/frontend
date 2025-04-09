import { Component, inject, OnInit } from '@angular/core';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { FooterComponent } from "../../reusable/footer/footer.component";
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../../services/auth/auth.service';
import { UserModel } from '../../../model/user';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-login',
  standalone: true, 
  imports: [RouterOutlet, RouterLink, FooterComponent, ReactiveFormsModule, FaIconComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {

  eye = faEye;  eyeSlash = faEyeSlash

    showPassword: boolean = false;

    form!: FormGroup
    fb = inject(FormBuilder)
    authService = inject(AuthService)
    route = inject(Router)
    userModel : UserModel | null = null

    togglePasswordVisibility(): void{
      this.showPassword = !this.showPassword
    }

    login(){
      this.authService.login(this.form.value).subscribe((response) => {
        console.log(response)
        location.replace("/")
      })
    }

    ngOnInit(): void {
      this.form = this.fb.group({
        username: ['', [Validators.required]],
        password: ['', Validators.required]
      })
    }
}
