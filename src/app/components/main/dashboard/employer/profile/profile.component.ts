import { Component } from '@angular/core';
import { SidebarComponent } from '../../../../reusable/sidebar/sidebar.component';
import { HeaderComponent } from '../../../../reusable/header/header.component';
import { NgFor } from '@angular/common';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { faUser, faClose, faFilePdf,faBusinessTime, faBook, faBriefcase, faBookBookmark, faCheckCircle, faExclamationCircle, faDashboard, faLocationArrow, faContactBook, faMailForward, faUserEdit, faEdit } from '@fortawesome/free-solid-svg-icons';
import { PdfViewerModule } from 'ng2-pdf-viewer';

@Component({
  selector: 'app-candidate',
  standalone: true,
  imports: [SidebarComponent, HeaderComponent, FaIconComponent, NgFor, PdfViewerModule],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class EmployerProfileComponent {

  checkCircle = faCheckCircle; excCircle = faExclamationCircle; location = faLocationArrow; contact = faContactBook; mail = faMailForward; close = faClose; pdf = faFilePdf

  collapsed = false;
  user = {
    name: 'Shristi Sharma',
    role: 'Employer'
  };

  userDetails = 
  {
    firstName: 'Shristi', lastName: 'Sharma', username: 'shristi_sharma', emailAddress: 'shristi_sharma123@gmail.com', address: 'New Baneshwor, Kathmandu', contact: '9874512536', 
    profilePhoto: 'MyImage', gender: 'Female', jobTitle: 'Senior HR Maneger', years_of_experience : 6, 
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

  skills = [
    {id: 1, skill: 'Frontend'},
    {id: 2, skill: 'Angular'},
    {id: 3, skill: 'ReactJs'},
    {id: 4, skill: 'jQuery'},
    {id: 5, skill: 'Communication'},
    {id: 6, skill: 'Teamwork and collaboration'},
    {id: 7, skill: 'Javascript'},
    {id: 7, skill: 'HTML/CSS'},
    {id: 6, skill: 'Adaptability'},
    {id: 6, skill: 'Time management'},
  ]

  toggleSidebar(): void {
    this.collapsed = !this.collapsed;
  }

  logout(): void {
    console.log('Logout clicked');
    // Implement logout logic
  }

  getStatusClass(status: string): string {
    switch(status) {
      case 'Shortlisted':
        return 'bg-green-100 text-green-800';
      case 'Applied':
        return 'bg-blue-100 text-blue-800';
      case 'Rejected':
        return 'bg-red-100 text-red-800';
      case 'Interview':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  }
}