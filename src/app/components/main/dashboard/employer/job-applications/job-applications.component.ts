import { Component } from '@angular/core';
import { SidebarComponent } from '../../../../reusable/sidebar/sidebar.component';
import { HeaderComponent } from '../../../../reusable/header/header.component';
import { faUser, faTrash, faClose, faFilePdf,faBusinessTime, faBook, faBriefcase, faBookBookmark, faCheckCircle, faExclamationCircle, faDashboard, faLocationArrow, faContactBook, faMailForward, faUserEdit, faEdit } from '@fortawesome/free-solid-svg-icons';
import { ReactiveFormsModule, FormControl, FormGroup } from '@angular/forms';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-candidate',
  standalone: true,
  imports: [SidebarComponent, HeaderComponent, ReactiveFormsModule, NgFor],
  templateUrl: './job-applications.component.html',
  styleUrls: ['./job-applications.component.css']
})
export class JobApplicationsComponent {

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

  candidates = [
    { id: 1, name: 'John Doe', position: 'Frontend Intern', yoe: 0, address: 'Pulchowk, Lalitpur', email: 'johndoe123@gmail.com', status: 'Shortlisted' },
    { id: 1, name: 'Jane Doe', position: 'Frontend Trainee', yoe: 0, address: 'Jawalakhel, Lalitpur', email: 'janedoe123@gmail.com', status: 'Pending' },
    { id: 1, name: 'Nina Dobrev', position: 'Frontend Developer', yoe: 1, address: 'Anamnagar, Kathmandur', email: 'ninadobrev123@gmail.com', status: 'Rejected' },
    { id: 1, name: 'Dinesh Neupane', position: 'Angular Developer', yoe: 1, address: 'Thimi, Bhaktapur', email: 'dineshneupane123@gmail.com', status: 'Pending' },
  ];

  toggleSidebar(): void {
    this.collapsed = !this.collapsed;
  }

  logout(): void {
    console.log('Logout clicked');
    // Implement logout logic
  }

}