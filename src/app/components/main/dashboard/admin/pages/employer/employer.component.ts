import { Component, inject, OnInit } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { faClose, faFilePdf, faCheckCircle, faExclamationCircle, faLocationArrow, faContactBook, faMailForward, } from '@fortawesome/free-solid-svg-icons';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { UserModel } from '../../../../../../model/user';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../../../../../services/auth/auth.service';
import { ExperiencesService } from '../../../../../../services/experiences/experiences.service';
import { Experience } from '../../../../../../model/experience';
import { JobService } from '../../../../../../services/job/job.service';
import { GeneralResponse } from '../../../../../../model/response';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-employer',
  standalone: true,
  imports: [ FaIconComponent, NgFor, PdfViewerModule, NgIf],
  templateUrl: './employer.component.html',
  styleUrls: ['./employer.component.css']
})
export class EmployerComponent implements OnInit {

  checkCircle = faCheckCircle; excCircle = faExclamationCircle; location = faLocationArrow; contact = faContactBook; mail = faMailForward; close = faClose; pdf = faFilePdf

  employer: UserModel | null = null
  experiences: Experience[] = []

  employerId!: string

  authService = inject(AuthService)
  experienceService = inject(ExperiencesService)
  jobService = inject(JobService)

  constructor(private activatedRoute: ActivatedRoute){}

  //--------------------------FETCHING USER DETAILS--------------------------
  ngOnInit(): void {
    this.getEmployerDetails()
  }

  getEmployerDetails(){
    this.employerId = this.activatedRoute.snapshot.paramMap.get('employerId')! 
    if(this.employerId){
      this.authService.getUserById(this.employerId).subscribe({
        next: (response) => {
          this.employer = response
          this.getEmployerExperiences(response.id)
        }
      })
    }
  }


  //--------------------------------GETTING EMPLOYER EXPERIENCES------------------------
  getEmployerExperiences(employerId: string){
    const cId = employerId
    if(cId){
      this.experienceService.getCandidateExperienceById(cId).subscribe((response: any) =>{
        this.experiences = response
      })
    }else{
      console.error("Error fetching candidate id")
    }
  }

  approveEmployer(employerId: string){
    const id = employerId;
    if(id){
      Swal.fire({
        title: "Do you want to approve this employer?",
        showDenyButton: true,
        showCancelButton: true,
        confirmButtonText: "Approve",
        denyButtonText: `Hold!`
      }).then((result) => {
        if (result.isConfirmed) {
          this.authService.approveEmployer(id).subscribe((response: GeneralResponse) => {
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

}