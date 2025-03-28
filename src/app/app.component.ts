import { NgClass, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive, NgIf, NgClass, FontAwesomeModule],  
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Career Dev';

  showNavbar : boolean = true;
  isMenuOpen = false
  
  constructor(private router: Router){
    const hiddenRoutes = new Set(['/admindashboard', '/candidatedashboard', '/employerdashboard', '/notfound', '/unauthorized'])
    this.router.events.subscribe(() => {
      this.showNavbar = !hiddenRoutes.has(this.router.url) 
    })

  }

  toggleMenu(){
    this.isMenuOpen = !this.isMenuOpen
  }
}
