import { Component, Input, Output, EventEmitter, inject, OnInit } from '@angular/core';
import { NgIf } from '@angular/common';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { faSun, faMoon, faBell, faChartBar } from '@fortawesome/free-regular-svg-icons';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../services/auth/auth.service';
import { UserModel } from '../../../model/user';

@Component({ 
  selector: 'app-header',
  standalone: true,
  imports: [NgIf, FaIconComponent],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  sun = faSun
  moon = faMoon
  chart = faChartBar
  bell = faBell
  bars = faBars

  @Input() title: string = '';
  @Input() notifications: any[] = [];
  @Output() toggleSidebar = new EventEmitter<void>();

  authService = inject(AuthService)
  user : UserModel | null = null

  constructor(private router: Router){}

  getMyDetails(){
    const myToken = localStorage.getItem('token')
    if(myToken){
      this.authService.getMyDetails().subscribe({
        next: (response) =>{
          this.user = response
        },
        error: (err) => {
          console.error("Error fetching data", err)
        }
      })
    }else{
      console.error('No Token Found')
    }
  }

  ngOnInit(): void {
    this.getMyDetails()
  }

  navigateHome(){
    if(this.user?.roles?.includes('CANDIDATE')){
      this.router.navigate(['/'])
    }
  }

  isLoggedIn(){
    this.authService.isLoggedIn()
  }
}