import { Component } from '@angular/core';
import { SidebarComponent } from '../../../../reusable/sidebar/sidebar.component';
import { HeaderComponent } from '../../../../reusable/header/header.component';
import { faUser, faTrash, faClose, faFilePdf,faBusinessTime, faBook, faBriefcase, faBookBookmark, faCheckCircle, faExclamationCircle, faDashboard, faLocationArrow, faContactBook, faMailForward, faUserEdit, faEdit } from '@fortawesome/free-solid-svg-icons';
import { ReactiveFormsModule, FormControl, FormGroup } from '@angular/forms';
import { NgFor } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-job-applications',
  standalone: true,
  imports: [SidebarComponent, HeaderComponent, ReactiveFormsModule, NgFor, RouterLink],
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
    { label: 'Post Job', link: '/employer/post-job', icon: faBook },
    { label: 'My Jobs', link: '/employer/jobs', icon: faBusinessTime },
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

  job = [{
    jobTitle: '.NET Developer with angular', jobType: 'Full-Time', jobLevel: 'Junior', openings: 4, minExp : 1, maxExp: 2, minSalary: 30000, maxSalary: 40000, location: 'Pulchowk, Lalitpur',
    isActive: true, jobDescription: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Dolor reiciendis aspernatur quisquam sunt culpa soluta libero, debitis ipsum est rem itaque? Consectetur voluptate dolor explicabo amet quisquam earum atque impedit, ratione laudantium modi unde repellat quam, consequuntur cum accusantium deleniti delectus? Ad officia odit ex maiores magni, totam veritatis? Corrupti quo cumque possimus quis ullam laborum expedita delectus in quibusdam sapiente, voluptatibus tenetur mollitia commodi incidunt sint obcaecati accusamus culpa nulla exercitationem ad eum earum beatae ipsa quod! Temporibus voluptates pariatur cupiditate tempora animi consequatur. Autem ipsam perferendis voluptatum. Iste atque aspernatur est quae, vel earum beatae. Corporis maiores delectus, animi et quidem molestias nemo molestiae accusamus est soluta voluptates similique optio totam blanditiis sunt tempore magni nam aut eveniet fugit ipsam debitis doloribus modi? Totam, et modi. Voluptates, dicta?',
    requirements: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Dolor reiciendis aspernatur quisquam sunt culpa soluta libero, debitis ipsum est rem itaque? Consectetur voluptate dolor explicabo amet quisquam earum atque impedit, ratione laudantium modi unde repellat quam, consequuntur cum accusantium deleniti delectus? Ad officia odit ex maiores magni, totam veritatis? Corrupti quo cumque possimus quis ullam laborum expedita delectus in quibusdam sapiente, voluptatibus tenetur mollitia commodi incidunt sint obcaecati accusamus culpa nulla exercitationem ad eum earum beatae ipsa quod! Temporibus voluptates pariatur cupiditate tempora animi consequatur. Autem ipsam perferendis voluptatum. Iste atque aspernatur est quae, vel earum beatae. Corporis maiores delectus, animi et quidem molestias nemo molestiae accusamus est soluta voluptates similique optio totam blanditiis sunt tempore magni nam aut eveniet fugit ipsam debitis doloribus modi? Totam, et modi. Voluptates, dicta?'
  }]

  toggleSidebar(): void {
    this.collapsed = !this.collapsed;
  }

  logout(): void {
    console.log('Logout clicked');
    // Implement logout logic
  }

}