import { Component } from '@angular/core';
import { SidebarComponent } from "../../../../reusable/sidebar/sidebar.component";
import { faTachometerAlt, faUserAlt, faUser, faUserClock, faBriefcase, faClipboardList } from '@fortawesome/free-solid-svg-icons';
import { NgFor } from '@angular/common';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { HeaderComponent } from '../../../../reusable/header/header.component';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [SidebarComponent, HeaderComponent, NgFor, FaIconComponent],
  templateUrl: './logs.component.html',
  styleUrl: './logs.component.css'
}) 

export class LogsComponent {

  tachometer = faTachometerAlt; userAlt = faUserAlt; userIcon = faUser; userClock = faUserClock; userBriefCase = faBriefcase; clipboard = faClipboardList;


  collapsed = false;
  user = {
    name: 'Admin User',
    role: 'Administrator'
  };

  menuItems = [
    { label: 'Dashboard', link: '/admin/dashboard', icon: faTachometerAlt },
    { label: 'Users', link: '/admin/users', icon: faUser },
    { label: 'Pending Employers', link: '/admin/pending-employers', icon: faUserClock },
    { label: 'Jobs', link: '/admin/jobs', icon: faBriefcase },
    { label: 'Logs', link: '/admin/logs', icon:  faClipboardList }
  ];

  recentLogs = [
    { id: 1, action: 'Login', user: 'Admin User', time: '10 minutes ago' },
    { id: 2, action: 'Job Approved', user: 'Acme Corp', time: '1 hour ago' },
    { id: 3, action: 'User Deleted', user: 'John Doe', time: '3 hours ago' },
    { id: 4, action: 'Settings Updated', user: 'Admin User', time: '5 hours ago' }
  ];

  notifications = [
    { id: 1, message: 'New employer registration requires approval', time: '10 min ago', read: false },
    { id: 2, message: '3 new jobs posted today', time: '1 hour ago', read: false },
    { id: 3, message: 'System maintenance scheduled', time: '2 hours ago', read: true }
  ];

  toggleSidebar(): void {
    this.collapsed = !this.collapsed;
  }

  logout(): void {
    console.log('Logout clicked');
  }
}
