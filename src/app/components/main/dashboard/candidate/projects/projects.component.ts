import { Component, inject, OnInit } from '@angular/core';
import { SidebarComponent } from '../../../../reusable/sidebar/sidebar.component';
import { HeaderComponent } from '../../../../reusable/header/header.component';
import { faUser, faGraduationCap, faBriefcase, faProjectDiagram, faFileAlt, faBookmark, faCheckCircle, faExclamationCircle, faDashboard, faLocationArrow, faContactBook, faMailForward, faUserEdit, faEdit, faTrash, faArrowsLeftRightToLine} from '@fortawesome/free-solid-svg-icons';
import { ReactiveFormsModule, FormControl, FormGroup, Validators } from '@angular/forms';
import { NgFor, NgIf } from '@angular/common';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { RouterLink, RouterOutlet } from '@angular/router';
import { Project } from '../../../../../model/project';
import { ProjectsService } from '../../../../../services/projects/projects.service';
import { GeneralResponse } from '../../../../../model/response';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-candidate',
  standalone: true,
  imports: [SidebarComponent, HeaderComponent, ReactiveFormsModule, NgFor, FaIconComponent, NgIf, RouterOutlet],
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
    { label: 'Change Password', link: '/candidate/change-password', icon: faEdit}

  ];

  projectForm: FormGroup = new FormGroup({
    projectName: new FormControl('', [Validators.required]),
    projectURL: new FormControl('', [Validators.required]),
    projectDescription: new FormControl('', [Validators.required])
  })

  mobileSidebarVisible: boolean = false

  toggleMobileSidebar(){
    this.mobileSidebarVisible = !this.mobileSidebarVisible
  }


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

  toggleSidebar(): void {
    this.collapsed = !this.collapsed;
  }

}