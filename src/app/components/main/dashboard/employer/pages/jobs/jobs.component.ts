import { Component, inject, OnInit } from '@angular/core';
import { faUser, faTrash,faBusinessTime, faBook, faBriefcase, faBookBookmark, faCheckCircle, faExclamationCircle, faDashboard, faLocationArrow, faContactBook, faMailForward, faEdit } from '@fortawesome/free-solid-svg-icons';
import { NgFor, NgIf } from '@angular/common';
import { RouterLink, RouterOutlet } from '@angular/router';
import { GetMyJob } from '../../../../../../model/job';
import { JobService } from '../../../../../../services/job/job.service';

@Component({
  selector: 'app-jobs',
  standalone: true,
  imports: [ NgFor, RouterLink, NgIf, RouterOutlet],
  templateUrl: './jobs.component.html',
  styleUrls: ['./jobs.component.css']
})
export class MyJobsComponent implements OnInit{

  checkCircle = faCheckCircle; excCircle = faExclamationCircle; location = faLocationArrow; contact = faContactBook; mail = faMailForward; edit = faEdit; delete = faTrash

  myJobs : GetMyJob[] = []
  jobService = inject(JobService)

  ngOnInit(): void {
    this.getMyJobs()
  }

  getMyJobs(){
    this.jobService.getMyJobs().subscribe({
      next: (response) => {
        this.myJobs = response
      }
    })
  }

}