import { Component, inject, OnInit } from '@angular/core';
import { SidebarComponent } from '../../../../reusable/sidebar/sidebar.component';
import { HeaderComponent } from '../../../../reusable/header/header.component';
import { NgFor, NgIf } from '@angular/common';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { faUser, faTrash, faClose, faFilePdf,faBusinessTime, faBook, faBriefcase, faBookBookmark, faCheckCircle, faExclamationCircle, faDashboard, faLocationArrow, faContactBook, faMailForward, faUserEdit, faEdit } from '@fortawesome/free-solid-svg-icons';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { UserModel } from '../../../../../model/user';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../../../../../services/auth/auth.service';
import { ExperiencesService } from '../../../../../services/experiences/experiences.service';
import { AcademicService } from '../../../../../services/academic/academic.service';
import { ProjectsService } from '../../../../../services/projects/projects.service';
import { Experience } from '../../../../../model/experience';

@Component({
  selector: 'app-candidate-profile',
  standalone: true,
  imports: [SidebarComponent, HeaderComponent, FaIconComponent, NgFor, NgIf, PdfViewerModule],
  templateUrl: './candidate-profile.component.html',
  styleUrls: ['./candidate-profile.component.css']
})
export class CandidateProfileComponent implements OnInit {

  checkCircle = faCheckCircle; excCircle = faExclamationCircle; location = faLocationArrow; contact = faContactBook; mail = faMailForward; close = faClose; pdf = faFilePdf

  collapsed = false;

  candidate: UserModel | null = null
  experiences: Experience[] = []
  candidateId!: string
  authService = inject(AuthService)
  experienceService = inject(ExperiencesService)
  academicService = inject(AcademicService)
  projectService = inject(ProjectsService)

  userDetails = 
  {
    firstName: 'Jane', lastName: 'Doe', username: 'jane_doe', emailAddress: 'janedoe123@gmail.com', address: 'Anamnagar, Kathmandu', contact: '9854132541', 
    profilePhoto: 'MyImage', gender: 'Female', jobTitle: 'Jr. Backend Developer', years_of_experience : 1, 
  }

  constructor(private activatedRoute: ActivatedRoute){}

  ngOnInit(): void {
    this.getCandidateDetails()
    this.getExperiences()
  }


  getCandidateDetails(){
    this.candidateId = this.activatedRoute.snapshot.paramMap.get('id')! 
    if(this.candidateId){
      this.authService.getUserById(this.candidateId).subscribe({
        next: (response) => {
          this.candidate = response
        }
      })
    }
  }

  getExperiences(){
    this.experienceService.getAllExperiences().subscribe((response: Experience[]) =>{
      this.experiences = response
    })
  }

  menuItems = [
    { label: 'Dashboard', link: '/employer/dashboard', icon: faDashboard},
    { label: 'Profile', link: '/employer/profile', icon: faUser },
    { label: 'Experiences', link: '/employer/experiences', icon: faBriefcase },
    { label: 'Post Job', link: '/employer/post-job', icon: faBook },
    { label: 'My Jobs', link: '/employer/jobs', icon: faBusinessTime },
    { label: 'Shortlisted Candidates', link: '/employer/shortlisted-candidates', icon: faBookBookmark},
    { label: 'Change Password', link: '/employer/change-password', icon: faEdit}
  ];
  
  skills = [
    {id: 1, skill: 'Frontend'},
    {id: 2, skill: 'Angular'},
    {id: 3, skill: 'ReactJs'},
    {id: 4, skill: 'jQuery'},
    {id: 5, skill: 'Communication'},
    {id: 6, skill: 'Teamwork and collaboration'},
    {id: 7, skill: 'Javascript'},
    {id: 7, skill: 'HTML/CSS'},
    {id: 6, skill: 'Adaptability'},
    {id: 6, skill: 'Time management'},
  ]

  toggleSidebar(): void {
    this.collapsed = !this.collapsed;
  }


}