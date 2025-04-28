import { Component, inject, OnInit } from '@angular/core';
import { SidebarComponent } from '../../../../reusable/sidebar/sidebar.component';
import { HeaderComponent } from '../../../../reusable/header/header.component';
import {
  faUser,
  faGraduationCap,
  faBriefcase,
  faProjectDiagram,
  faFileAlt,
  faBookmark,
  faCheckCircle,
  faExclamationCircle,
  faDashboard,
  faLocationArrow,
  faContactBook,
  faMailForward,
  faUserEdit,
  faEdit,
  faTrash,
} from '@fortawesome/free-solid-svg-icons';
import {
  ReactiveFormsModule,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { NgFor, NgIf } from '@angular/common';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { Experience } from '../../../../../model/experience';
import { ExperiencesService } from '../../../../../services/experiences/experiences.service';
import { AuthService } from '../../../../../services/auth/auth.service';
import { GeneralResponse } from '../../../../../model/response';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-candidate',
  standalone: true,
  imports: [
    SidebarComponent,
    HeaderComponent,
    ReactiveFormsModule,
    NgFor,
    NgIf,
    FaIconComponent,
  ],
  templateUrl: './experiences.component.html',
  styleUrls: ['./experiences.component.css'],
})
export class ExperiencesComponent implements OnInit {
  checkCircle = faCheckCircle;
  excCircle = faExclamationCircle;
  location = faLocationArrow;
  contact = faContactBook;
  mail = faMailForward;
  edit = faEdit;
  delete = faTrash;

  collapsed = false;

  menuItems = [
    { label: 'Dashboard', link: '/candidate/dashboard', icon: faDashboard },
    { label: 'Profile', link: '/candidate/profile', icon: faUser },
    { label: 'Academics', link: '/candidate/academics', icon: faGraduationCap },
    { label: 'Experiences', link: '/candidate/experiences', icon: faBriefcase },
    { label: 'Projects', link: '/candidate/projects', icon: faProjectDiagram },
    { label: 'Applied Jobs', link: '/candidate/applied-jobs', icon: faFileAlt },
    { label: 'Saved Jobs', link: '/candidate/saved-jobs', icon: faBookmark },
    { label: 'Change Password', link: '/candidate/change-password', icon: faEdit },
  ];

  experiences: Experience[] = [];
  experienceService = inject(ExperiencesService);
  authService = inject(AuthService);
  id!: number;
  editMode: boolean = false;

  editExperience: FormGroup = new FormGroup({
    jobTitle: new FormControl('', [Validators.required]),
    companyName: new FormControl('', [Validators.required]),
    jobDescription: new FormControl('', [Validators.required]),
    from: new FormControl('', [Validators.required]),
    to: new FormControl('', [Validators.required]),
  });

  ngOnInit(): void {
    this.getMyExperiences();
  }

  getExperienceById(experienceId: number) {
    this.editMode = true;
    const id = experienceId;
    if (id) {
      this.experienceService
        .getExperienceById(id)
        .subscribe((response: Experience) => {
          this.editExperience.patchValue(response);
          this.id = response.experienceId;
        });
    } else {
      console.log('ExperienceId not found');
    }
  }

  getMyExperiences() {
    this.experienceService.getMyExperiences().subscribe({
      next: (response) => {
        this.experiences = response;
      },
    });
  }

  saveExperiences() {
    if (this.editExperience.invalid) {
      this.editExperience.markAllAsTouched();
      return;
    }
    const experience = this.editExperience.value;
    this.experienceService
      .saveExperiences(experience)
      .subscribe((response: GeneralResponse) => {
        if (response.isSuccess) {
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: response.message,
            showConfirmButton: false,
            timer: 1500,
          });
          this.getMyExperiences()
          this.editExperience.reset()
        } else {
          Swal.fire({
            position: 'top-end',
            icon: 'error',
            title: response.message,
            showConfirmButton: false,
            timer: 1500,
          });
        }
      });
  }

  updateExperiences() {
    if (this.editExperience.invalid) {
      this.editExperience.markAllAsTouched();
      return;
    }
    const experience = this.editExperience.value;
    if (this.id) {
      this.experienceService
        .updateExperiences(this.id, experience)
        .subscribe((response: GeneralResponse) => {
          if (response.isSuccess) {
            Swal.fire({
              position: 'top-end',
              icon: 'success',
              title: response.message,
              showConfirmButton: false,
              timer: 1500,
            });
            this.getMyExperiences()
            this.editExperience.reset()
          } else {
            Swal.fire({
              position: 'top-end',
              icon: 'error',
              title: response.message,
              showConfirmButton: false,
              timer: 1500,
            });
          }
        });
    } else {
      console.log('Error fetching id');
    }
  }

  deleteExperiences(id: number) {
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
        this.experienceService.deleteExperiences(id)
          .subscribe((response: GeneralResponse) => {
            if(response.isSuccess) {
              Swal.fire({
                title: 'Deleted!',
                text: response.message,
                icon: 'success',
              });
              this.getMyExperiences()
              this.editExperience.reset()
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
  

  isInvalid(field: string) {
    const value = this.editExperience.get(field);
    return !!(value && value.touched && value.invalid);
  }

  toggleSidebar(): void {
    this.collapsed = !this.collapsed;
  }
}
