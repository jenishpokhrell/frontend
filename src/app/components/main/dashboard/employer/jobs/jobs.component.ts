import { Component } from '@angular/core';
import { SidebarComponent } from '../../../../reusable/sidebar/sidebar.component';
import { HeaderComponent } from '../../../../reusable/header/header.component';
import { faUser, faTrash, faClose, faFilePdf,faBusinessTime, faBook, faBriefcase, faBookBookmark, faCheckCircle, faExclamationCircle, faDashboard, faLocationArrow, faContactBook, faMailForward, faUserEdit, faEdit } from '@fortawesome/free-solid-svg-icons';
import { ReactiveFormsModule, FormControl, FormGroup } from '@angular/forms';
import { NgFor } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-candidate',
  standalone: true,
  imports: [SidebarComponent, HeaderComponent, ReactiveFormsModule, NgFor, RouterLink],
  templateUrl: './jobs.component.html',
  styleUrls: ['./jobs.component.css']
})
export class MyJobsComponent {

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
    //{ label: 'Job Applications', link: '/employer/job-applications', icon: faBook },
    { label: 'Shortlisted Candidates', link: '/employer/shortlisted-candidates', icon: faBookBookmark},
    { label: 'Change Password', link: '/employer/change-password', icon: faEdit}
  ];


  savedJobs = [
    {jobTitle: 'Frontend Intern', jobType: 'Full-Time', jobLevel: 'Internship', noOfOpenings: 3, experienceRequired: 0, Status: true},
    {jobTitle: 'Fullstack Intern', jobType: 'Full-Time',jobLevel: 'Internship', noOfOpenings: 2, experienceRequired: 0, Status: true},
    {jobTitle: 'Frontend Developer', jobType: 'Full-Time', jobLevel: 'Trainee',  noOfOpenings: 4, experienceRequired: 1, Status: false},
    { jobTitle: 'Angular Developer', jobType: 'Full-Time', jobLevel: 'Junior', noOfOpenings: 3, experienceRequired: 1, Status: true},
  ]

  toggleSidebar(): void {
    this.collapsed = !this.collapsed;
  }

  logout(): void {
    console.log('Logout clicked');
    // Implement logout logic
  }

}