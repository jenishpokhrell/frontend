import { Component } from '@angular/core';
import { faUser, faBusinessTime, faBook, faBriefcase, faBookBookmark, faDashboard, faEdit } from '@fortawesome/free-solid-svg-icons';
import { SidebarComponent } from '../../../../reusable/sidebar/sidebar.component';
import { HeaderComponent } from '../../../../reusable/header/header.component';
import { RouterOutlet } from '@angular/router';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-employerlayout',
  standalone: true,
  imports: [SidebarComponent, HeaderComponent, RouterOutlet,NgIf],
  templateUrl: './employerlayout.component.html',
  styleUrl: './employerlayout.component.css'
})
export class EmployerlayoutComponent {
  collapsed = false;

  mobileSidebarVisible: boolean = false

  toggleMobileSidebar(){
    this.mobileSidebarVisible = !this.mobileSidebarVisible
  }
  
  toggleSidebar(): void {
    this.collapsed = !this.collapsed;
  }

  menuItems = [
    { label: 'Dashboard', link: '/employer/dashboard', icon: faDashboard},
    { label: 'Profile', link: '/employer/profile', icon: faUser },
    { label: 'Experiences', link: '/employer/experiences', icon: faBriefcase },
    { label: 'Post Job', link: '/employer/post-job', icon: faBook },
    { label: 'My Jobs', link: '/employer/jobs', icon: faBusinessTime },
    { label: 'Shortlisted Candidates', link: '/employer/shortlisted-candidates', icon: faBookBookmark},
    { label: 'Change Password', link: '/employer/change-password', icon: faEdit}
  ];
}
