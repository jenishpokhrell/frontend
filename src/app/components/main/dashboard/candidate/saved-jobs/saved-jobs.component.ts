import { Component, inject, OnInit } from '@angular/core';
import { SidebarComponent } from '../../../../reusable/sidebar/sidebar.component';
import { HeaderComponent } from '../../../../reusable/header/header.component';
import { faUser, faGraduationCap, faBriefcase, faProjectDiagram, faFileAlt, faBookmark, faCheckCircle, faExclamationCircle, faDashboard, faLocationArrow, faContactBook, faMailForward, faUserEdit, faEdit, faTrash} from '@fortawesome/free-solid-svg-icons';
import { ReactiveFormsModule, FormControl, FormGroup } from '@angular/forms';
import { NgFor } from '@angular/common';
import { GetJobForCandidate } from '../../../../../model/job';
import { JobService } from '../../../../../services/job/job.service';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-saved-jobs',
  standalone: true, 
  imports: [SidebarComponent, HeaderComponent, ReactiveFormsModule, NgFor, RouterLink, RouterOutlet],
  templateUrl: './saved-jobs.component.html',
  styleUrls: ['./saved-jobs.component.css']
})
export class SavedJobsComponent implements OnInit {

  checkCircle = faCheckCircle; excCircle = faExclamationCircle; location = faLocationArrow; contact = faContactBook; mail = faMailForward; edit = faEdit; delete = faTrash
  collapsed = false;


  savedJobs : GetJobForCandidate[] = []
  jobService = inject(JobService)

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

  ngOnInit(): void {
    this.getMySavedJobs()
  }

  getMySavedJobs(){
    this.jobService.getMySavedJobs().subscribe({
      next: (response) => {
        this.savedJobs = response
      }
    })
  }

  toggleSidebar(): void {
    this.collapsed = !this.collapsed;
  }

}