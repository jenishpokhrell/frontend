import { NgClass, NgIf } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { FontAwesomeModule, FaIconComponent } from '@fortawesome/angular-fontawesome';
import { faBars, faArrowDown } from '@fortawesome/free-solid-svg-icons';
import { AuthService } from './services/auth/auth.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive, NgIf, NgClass, FontAwesomeModule, FaIconComponent],  
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Career Dev';

  down = faArrowDown;

  showNavbar : boolean = true;
  isMenuOpen = false

  authService = inject(AuthService)
  route = inject(Router)

  isLoggedIn(){
    return this.authService.isLoggedIn()
  }
  
  constructor(private router: Router){
    const hiddenRoutes = new Set(['/admin/dashboard', '/admin/users','/admin/pending-employers','/admin/jobs','/admin/logs',
       '/candidate/dashboard', '/candidate/profile','/candidate/academics','/candidate/experiences','/candidate/projects','/candidate/applied-jobs','/candidate/saved-jobs','/candidate/change-password',
       '/employer/dashboard', '/employer/profile', '/employer/experiences', '/employer/jobs', '/employer/job-applications', '/employer/shortlisted-candidates', 
       '/employer/change-password', '/employer/candidate-profile', '/employer/post-job',
       '/notfound', '/unauthorized'])
    this.router.events.subscribe(() => {
      this.showNavbar = !hiddenRoutes.has(this.router.url) 
    })

  }

  toggleMenu(){
    this.isMenuOpen = !this.isMenuOpen
  }
}
