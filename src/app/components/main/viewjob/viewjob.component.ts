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
  employerId!: string

  constructor(private activatedRoute: ActivatedRoute){}
 
  ngOnInit(): void {
    this.getJobByIdForCandidate()
    this.getUserById(this.employerId)
  }
  
  getJobByIdForCandidate(){
    this.jobId = +this.activatedRoute.snapshot.paramMap.get('id')!
    if(this.jobId){
      this.jobService.getJobByIdForCandidate(this.jobId).subscribe((response: GetJobForCandidate)=> {
        this.job = response
      })
    }
  }

  getUserById(employerId: string){
    const id = this.employerId
    this.authService.getUserById(id).subscribe({
      next: (response) => {
        this.user = response
      }
    })
  }


  JobApply(){
    window.confirm("thank you for applying")
  }
}
