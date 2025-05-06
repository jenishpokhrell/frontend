import { Component, inject, OnInit } from '@angular/core';
import { SidebarComponent } from '../../../../../reusable/sidebar/sidebar.component';
import { HeaderComponent } from '../../../../../reusable/header/header.component';
import { faUser, faGraduationCap, faBriefcase, faProjectDiagram, faFileAlt, faBookmark, faCheckCircle, faExclamationCircle, faDashboard, faLocationArrow, faContactBook, faMailForward, faUserEdit, faEdit, faTrash} from '@fortawesome/free-solid-svg-icons';
import { ReactiveFormsModule, FormControl, FormGroup } from '@angular/forms';
import { NgFor, NgIf } from '@angular/common';
import { GetJobForCandidate } from '../../../../../../model/job';
import { JobService } from '../../../../../../services/job/job.service';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-saved-jobs',
  standalone: true, 
  imports: [SidebarComponent, HeaderComponent, ReactiveFormsModule, NgFor, RouterLink, RouterOutlet, NgIf],
  templateUrl: './saved-jobs.component.html',
  styleUrls: ['./saved-jobs.component.css']
})
export class SavedJobsComponent implements OnInit {

  checkCircle = faCheckCircle; excCircle = faExclamationCircle; location = faLocationArrow; contact = faContactBook; mail = faMailForward; edit = faEdit; delete = faTrash


  savedJobs : GetJobForCandidate[] = []
  jobService = inject(JobService)

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

}