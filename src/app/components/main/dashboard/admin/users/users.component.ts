import { Component, inject, OnInit } from '@angular/core';
import { SidebarComponent } from "../../../../reusable/sidebar/sidebar.component";
import { faTachometerAlt, faUserAlt, faUser, faUserClock, faBriefcase, faClipboardList } from '@fortawesome/free-solid-svg-icons';
import { NgFor, NgIf } from '@angular/common';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { HeaderComponent } from '../../../../reusable/header/header.component';
import { UserModel } from '../../../../../model/user';
import { AuthService } from '../../../../../services/auth/auth.service';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [SidebarComponent, HeaderComponent, NgFor, FaIconComponent, NgIf],
  templateUrl: './users.component.html',
  styleUrl: './users.component.css'
}) 

export class UsersComponent implements OnInit{

  tachometer = faTachometerAlt; userAlt = faUserAlt; userIcon = faUser; userClock = faUserClock; userBriefCase = faBriefcase; clipboard = faClipboardList;
  collapsed = false;

  menuItems = [
    { label: 'Dashboard', link: '/admin/dashboard', icon: faTachometerAlt },
    { label: 'Users', link: '/admin/users', icon: faUser },
    { label: 'Pending Employers', link: '/admin/pending-employers', icon: faUserClock },
    { label: 'Jobs', link: '/admin/jobs', icon: faBriefcase },
    { label: 'Logs', link: '/admin/logs', icon:  faClipboardList }
  ];

  notifications = [
    { id: 1, message: 'New employer registration requires approval', time: '10 min ago', read: false },
    { id: 2, message: '3 new jobs posted today', time: '1 hour ago', read: false },
    { id: 3, message: 'System maintenance scheduled', time: '2 hours ago', read: true }
  ];

  recentUsers: UserModel[] = []
  users: UserModel[] = []
  authService = inject(AuthService)

  ngOnInit(): void {
    this.getAllUsers()
 
  }

  getAllUsers(){
    this.authService.getAllUsers().subscribe({
      next: (response) => {
        this.recentUsers = response
        this.users = this.recentUsers.filter(user => !user.roles.includes('ADMIN'))
      }
    })
  }

  toggleSidebar(): void {
    this.collapsed = !this.collapsed;
  }

}
