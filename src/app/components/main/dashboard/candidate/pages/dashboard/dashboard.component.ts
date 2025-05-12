import { Component, inject, OnInit } from '@angular/core';
import { SidebarComponent } from '../../../../../reusable/sidebar/sidebar.component';
import { HeaderComponent } from '../../../../../reusable/header/header.component';
import { NgFor, NgIf, SlicePipe } from '@angular/common';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import {  faUserCheck, faFileAlt, faBookmark, faCheckCircle, faExclamationCircle } from '@fortawesome/free-solid-svg-icons';
import { AuthService } from '../../../../../../services/auth/auth.service';
import { UserModel } from '../../../../../../model/user';
import { JobService } from '../../../../../../services/job/job.service';
import { GetJobForCandidate, MyJobApplications } from '../../../../../../model/job';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [NgFor, FaIconComponent, NgIf, SlicePipe, RouterLink],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class CandidateDashboardComponent implements OnInit{

  checkCircle = faCheckCircle; excCircle = faExclamationCircle; check= faUserCheck; saved = faBookmark; file = faFileAlt


  applicationsCount : number = 0
  shortlistedCount: number = 0
  jobsCount: number = 0
  savedJobsCount : number = 0

  stats : any[] = []

  authService = inject(AuthService)
  jobService = inject(JobService)

  user: UserModel | null = null
  jobApplications: MyJobApplications[] = []
  mySavedJobs : GetJobForCandidate[] = []
  jobs: GetJobForCandidate[] = []
  sortedJobs: GetJobForCandidate[] = []

  getMyDetails(){
    this.authService.getMyDetails().subscribe({
      next: (response) => {
        this.user = response
      }
    })
  }

  getJobs(){
    this.jobService.getJobsForCandidate().subscribe({
      next: (response) => {
        this.jobs = response
        this.sortedJobs = this.jobs.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
        this.jobsCount = this.jobs.filter(job => job.isActive === true).length
      }
    })
  }

  getMySavedJobs(){
    this.jobService.getMySavedJobs().subscribe({
      next: (response) => {
        this.mySavedJobs = response
        this.savedJobsCount = this.mySavedJobs.length
        
      }
    })
  }

  getMyJobApplications(){
    this.jobService.getMyJobApplications().subscribe({
      next: (response) => {
        this.jobApplications = response
        this.applicationsCount = this.jobApplications.length
        this.shortlistedCount = response.filter((item:any) => item.jobStatus === 'Shortlisted').length
        
      }
    })
  }

  
  ngOnInit() {
    this.getMyDetails()
    this.getJobs()
    this.getMySavedJobs()
    this.getMyJobApplications()
  }

}