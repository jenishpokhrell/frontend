import { NgFor, NgIf } from '@angular/common';
import { Component, EventEmitter, inject, Input, OnInit, Output } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { faChevronRight, faChevronLeft, faSignOut } from '@fortawesome/free-solid-svg-icons';
import { AuthService } from '../../../services/auth/auth.service';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [NgIf, NgFor, RouterLink, FaIconComponent, RouterOutlet], 
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent implements OnInit{

  right = faChevronRight
  left = faChevronLeft
  signout = faSignOut

  authService = inject(AuthService)

  @Input() user: any;
  @Input() menuItems: any = [];
  @Input() collapsed = false;
  @Output() toggleCollapse = new EventEmitter<void>();

  ngOnInit(): void {
    this.getMyDetails()
  }

  getMyDetails(){
    return this.authService.getMyDetails().subscribe({
      next: (response) => {
        this.user = response
      }
    })
  }
  logout(){
    this.authService.logout()
  }
}
