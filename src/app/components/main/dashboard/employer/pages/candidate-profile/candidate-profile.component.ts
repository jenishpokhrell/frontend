import { Component, inject, OnInit } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import {  faClose, faFilePdf,faCheckCircle, faExclamationCircle, faLocationArrow, faContactBook, faMailForward, } from '@fortawesome/free-solid-svg-icons';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { UserModel } from '../../../../../../model/user';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { AuthService } from '../../../../../../services/auth/auth.service';
import { ExperiencesService } from '../../../../../../services/experiences/experiences.service';
import { AcademicService } from '../../../../../../services/academic/academic.service';
import { ProjectsService } from '../../../../../../services/projects/projects.service';
import { Experience } from '../../../../../../model/experience';
import { Project } from '../../../../../../model/project';
import { ResumeService } from '../../../../../../services/resume/resume.service';
import { Resume } from '../../../../../../model/resume';
import { Academic } from '../../../../../../model/academic';
import { UpdateJobApplication } from '../../../../../../model/job';
import { JobService } from '../../../../../../services/job/job.service';
import { SkillsService } from '../../../../../../services/skills/skills.service';
import { Skills } from '../../../../../../model/skill';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-candidate-profile',
  standalone: true,
  imports: [FaIconComponent, NgFor, NgIf, PdfViewerModule, RouterOutlet],
  templateUrl: './candidate-profile.component.html',
  styleUrls: ['./candidate-profile.component.css']
})
export class CandidateProfileComponent implements OnInit {

  checkCircle = faCheckCircle; excCircle = faExclamationCircle; location = faLocationArrow; contact = faContactBook; mail = faMailForward; close = faClose; pdf = faFilePdf


  candidate: UserModel | null = null
  experiences: Experience[] = []
  projects: Project[] = []
  academic: Academic | null = null
  resume: Resume | null = null
  skills: Skills[] = []
  

  candidateId!: string
  jobApplicationId!: number 

  authService = inject(AuthService)
  experienceService = inject(ExperiencesService)
  academicService = inject(AcademicService)
  projectService = inject(ProjectsService)
  resumeServices = inject(ResumeService)
  jobService = inject(JobService)
  skillService = inject(SkillsService)

  constructor(private activatedRoute: ActivatedRoute){}

  //--------------------------FETCHING USER DETAILS--------------------------
  ngOnInit(): void {
    this.getCandidateDetails()
    this.getJobApplicationId()
  }


  getCandidateDetails(){
    this.candidateId = this.activatedRoute.snapshot.paramMap.get('userId')! 
    if(this.candidateId){
      this.authService.getUserById(this.candidateId).subscribe({
        next: (response) => {
          this.candidate = response
          this.getCandidateExperiences(response.id)
          this.getCandidateProjects(response.id)
          this.getCandidateResume(response.id)
          this.getCandidateAcademics(response.id)
          this.getCandidatesSkills(response.id)
        }
      })
    }
  }


  //--------------------------------GETTING CANDIDATE EXPERIENCES------------------------
  getCandidateExperiences(candidateId: string){
    const cId = candidateId
    if(cId){
      this.experienceService.getCandidateExperienceById(cId).subscribe((response: any) =>{
        this.experiences = response
      })
    }else{
      console.error("Error fetching candidate id")
    }
  }


  //--------------------------------GETTING CANDIDATE PROJECTS------------------------//
  getCandidateProjects(candidateId: string){
    const cId= candidateId
    if(cId){
      this.projectService.getProjectByCandidateId(cId).subscribe((response: any) =>{
        this.projects = response
      })
    }else{
      console.error("Error fetching candidate id")
    }
  }


  //--------------------------------GETTING CANDIDATE RESUME------------------------
  getCandidateResume(candidateId: string){
    const id = candidateId;
    if(id){
      this.resumeServices.getCandidateResume(id).subscribe((response: any) => {
        this.resume = response
      })
    }else{
      console.error("Error fetching candidate id")
    }
  }

  //--------------------------------GETTING CANDIDATE ACADEMICS------------------------
  getCandidateAcademics(candidateId: string){
    const id = candidateId;
    if(id){
      this.academicService.getCandidateAcademicsById(id).subscribe((response: any) => {
        this.academic = response
        console.log(response)
      })
    }else{
      console.error("Error fetching candidate id")
    }
  }

  getCandidatesSkills(candidateId: string){
    const id = candidateId;
    if(id){
      this.skillService.getCandidateSkills(id).subscribe((response: any) => {
        this.skills = response
      })
    }
  }

  getJobApplicationId(){
    this.jobApplicationId = +this.activatedRoute.snapshot.paramMap.get('jobApplicationId')! 
  }

  updateJobApplicationStatus(jobApplicationId: number, jobStatus: string){
    const data: UpdateJobApplication = {
      jobStatus: jobStatus,
      updatedAt: new Date()
    }
    Swal.fire({
      title: "Do you want to update the job application status?",
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: "Update",
      denyButtonText: `No`
    }).then((result) => {
      if (result.isConfirmed) {
        this.jobService.updateJobApplication(jobApplicationId, data).subscribe({
          next: (response) => {
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
          },
          error: (err) => {
            console.error(err)
          }
        })
      } else if (result.isDenied) {
        Swal.fire("Operation cancelled", "OKKK", "error");
      }
    });
  }

}