import { Component, inject } from '@angular/core';
import { faCheckCircle, faExclamationCircle, faLocationArrow, faContactBook, faMailForward, faEdit, faTrash} from '@fortawesome/free-solid-svg-icons';
import { ReactiveFormsModule } from '@angular/forms';
import { NgFor, NgIf } from '@angular/common';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { RouterLink, RouterOutlet } from '@angular/router';
import { MyJobApplications } from '../../../../../../model/job';
import { JobService } from '../../../../../../services/job/job.service';

@Component({
  selector: 'app-applied-jobs',
  standalone: true,
  imports: [ ReactiveFormsModule, NgFor, FaIconComponent, RouterOutlet, RouterLink, NgIf],
  templateUrl: './applied-jobs.component.html',
  styleUrls: ['./applied-jobs.component.css']
})
export class AppliedJobsComponent {

  checkCircle = faCheckCircle; excCircle = faExclamationCircle; location = faLocationArrow; contact = faContactBook; mail = faMailForward; edit = faEdit; delete = faTrash

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

}