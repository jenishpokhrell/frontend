import { Component, inject, OnInit } from '@angular/core';
import { SidebarComponent } from '../../../../reusable/sidebar/sidebar.component';
import { HeaderComponent } from '../../../../reusable/header/header.component';
import { faUser, faGraduationCap, faBriefcase, faProjectDiagram, faFileAlt, faBookmark, faCheckCircle, faExclamationCircle, faDashboard, faLocationArrow, faContactBook, faMailForward, faUserEdit, faEdit, faTrash, faArrowsLeftRightToLine} from '@fortawesome/free-solid-svg-icons';
import { ReactiveFormsModule, FormControl, FormGroup } from '@angular/forms';
import { NgFor } from '@angular/common';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { RouterLink } from '@angular/router';
import { Project } from '../../../../../model/project';
import { ProjectsService } from '../../../../../services/projects/projects.service';
import { GeneralResponse } from '../../../../../model/response';

@Component({
  selector: 'app-candidate',
  standalone: true,
  imports: [SidebarComponent, HeaderComponent, ReactiveFormsModule, NgFor, FaIconComponent],
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})
export class ProjectsComponent implements OnInit {


  checkCircle = faCheckCircle; excCircle = faExclamationCircle; location = faLocationArrow; contact = faContactBook; mail = faMailForward; edit = faEdit; delete = faTrash
  collapsed = false;

  
  projects: Project[] = []
  projectService = inject(ProjectsService)
  id! : number
  editForm : boolean = false

  menuItems = [
    { label: 'Dashboard', link: '/candidate/dashboard', icon: faDashboard},
    { label: 'Profile', link: '/candidate/profile', icon: faUser },
    { label: 'Academics', link: '/candidate/academics', icon: faGraduationCap },
    { label: 'Experiences', link: '/candidate/experiences', icon: faBriefcase },
    { label: 'Projects', link: '/candidate/projects', icon: faProjectDiagram },
    { label: 'Applied Jobs', link: '/candidate/applied-jobs', icon: faFileAlt },
    { label: 'Saved Jobs', link: '/candidate/saved-jobs', icon: faBookmark },
    //{ label: 'Update Profile', link: '/candidate/update-profile', icon: faUserEdit},
    { label: 'Change Password', link: '/candidate/change-password', icon: faEdit}

  ];

  projectForm: FormGroup = new FormGroup({
    projectName: new FormControl(''),
    projectURL: new FormControl(''),
    projectDescription: new FormControl('')
  })


  ngOnInit(): void {
    this.getMyProjects()
  }

  getMyProjects(){
    this.projectService.getMyProjects().subscribe({
      next: (response) => {
        this.projects = response
      }
    })
  }

  getProjectById(projectId: number){
    this.editForm = true
    const id = projectId
    if(id){
      this.projectService.getProjectById(id).subscribe((response: Project) => {
        this.projectForm.patchValue(response)
        this.id = response.projectId
      })
    }else{
      console.log("ProjectId not found")
    }
  }

  saveProject(){
    const project = this.projectForm.value
    this.projectService.saveProject(project).subscribe((response: GeneralResponse) => {
      if(response.isSuccess){
        alert(response.message)
        location.reload()
      }else{
        alert("Error adding project.")
      }
    })
  }

  updateProject(){
    const project = this.projectForm.value
    if(this.id){
      this.projectService.updateProject(this.id, project).subscribe((response: GeneralResponse) => {
        if(response.isSuccess){
          alert(response.message)
          location.reload()
        }else{
          alert("Error updating project")
        }
      })
    }else{
      console.error("Error fetching id")
    }
  }

  deleteProject(id: number){
    if(confirm('Are you sure you want to delete this project?'))
      this.projectService.deleteProject(id).subscribe((response: GeneralResponse) => {
        if(response.isSuccess){
          alert(response.message)
          location.reload()
        }else{
          alert('Project Removed Successfully.')
        }
      })
  }

  toggleSidebar(): void {
    this.collapsed = !this.collapsed;
  }

}