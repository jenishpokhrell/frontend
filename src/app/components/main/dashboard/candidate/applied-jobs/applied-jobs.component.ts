import { Component, inject } from '@angular/core';
import { SidebarComponent } from '../../../../reusable/sidebar/sidebar.component';
import { HeaderComponent } from '../../../../reusable/header/header.component';
import { faUser, faGraduationCap, faBriefcase, faProjectDiagram, faFileAlt, faBookmark, faCheckCircle, faExclamationCircle, faDashboard, faLocationArrow, faContactBook, faMailForward, faUserEdit, faEdit, faTrash} from '@fortawesome/free-solid-svg-icons';
import { ReactiveFormsModule, FormControl, FormGroup } from '@angular/forms';
import { NgFor } from '@angular/common';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { RouterLink, RouterOutlet } from '@angular/router';
import { MyJobApplications } from '../../../../../model/job';
import { JobService } from '../../../../../services/job/job.service';

@Component({
  selector: 'app-candidate',
  standalone: true,
  imports: [SidebarComponent, HeaderComponent, ReactiveFormsModule, NgFor, FaIconComponent, RouterOutlet, RouterLink],
  templateUrl: './applied-jobs.component.html',
  styleUrls: ['./applied-jobs.component.css']
})
export class AppliedJobsComponent {

  title = 'My Academics'

  checkCircle = faCheckCircle; excCircle = faExclamationCircle; location = faLocationArrow; contact = faContactBook; mail = faMailForward; edit = faEdit; delete = faTrash

  collapsed = false;

  menuItems = [
    { label: 'Dashboard', link: '/candidate/dashboard', icon: faDashboard},
    { label: 'Profile', link: '/candidate/profile', icon: faUser },
    { label: 'Academics', link: '/candidate/academics', icon: faGraduationCap },
    { label: 'Experiences', link: '/candidate/experiences', icon: faBriefcase },
    { label: 'Projects', link: '/candidate/projects', icon: faProjectDiagram },
    { label: 'Applied Jobs', link: '/candidate/applied-jobs', icon: faFileAlt },
    { label: 'Saved Jobs', link: '/candidate/saved-jobs', icon: faBookmark },
    { label: 'Change Password', link: '/candidate/change-password', icon: faEdit}

  ];

  appliedJobs : MyJobApplications[] = []
  jobService = inject(JobService)
  jobId! : number

  ngOnInit(): void {
      this.getMyJobApplications()
  }

  getMyJobApplications(){
    this.jobService.getMyJobApplications().subscribe((response: any) => {
      this.appliedJobs = response
    })
  }

  toggleSidebar(): void {
    this.collapsed = !this.collapsed;
  }

}