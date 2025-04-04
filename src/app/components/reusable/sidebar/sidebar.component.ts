import { NgFor, NgIf } from '@angular/common';
import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { faChevronRight, faChevronLeft, faSignOut } from '@fortawesome/free-solid-svg-icons';
import { AuthService } from '../../../services/auth/auth.service';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [NgIf, NgFor, RouterLink, FaIconComponent],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {

  right = faChevronRight
  left = faChevronLeft
  signout = faSignOut

  authService = inject(AuthService)

  @Input() user: any;
  @Input() menuItems: any = [];
  @Input() collapsed = false;
  @Output() toggleCollapse = new EventEmitter<void>();
  @Output() logout = new EventEmitter<void>();

  // logout(){
  //   this.authService.logout()
  // }
}
