import { Component, inject, OnInit } from '@angular/core';
import { faTrash, faCheckCircle, faExclamationCircle, faDashboard, faLocationArrow, faContactBook, faMailForward, faEdit } from '@fortawesome/free-solid-svg-icons';
import { NgFor, NgIf } from '@angular/common';
import { ActivatedRoute, RouterLink, RouterOutlet } from '@angular/router';
import { GetMyJob } from '../../../../../../model/job';
import { UserModel } from '../../../../../../model/user';
import { JobService } from '../../../../../../services/job/job.service';
import { AuthService } from '../../../../../../services/auth/auth.service';

@Component({
  selector: 'app-job-applications',
  standalone: true,
  imports: [NgFor, NgIf, RouterLink, RouterOutlet],
  templateUrl: './job-applications.component.html',
  styleUrls: ['./job-applications.component.css']
})
export class JobApplicationsComponent implements OnInit {

  checkCircle = faCheckCircle; excCircle = faExclamationCircle; location = faLocationArrow; contact = faContactBook; mail = faMailForward; edit = faEdit; delete = faTrash

  job: GetMyJob | null = null
  candidates : UserModel[] = []
  candidate: UserModel | null = null
  jobService = inject(JobService)
  authService = inject(AuthService)
  jobId!: number
  cId!: string


  constructor(private activatedRoute: ActivatedRoute){}

  ngOnInit(): void {
    this.getMyJobById()
  }

  getMyJobById(){
    this.jobId = +this.activatedRoute.snapshot.paramMap.get('id')!
    if(this.jobId){
      this.jobService.getMyJobById(this.jobId).subscribe((response: GetMyJob) => {
        this.job = response
        this.job.jobApplications.forEach(application => {
          this.getCandidateById(application.candidateId)
        })
      })
    }
  }

  getCandidateById(cId: string){
    const id = cId
    if(id){
      this.authService.getUserById(id).subscribe({
        next: (response) => {
          this.candidates.push(response)
        },
        error: (err) => {
          console.error(err)
        }
      })
    }else{
      console.error("Error fetching candidate id")
    }
  }


}