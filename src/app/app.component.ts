import { NgClass, NgIf } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { FontAwesomeModule, FaIconComponent } from '@fortawesome/angular-fontawesome';
import { faBars, faArrowDown, faSignOut } from '@fortawesome/free-solid-svg-icons';
import { AuthService } from './services/auth/auth.service';
import { UserModel } from './model/user';
import { Token } from './model/token';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive, NgIf, NgClass, FontAwesomeModule, FaIconComponent],  
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {

  signout = faSignOut

  showNavbar : boolean = true;
  isMenuOpen = false
  showDropdown : boolean = false

  userModel : UserModel | null = null
  token : Token | null = null

  authService = inject(AuthService)
  route = inject(Router)

  isLoggedIn(){
    return this.authService.isLoggedIn()

  }

  ngOnInit(): void {
     this.getMyDetails()
  }
  
  getMyDetails(){
    const myToken = localStorage.getItem('token')
    if(myToken){
      this.authService.getMyDetails().subscribe({
        next: (response) =>{
          console.log(response)
          this.userModel = response
        },
        error: (err) => {
          console.error("Error fetching data", err)
        }
      })
    }else{
      console.error('No Token Found')
    }
  }

  logout(){
    return this.authService.logout()
    
  }
  
  // constructor(private router: Router){
  //   const hiddenRoutes = new Set(['/admin/dashboard', '/admin/users','/admin/pending-employers','/admin/jobs','/admin/logs',
  //      '/candidate/dashboard', '/candidate/profile','/candidate/academics','/candidate/experiences','/candidate/projects','/candidate/applied-jobs','/candidate/saved-jobs','/candidate/change-password',
  //      '/employer/dashboard', '/employer/profile', '/employer/experiences', '/employer/jobs', '/employer/job-applications/', '/employer/shortlisted-candidates', 
  //      '/employer/change-password', '/employer/candidate-profile', '/employer/post-job',
  //      '/notfound', '/unauthorized'])
  //   this.router.events.subscribe(() => {
  //     this.showNavbar = !hiddenRoutes.has(this.router.url) 
  //   })

  // }
  constructor(private router: Router){
    const hiddenRoutes = ['/admin', '/candidate', '/employer', '/notfound', '/unauthorized']
    this.router.events.subscribe(() => {
      this.showNavbar = !hiddenRoutes.some(path => this.router.url.startsWith(path))
    })

  }

  toggleMenu(){
    this.isMenuOpen = !this.isMenuOpen
  }

  toggleDropdown(){
    this.showDropdown = !this.showDropdown
  }
}
