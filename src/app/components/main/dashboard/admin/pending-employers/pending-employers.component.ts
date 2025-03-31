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
  templateUrl: './pending-employers.component.html',
  styleUrl: './pending-employers.component.css'
}) 

export class PendingEmployersComponent {

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

  recentUsers = [
    { id: 11, name: 'SB and IT Tech', email: 'sbandtech@example.com', role: 'Employer', joined: '5 hours ago' },
    { id: 12, name: 'Omega Tech', email: 'omega@example.com', role: 'Employer', joined: '2 days ago' },
    { id:13, name: 'Satellite Devs', email: 'satellite@example.com', role: 'Employer', joined: '2 days ago' },
    { id: 14, name: 'Tab Solutions', email: 'tab@example.com', role: 'Employer', joined: '2 days ago' },
    { id: 15, name: 'Matter Lock', email: 'matterlock@example.com', role: 'Employer', joined: '2 days ago' },
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
