import { Component, inject, OnInit } from '@angular/core';
import { FooterComponent } from "../../reusable/footer/footer.component";
import { NgFor, NgIf } from '@angular/common';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
// import { faBookmark } from '@fortawesome/free-solid-svg-icons';
import { faBookmark } from '@fortawesome/free-regular-svg-icons';
import { GetJobForCandidate } from '../../../model/job';
import { JobService } from '../../../services/job/job.service';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../../../services/auth/auth.service';
import { UserModel } from '../../../model/user';
import { GeneralResponse } from '../../../model/response';

@Component({
  selector: 'app-viewjob',
  standalone: true,
  imports: [FooterComponent, NgFor, FaIconComponent, NgIf ],
  templateUrl: './viewjob.component.html',
  styleUrl: './viewjob.component.css'
})
export class ViewjobComponent implements OnInit  {

  aftersave = faBookmark
  beforesave = faBookmark

  job: GetJobForCandidate | null = null
  user: UserModel | null = null
  jobService = inject(JobService)
  authService = inject(AuthService)
  jobId!: number
  //id!: string

  constructor(private activatedRoute: ActivatedRoute){}
 
  ngOnInit(): void {
    this.getJobByIdForCandidate()
  }
  
  getJobByIdForCandidate(){
    this.jobId = +this.activatedRoute.snapshot.paramMap.get('id')!
    if(this.jobId){
      this.jobService.getJobByIdForCandidate(this.jobId).subscribe((response: GetJobForCandidate)=> {
        this.job = response
        this.getUserById(this.job.employerId)
      })
    }
  }

  getUserById(employerId: string){
    const id = employerId
    this.authService.getUserById(id).subscribe( {
      next: (response) => {
        this.user = response
      }
    })
  }


  jobApply(jobId: number){
    const id = jobId
    if(this.jobId){
      if(confirm('Apply for job? Your profile will be then visible to employer.')){
        this.jobService.applyForJob(id).subscribe((response: GeneralResponse) => {
          if(response.isSuccess){
            alert(response.message)
          }else{
            alert('Failed to apply for job.')
          } 
        })
      }
    }else{
      console.error('Error fetching id')
    }
  }
}
