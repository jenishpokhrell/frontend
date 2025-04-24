import { Component, inject, OnInit } from '@angular/core';
import { FooterComponent } from "../../reusable/footer/footer.component";
import { NgFor, NgIf } from '@angular/common';
import { faBookmark } from '@fortawesome/free-regular-svg-icons';
import { GetJobForCandidate } from '../../../model/job';
import { JobService } from '../../../services/job/job.service';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../../../services/auth/auth.service';
import { UserModel } from '../../../model/user';
import { GeneralResponse } from '../../../model/response';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-viewjob',
  standalone: true,
  imports: [FooterComponent, NgFor, NgIf],
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
    if(id){
      Swal.fire({
        title: "Do you want to apply for the job? Employer then will be able to access your profile.",
        showDenyButton: true,
        showCancelButton: true,
        confirmButtonText: "Apply",
        denyButtonText: `Go Back`
      }).then((result) => {
        if (result.isConfirmed) {
          this.jobService.applyForJob(id).subscribe((response: GeneralResponse) => {
            if(response.isSuccess){
              Swal.fire({
                position: "top-end",
                icon: "success",
                title: response.message,
                showConfirmButton: false,
                timer: 3000
              });
            }else{
              Swal.fire({
                position: "top-end",
                icon: "error",
                title: response.message,
                showConfirmButton: false,
                timer: 3000
              });
            }
          })
        } else if (result.isDenied) {
          Swal.fire("Operation cancelled", "", "error");
        }
      });
    }else{
      console.error('Error fetching id')
    }
  }

  saveJob(jobId: number){
    const id = jobId
    if(id){
      Swal.fire({
        title: "Do you want to save this job?",
        showDenyButton: true,
        showCancelButton: true,
        confirmButtonText: "Save",
        denyButtonText: `Don't save`
      }).then((result) => {
        if (result.isConfirmed) {
          this.jobService.saveJob(id).subscribe((response: GeneralResponse) => {
            if(response.isSuccess){
              Swal.fire({
                position: "top-end",
                icon: "success",
                title: response.message,
                showConfirmButton: false,
                timer: 1500
              });
            }else{
              Swal.fire({
                position: "top-end",
                icon: "error",
                title: response.message,
                showConfirmButton: false,
                timer: 1500
              });
            }
          })
        } else if (result.isDenied) {
          Swal.fire("Operation cancelled", "", "error");
        }
      });
    }
  }
}
