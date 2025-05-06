import { Component, inject, OnInit } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
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

  // -------------------------------------------------- LOGIN METHOD -------------------------------
  login() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    this.authService.login(this.form.value).subscribe({
      next: (response: any) => {
        // if the current loggedInUser role is employer and if they've been approved, navigates to employer dashboard if TRUE
        if (
          response?.userInfo?.roles?.includes('EMPLOYER') &&
          response?.userInfo?.isApproved === true
        ) {
          this.router.navigate(['/employer']); //navigates to employer dashboard if TRUE
          this.authService.getMyDetails();
        }

        //navigates to not-approved page if above condition matches
        else if (
          response?.userInfo?.roles?.includes('EMPLOYER') &&
          response?.userInfo?.isApproved === false // same condition as above
        ) {
          this.router.navigate(['/not-approved']);
        } 
        
        // navigate to admin dashboard if the loggedInUser role is admin
        else if (response?.userInfo?.roles?.includes('ADMIN')) {
          this.router.navigate(['/admin']); // navigates to admin dashboard if it matches above condition
        }
        
        // assume user is candidate and navigate to home page
        else {
          window.location.replace('/'); 
        }
      },
      error: (err: HttpErrorResponse) => {
        if (err.status === 403) {
          this.router.navigate(['/not-approved']); // navigates to not-approved page if the employer is not approved by admin
        } else {
          // error alert
          Swal.fire({
            icon: 'error',
            title: 'Login Failed',
            text: err.error?.message || 'An unexpected error occurred',
          });
        }
      },
    });
  }

  ngOnInit(): void {
    this.form = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', Validators.required],
    });
  }
}
