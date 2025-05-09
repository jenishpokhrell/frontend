import { Component, inject, OnInit } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import {  faClose, faFilePdf,faCheckCircle, faExclamationCircle, faLocationArrow, faContactBook, faMailForward, } from '@fortawesome/free-solid-svg-icons';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { UserModel } from '../../../../../../model/user';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { AuthService } from '../../../../../../services/auth/auth.service';
import { ExperiencesService } from '../../../../../../services/experiences/experiences.service';
import { Experience } from '../../../../../../model/experience';

@Component({
  selector: 'app-employerprofileforcandidate',
  standalone: true,
  imports: [FaIconComponent, NgFor, NgIf, PdfViewerModule, RouterOutlet],
  templateUrl: './employerprofileforcandidate.component.html',
  styleUrls: ['./employerprofileforcandidate.component.css']
})
export class EmployerprofileforcandidateComponent implements OnInit {

  checkCircle = faCheckCircle; excCircle = faExclamationCircle; location = faLocationArrow; contact = faContactBook; mail = faMailForward; close = faClose; pdf = faFilePdf


  employer: UserModel | null = null
  experiences: Experience[] = []

  employerId!: string

  authService = inject(AuthService)
  experienceService = inject(ExperiencesService)

  constructor(private activatedRoute: ActivatedRoute){}

  //--------------------------FETCHING USER DETAILS--------------------------
  ngOnInit(): void {
    this.getEmployerDetails()
  }


  getEmployerDetails(){
    this.employerId = this.activatedRoute.snapshot.paramMap.get('userId')! 
    if(this.employerId){
      this.authService.getUserById(this.employerId).subscribe({
        next: (response) => {
          this.employer = response
          this.geEmployerExperiences(response.id)
          
        }
      })
    }
  }


  //--------------------------------GETTING CANDIDATE EXPERIENCES------------------------
  geEmployerExperiences(employerId: string){
    const cId = employerId
    if(cId){
      this.experienceService.getCandidateExperienceById(cId).subscribe((response: any) =>{
        this.experiences = response
      })
    }else{
      console.error("Error fetching candidate id")
    }
  }

}
