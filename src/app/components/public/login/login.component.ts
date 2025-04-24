import { Component, inject, OnInit } from '@angular/core';
import {
  Router,
  RouterLink,
  RouterOutlet,
} from '@angular/router';
import { FooterComponent } from '../../reusable/footer/footer.component';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AuthService } from '../../../services/auth/auth.service';
import { UserModel } from '../../../model/user';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { NgIf } from '@angular/common';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    RouterOutlet,
    RouterLink,
    FooterComponent,
    ReactiveFormsModule,
    FaIconComponent,
    NgIf,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent implements OnInit {
  eye = faEye;
  eyeSlash = faEyeSlash;

  showPassword: boolean = false;

  form!: FormGroup;
  fb = inject(FormBuilder);
  authService = inject(AuthService);
  route = inject(Router);
  userModel: UserModel | null = null;

  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }

  constructor(private router: Router) {}

  login() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    this.authService.login(this.form.value).subscribe({
      next: (response: any) => {
        if (
          response?.userInfo?.roles?.includes('EMPLOYER') &&
          response?.userInfo?.isApproved === true
        ) {
          this.router.navigate(['/employer']);
        } else if (
          response?.userInfo?.roles?.includes('EMPLOYER') &&
          response?.userInfo?.isApproved === false
        ) {
          this.router.navigate(['/not-approved']);
        } else if (response?.userInfo?.roles?.includes('ADMIN')) {
          this.router.navigate(['/admin']);
        } else {
          this.router.navigate(['/']);
        }
      },
      error: (err: HttpErrorResponse) => {
        if(err.status === 403){
          this.router.navigate(['/not-approved'])
        }else{
          Swal.fire({
            icon: 'error',
            title: 'Login Failed',
            text: err.error?.message || 'An unexpected error occurred'
          });
        }
      }
    });
  }

  ngOnInit(): void {
    this.form = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', Validators.required],
    });
  }
}
