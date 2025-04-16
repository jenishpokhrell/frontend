import { Component, inject, OnInit } from '@angular/core';
import { SidebarComponent } from '../../../../reusable/sidebar/sidebar.component';
import { HeaderComponent } from '../../../../reusable/header/header.component';
import { faUser, faGraduationCap, faBriefcase, faBook, faBookBookmark, faBusinessTime,  faCheckCircle, faExclamationCircle, faDashboard, faLocationArrow, faContactBook, faMailForward, faUserEdit, faEdit, faTrash} from '@fortawesome/free-solid-svg-icons';
import { ReactiveFormsModule, FormControl, FormGroup } from '@angular/forms';
import { NgFor, NgIf } from '@angular/common';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { Experience } from '../../../../../model/experience';
import { ExperiencesService } from '../../../../../services/experiences/experiences.service';
import { AuthService } from '../../../../../services/auth/auth.service';
import { GeneralResponse } from '../../../../../model/response';

@Component({
  selector: 'app-candidate',
  standalone: true,
  imports: [SidebarComponent, HeaderComponent, ReactiveFormsModule, NgFor, NgIf, FaIconComponent],
  templateUrl: './experiences.component.html',
  styleUrls: ['./experiences.component.css'] 
})
export class EmployerExperiencesComponent implements OnInit {


  checkCircle = faCheckCircle; excCircle = faExclamationCircle; location = faLocationArrow; contact = faContactBook; mail = faMailForward; edit = faEdit; delete = faTrash

  collapsed = false;

  menuItems = [
    { label: 'Dashboard', link: '/employer/dashboard', icon: faDashboard},
    { label: 'Profile', link: '/employer/profile', icon: faUser },
    { label: 'Experiences', link: '/employer/experiences', icon: faBriefcase },
    { label: 'Post Job', link: '/employer/post-job', icon: faBook },
    { label: 'My Jobs', link: '/employer/jobs', icon: faBusinessTime },
    { label: 'Shortlisted Candidates', link: '/employer/shortlisted-candidates', icon: faBookBookmark},
    { label: 'Change Password', link: '/employer/change-password', icon: faEdit}
  ];

  experiences : Experience[] = []
  experienceService = inject(ExperiencesService)
  authService = inject(AuthService)
  id! : number
  editMode: boolean = false

  editExperience: FormGroup = new FormGroup({
    jobTitle: new FormControl(''),
    companyName: new FormControl(''),
    jobDescription: new FormControl(''),
    from: new FormControl(''),
    to: new FormControl('')
  })


  ngOnInit(): void {
    this.getMyExperiences()
  }

  getExperienceById(experienceId: number){
    this.editMode = true
    const id = experienceId
    if(id){
      this.experienceService.getExperienceById(id).subscribe((response: Experience) => {
        this.editExperience.patchValue(response)
        this.id = response.experienceId
      })
    }else{
      console.log("ExperienceId not found")
    }
  }

  getMyExperiences(){
    this.experienceService.getMyExperiences().subscribe({
      next: (response) => {
        this.experiences = response
      }
    })
  }

  saveExperiences(){
    const experience = this.editExperience.value;
    this.experienceService.saveExperiences(experience).subscribe((response: GeneralResponse) => {
      if(response.isSuccess){
        alert(response.message)
        location.reload()
      }else{
        alert("Failed to save academics")
      }
    })
  }

  updateExperiences(){
    const experience = this.editExperience.value
    if(this.id){
      this.experienceService.updateExperiences(this.id, experience).subscribe((response: GeneralResponse) => {
        if(response.isSuccess){
          alert(response.message)
          location.reload()
        }else{
          alert("Error updating experiences")
        }
      })
    }else{
      console.log("Error fetching id")
    }
  }

  deleteExperiences(id: number){
    if(confirm('Are you sure you want to delete this work experience?')){
      this.experienceService.deleteExperiences(id).subscribe((response: GeneralResponse) => {
        if(response.isSuccess){
          alert(response.message)
          location.reload()
        }else{
          alert("Failed to delete work experience.")
        }
      })
    }
  }

  toggleSidebar(): void {
    this.collapsed = !this.collapsed;
  }
}