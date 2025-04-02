import { Component } from '@angular/core';
import { SidebarComponent } from '../../../../reusable/sidebar/sidebar.component';
import { HeaderComponent } from '../../../../reusable/header/header.component';
import { faUser, faTrash, faClose, faFilePdf,faBusinessTime, faBook, faBriefcase, faBookBookmark, faCheckCircle, faExclamationCircle, faDashboard, faLocationArrow, faContactBook, faMailForward, faUserEdit, faEdit } from '@fortawesome/free-solid-svg-icons';
import { ReactiveFormsModule, FormControl, FormGroup } from '@angular/forms';
import { NgFor } from '@angular/common';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';

@Component({
  selector: 'app-candidate',
  standalone: true,
  imports: [SidebarComponent, HeaderComponent, ReactiveFormsModule, NgFor, FaIconComponent],
  templateUrl: './experiences.component.html',
  styleUrls: ['./experiences.component.css']
})
export class EmployerExperiencesComponent {

  title = 'My Academics'

  checkCircle = faCheckCircle; excCircle = faExclamationCircle; location = faLocationArrow; contact = faContactBook; mail = faMailForward; edit = faEdit; delete = faTrash

  collapsed = false;
  user = {
    name: 'Shristi Sharma',
    role: 'Employer'
  };

  menuItems = [
    { label: 'Dashboard', link: '/employer/dashboard', icon: faDashboard},
    { label: 'Profile', link: '/employer/profile', icon: faUser },
    { label: 'Experiences', link: '/employer/experiences', icon: faBriefcase },
    { label: 'My Jobs', link: '/employer/jobs', icon: faBusinessTime },
    { label: 'Job Applications', link: '/employer/job-applications', icon: faBook },
    { label: 'Shortlisted Candidates', link: '/employer/shortlisted-candidates', icon: faBookBookmark},
    { label: 'Change Password', link: '/employer/change-password', icon: faEdit}
  ];

  experiences = [
    {jobTitle: 'Frontend Intern', companyName: 'Omega Tech', from: '2024-9-12', to: '2024-12-11', isCurrentlyWoring: false, jobDescription: 'I worked as an frontend intern. My task was to develop a user friendly website. Also I was tasked to integrate API from backend.'},
    {jobTitle: 'Frontend Trainee', companyName: 'C&M Tech', from: '2024-12-27', to: '2025-1-12', isCurrentlyWoring: true, jobDescription: 'I am currently working as an frontend trainee. My task is to develop a user friendly website. Also I am tasked to integrate API from backend. I collaborate with my teams to develop a real world project.'},
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