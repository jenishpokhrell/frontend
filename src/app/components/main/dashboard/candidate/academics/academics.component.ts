import { Component, inject, OnInit } from '@angular/core';
import { SidebarComponent } from '../../../../reusable/sidebar/sidebar.component';
import { HeaderComponent } from '../../../../reusable/header/header.component';
import { faUser, faGraduationCap, faBriefcase, faProjectDiagram, faFileAlt, faBookmark, faCheckCircle, faExclamationCircle, faDashboard, faLocationArrow, faContactBook, faMailForward, faUserEdit, faEdit } from '@fortawesome/free-solid-svg-icons';
import { ReactiveFormsModule, FormControl, FormGroup } from '@angular/forms';
import { Academic } from '../../../../../model/academic';
import { AcademicService } from '../../../../../services/academic/academic.service';
import { NgIf } from '@angular/common';
import { GeneralResponse } from '../../../../../model/response';
import { AuthService } from '../../../../../services/auth/auth.service';

@Component({
  selector: 'app-candidate',
  standalone: true,
  imports: [SidebarComponent, HeaderComponent, ReactiveFormsModule, NgIf],
  templateUrl: './academics.component.html',
  styleUrls: ['./academics.component.css']
})
export class AcademicsComponent implements OnInit {

  title = 'My Academics'

  checkCircle = faCheckCircle; excCircle = faExclamationCircle; location = faLocationArrow; contact = faContactBook; mail = faMailForward;

  collapsed = false;
  user = {
    name: 'Jane Doe',
    role: 'Candidate'
  };

  academics : Academic | null = null
  academicServices = inject(AcademicService)
  authService = inject(AuthService)

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

  academic: FormGroup = new FormGroup({
    institutionName: new FormControl(''),
    stream: new FormControl(''),
    startYear: new FormControl(''),
    graduationYear: new FormControl(''),
    degreeType: new FormControl(''),
    currentSemester: new FormControl(''),
  })
  
  academicId! : number

  ngOnInit(): void {
    this.getMyAcademics()
    this.academicServices.getMyAcademics().subscribe((response: Academic) => {
      if(response){
        this.academic.patchValue(response)
        this.academic.disable()
      }
    })
  }

  enableForm(){
    this.academic.enable()
  }

  getMyAcademics(){
    return this.academicServices.getMyAcademics().subscribe( {
      next: (response) => {
        this.academics = response
        this.academicId = response.id
      }
    })
  }

  saveAcademics(){
    const academic = this.academic.value
    this.academicServices.saveAcademics(academic).subscribe((response : GeneralResponse) => { 
      if(response.isSuccess){
        alert(response.message)
        location.reload()
      }else{
        alert("Failed to save academic experience.")
      }
    })
  }

  updateAcademics(): void{
    const academic = this.academic.value
    if(this.academicId){
      this.academicServices.updateAcademics(this.academicId, academic).subscribe((response: GeneralResponse) => {
        if(response.isSuccess){
          alert(response.message)
          this.academic.disable()
          location.reload()
        }else{
          alert("Failed to update academic experience.")
        }
      })
    }else{
      console.log("Error fetching id")
    }
  }

  deleteAcademics(academicId: number){
    const id = academicId
    if(confirm('Are you sure you want to delete this academics?')){
      this.academicServices.deleteAcademics(id).subscribe((response: GeneralResponse) => {
        if(response.isSuccess){
          alert(response.message)
          location.reload()
        }else{
          console.log("Failed to delete academics")
        }
      })
    }
  }

  toggleSidebar(): void {
    this.collapsed = !this.collapsed;
  }

}