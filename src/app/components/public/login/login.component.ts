import { Component, inject, OnInit } from '@angular/core';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { FooterComponent } from "../../reusable/footer/footer.component";
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../../services/auth/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterOutlet, RouterLink, FooterComponent, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {

    showPassword: boolean = false;

    form!: FormGroup
    fb = inject(FormBuilder)
    authService = inject(AuthService)
    route = inject(Router)

    togglePasswordVisibility(): void{
      this.showPassword = !this.showPassword
    }

    login(){
      this.authService.login(this.form.value).subscribe((response) => {
        console.log(response);
      })
    }

    ngOnInit(): void {
      this.form = this.fb.group({
        username: ['', [Validators.required]],
        password: ['', Validators.required]
      })
    }
}
