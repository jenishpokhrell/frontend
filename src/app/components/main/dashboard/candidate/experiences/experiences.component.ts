import { Component, inject, OnInit } from '@angular/core';
import { SidebarComponent } from '../../../../reusable/sidebar/sidebar.component';
import { HeaderComponent } from '../../../../reusable/header/header.component';
import { faUser, faGraduationCap, faBriefcase, faProjectDiagram, faFileAlt, faBookmark, faCheckCircle, faExclamationCircle, faDashboard, faLocationArrow, faContactBook, faMailForward, faUserEdit, faEdit, faTrash} from '@fortawesome/free-solid-svg-icons';
import { ReactiveFormsModule, FormControl, FormGroup } from '@angular/forms';
import { NgFor, NgIf } from '@angular/common';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { Experience } from '../../../../../model/experience';
import { ExperiencesService } from '../../../../../services/experiences/experiences.service';
import { AuthService } from '../../../../../services/auth/auth.service';
import { ActivatedRoute } from '@angular/router';
import { ThemeService } from '../../../../../services/theme/theme.service';
import { GeneralResponse } from '../../../../../model/response';

@Component({
  selector: 'app-candidate',
  standalone: true,
  imports: [SidebarComponent, HeaderComponent, ReactiveFormsModule, NgFor, NgIf, FaIconComponent],
  templateUrl: './experiences.component.html',
  styleUrls: ['./experiences.component.css'] 
})
export class ExperiencesComponent implements OnInit {


  checkCircle = faCheckCircle; excCircle = faExclamationCircle; location = faLocationArrow; contact = faContactBook; mail = faMailForward; edit = faEdit; delete = faTrash

  collapsed = false;

  menuItems = [
    { label: 'Dashboard', link: '/candidate/dashboard', icon: faDashboard},
    { label: 'Profile', link: '/candidate/profile', icon: faUser },
    { label: 'Academics', link: '/candidate/academics', icon: faGraduationCap },
    { label: 'Experiences', link: '/candidate/experiences', icon: faBriefcase },
    { label: 'Projects', link: '/candidate/projects', icon: faProjectDiagram },
    { label: 'Applied Jobs', link: '/candidate/applied-jobs', icon: faFileAlt },
    { label: 'Saved Jobs', link: '/candidate/saved-jobs', icon: faBookmark },
    { label: 'Update Profile', link: '/candidate/update-profile', icon: faUserEdit},
    { label: 'Change Password', link: '/candidate/change-password', icon: faEdit}

  ];

  experiences : Experience[] = []
  experienceService = inject(ExperiencesService)
  authService = inject(AuthService)
  id! : number

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

  updateExperiences(){
    const experience = this.editExperience.value
    if(this.id){
      this.experienceService.updateExperiences(this.id, experience).subscribe((response: GeneralResponse) => {
        if(response.IsSuccess){
          alert("Error updating experiences")
        }else{
          alert("Experience updated successfully")
          location.reload()
        }
      })
    }else{
      console.log("Error fetching id")
    }
  }

  toggleSidebar(): void {
    this.collapsed = !this.collapsed;
  }
}