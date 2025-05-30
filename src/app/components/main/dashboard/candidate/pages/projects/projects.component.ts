import { Component, inject, OnInit } from '@angular/core';
import { SidebarComponent } from '../../../../../reusable/sidebar/sidebar.component';
import { HeaderComponent } from '../../../../../reusable/header/header.component';
import { faUser, faGraduationCap, faBriefcase, faProjectDiagram, faFileAlt, faBookmark, faCheckCircle, faExclamationCircle, faDashboard, faLocationArrow, faContactBook, faMailForward, faUserEdit, faEdit, faTrash, faArrowsLeftRightToLine} from '@fortawesome/free-solid-svg-icons';
import { ReactiveFormsModule, FormControl, FormGroup, Validators } from '@angular/forms';
import { NgFor, NgIf } from '@angular/common';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { RouterLink, RouterOutlet } from '@angular/router';
import { Project } from '../../../../../../model/project';
import { ProjectsService } from '../../../../../../services/projects/projects.service';
import { GeneralResponse } from '../../../../../../model/response';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [ ReactiveFormsModule, NgFor, FaIconComponent, NgIf],
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})
export class ProjectsComponent implements OnInit {


  checkCircle = faCheckCircle; excCircle = faExclamationCircle; location = faLocationArrow; contact = faContactBook; mail = faMailForward; edit = faEdit; delete = faTrash

  
  projects: Project[] = []
  projectService = inject(ProjectsService)
  id! : number
  editForm : boolean = false

  projectForm: FormGroup = new FormGroup({
    projectName: new FormControl('', [Validators.required]),
    projectURL: new FormControl('', [Validators.required]),
    projectDescription: new FormControl('', [Validators.required])
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
    if(this.projectForm.invalid){
      this.projectForm.markAllAsTouched()
      return;
    }
    const project = this.projectForm.value
    this.projectService.saveProject(project).subscribe((response: GeneralResponse) => {
      if(response.isSuccess){
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: response.message,
          showConfirmButton: false,
          timer: 1500
        });
        this.getMyProjects()
        this.projectForm.reset()
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
  }

  updateProject(){
    if(this.projectForm.invalid){
      this.projectForm.markAllAsTouched()
      return;
    }
    const project = this.projectForm.value
    if(this.id){
      this.projectService.updateProject(this.id, project).subscribe((response: GeneralResponse) => {
        if(response.isSuccess){
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: response.message,
            showConfirmButton: false,
            timer: 1500
          });
          this.getMyProjects()
          this.projectForm.reset()
          this.editForm = false
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
    }else{
      console.error("Error fetching id")
    }
  }

  deleteProject(id: number){
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        this.projectService.deleteProject(id)
          .subscribe((response: GeneralResponse) => {
            if (response.isSuccess) {
              Swal.fire({
                title: 'Deleted!',
                text: response.message,
                icon: 'success',
              });
              this.getMyProjects()
            } else {
              Swal.fire({
                title: 'Error!',
                text: response.message,
                icon: 'error',
              });
            }
          });
      }
    });
    }
    
  isInvalid(field: string){
    const value = this.projectForm.get(field)
    return !!(value && value.touched && value.invalid)
  }

}