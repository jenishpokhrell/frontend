import { Component } from '@angular/core';
import { SidebarComponent } from "../../../reusable/sidebar/sidebar.component";
import { faTachometerAlt, faUserAlt, faUser, faUserClock, faBriefcase, faClipboardList } from '@fortawesome/free-solid-svg-icons';
import { NgFor } from '@angular/common';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { HeaderComponent } from '../../../reusable/header/header.component';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [SidebarComponent, HeaderComponent, NgFor, FaIconComponent],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css'
}) 

export class AdminComponent {

  tachometer = faTachometerAlt; userAlt = faUserAlt; userIcon = faUser; userClock = faUserClock; userBriefCase = faBriefcase; clipboard = faClipboardList;


  collapsed = false;
  user = {
    name: 'Admin User',
    role: 'Administrator'
  };

  menuItems = [
    { label: 'Dashboard', link: '/admin/dashboard', icon: faTachometerAlt },
    { label: 'Profile', link: '/admin/profile', icon: faUserAlt },
    { label: 'Users', link: '/admin/users', icon: faUser },
    { label: 'Pending Employers', link: '/admin/pending-employers', icon: faUserClock },
    { label: 'Jobs', link: '/admin/jobs', icon: faBriefcase },
    { label: 'Logs', link: '/admin/logs', icon:  faClipboardList }
  ];

  stats = [
    { title: 'Total Users', value: 1245, icon: faUser, color: 'bg-blue-100 text-blue-600' },
    { title: 'Active Jobs', value: 342, icon: faBriefcase, color: 'bg-green-100 text-green-600' },
    { title: 'Pending Employers', value: 23, icon: faUserClock, color: 'bg-yellow-100 text-yellow-600' },
    { title: 'Today Logs', value: 124, icon: faClipboardList, color: 'bg-purple-100 text-purple-600' }
  ];

  recentUsers = [
    { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Candidate', joined: '2 hours ago' },
    { id: 2, name: 'Acme Corp', email: 'acme@example.com', role: 'Employer', joined: '5 hours ago' },
    { id: 3, name: 'Jane Smith', email: 'jane@example.com', role: 'Candidate', joined: '1 day ago' },
    { id: 4, name: 'Tech Solutions', email: 'tech@example.com', role: 'Employer', joined: '2 days ago' }
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
