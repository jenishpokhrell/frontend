import { Component, inject, NgModule, OnInit } from '@angular/core';
import { SidebarComponent } from '../../../../reusable/sidebar/sidebar.component';
import { HeaderComponent } from '../../../../reusable/header/header.component';
import { NgFor, NgIf } from '@angular/common';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import {
  faUser,
  faClose,
  faFilePdf,
  faGraduationCap,
  faBriefcase,
  faAdd,
  faProjectDiagram,
  faFileAlt,
  faBookmark,
  faCheckCircle,
  faExclamationCircle,
  faDashboard,
  faLocationArrow,
  faContactBook,
  faMailForward,
  faEdit,
  faTrash
} from '@fortawesome/free-solid-svg-icons';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { AuthService } from '../../../../../services/auth/auth.service';
import { UserModel } from '../../../../../model/user';
import { Router, RouterLink } from '@angular/router';
import { Skills } from '../../../../../model/skill';
import { SkillsService } from '../../../../../services/skills/skills.service';
import { FormControl, FormGroup, NgModel } from '@angular/forms';
import { GeneralResponse } from '../../../../../model/response';
import Swal from 'sweetalert2';
import { ResumeService } from '../../../../../services/resume/resume.service';
import { Resume } from '../../../../../model/resume';

@Component({
  selector: 'app-candidate',
  standalone: true,
  imports: [
    SidebarComponent,
    HeaderComponent,
    FaIconComponent,
    NgFor,
    NgIf,
    PdfViewerModule,
    RouterLink,
  ],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  checkCircle = faCheckCircle;
  excCircle = faExclamationCircle;
  location = faLocationArrow;
  contact = faContactBook;
  mail = faMailForward;
  close = faClose;
  pdf = faFilePdf;
  add = faAdd;
  trash = faTrash

  collapsed = false;

  addSkill: boolean = false;
  addResume: boolean = false;

  user: UserModel | null = null;
  authService = inject(AuthService);
  skillService = inject(SkillsService);
  resumeService = inject(ResumeService);

  skills: Skills[] = [];
  mySkills: Skills[] = [];
  resume: Resume | null = null;

  selectedSkills: number[] = [];
  selectedPdf : File | null = null
  showAddButton: boolean = false

  skillControl = new FormControl('');

  resumeForm: FormGroup = new FormGroup({
    candidateResume: new FormControl('')
  })

  ngOnInit(): void {
    this.getMyDetails();
    this.getAvailableSkills();
    this.getMySkills();
    this.getMyResume();
  }
  
  getMyDetails() {
    const token = localStorage.getItem('token');
    if (token) {
      this.authService.getMyDetails().subscribe({
        next: (response) => {
          this.user = response;
          console.log(this.user.roles);
        },
        error: (err) => {
          console.error('Error fetching data', err);
        },
      });
    } else {
      console.error('Token not found');
    }
  }

  getAvailableSkills() {
    this.skillService.getAvailableSkills().subscribe({
      next: (response) => {
        this.skills = response;
      },
    });

    this.skillControl.valueChanges.subscribe((skillId: any) => {
      if (skillId && !this.selectedSkills.includes(skillId)) {
        this.selectedSkills.push(skillId);
      }
      this.skillControl.setValue('');
    });
  }

  removeSkills(skillId: number) {
    this.selectedSkills = this.selectedSkills.filter((id) => id !== skillId);
  }

  getSkillNameById(id: number): string {
    const skill = this.skills.find((s) => s.skillId === id);
    return skill ? skill.skill : 'Unknown';
  }

  toggleAddSkillVisibility() {
    this.addSkill = !this.addSkill;
  }

  toggleAddResumeVisibility() {
    this.addResume = !this.addResume;
  }

  addCandidateSkills() {
    this.skillService
      .addSkills(this.selectedSkills)
      .subscribe((response: GeneralResponse) => {
        if (response.isSuccess) {
          this.selectedSkills = [];
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: response.message,
            showConfirmButton: false,
            timer: 3000,
          });
          this.getMySkills();
        } else {
          Swal.fire({
            position: 'top-end',
            icon: 'error',
            title: response.message,
            showConfirmButton: false,
            timer: 3000,
          });
        }
      });
  }

  deleteSkill(skillId: number) {
    const id = skillId;
    if (id) {
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
          this.skillService
            .deletSkill(id)
            .subscribe((response: GeneralResponse) => {
              if (response.isSuccess) {
                Swal.fire({
                  title: 'Deleted!',
                  text: response.message,
                  icon: 'success',
                });
                this.getMySkills()
              }else{
                Swal.fire({
                  title: 'Oops!',
                  text: response.message,
                  icon: 'error',
                });
              }
            });
        }
      });
    } else {
      console.error('Error fetching skill id');
    }
  }

  onSkillSelect(event: Event): void {
    const selectedId = +(event.target as HTMLSelectElement).value;
    if (selectedId && !this.selectedSkills.includes(selectedId)) {
      this.selectedSkills.push(selectedId);
    }
  }

  getMySkills() {
    this.skillService.getMySkills().subscribe({
      next: (response) => {
        this.mySkills = response;
      },
      error: (err) => {
        console.error(err);
      },
    });
  }

  getMyResume() {
    this.resumeService.getMyResume().subscribe((response: any) => {
      this.resume = response;
    });
  }

  onPdfSelected(event:Event) : void{
    const input = event.target as HTMLInputElement;

    if (input.files && input.files.length > 0) {
      const file = input.files[0];

      if (file.type === 'application/pdf') {
        this.selectedPdf = file;
        this.showAddButton = true;
      }
    }else{
      Swal.fire({
        title: 'Oops!',
        text: 'No pdf file selected',
        icon: 'error',
      });
      this.selectedPdf = null;
      this.showAddButton = false;
    }

    
  }

  addMyResume(){
    if(!this.selectedPdf){
      Swal.fire({
        title: 'Oops!',
        text: 'No pdf file to add',
        icon: 'error',
      });
      return
    }
    
    const formData = new FormData()
    formData.append('candidateResume', this.selectedPdf, this.selectedPdf.name)

    this.resumeService.addResume(formData).subscribe((response: GeneralResponse) => {
      if(response.isSuccess){
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: response.message,
          showConfirmButton: false,
          timer: 3000,
        });
        this.getMyResume()
        this.addResume = false
      }else{
        Swal.fire({
          position: 'top-end',
          icon: 'error',
          title: response.message,
          showConfirmButton: false,
          timer: 3000,
        });
      }
    })
  }

  deleteResume() {
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
        this.resumeService.deleteResume()
          .subscribe((response: GeneralResponse) => { 
            if (response.isSuccess) { 
              Swal.fire({
                title: 'Deleted!',
                text: response.message,
                icon: 'success',
              });
              this.getMyResume()
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

  menuItems = [
    { label: 'Dashboard', link: '/candidate/dashboard', icon: faDashboard },
    { label: 'Profile', link: '/candidate/profile', icon: faUser },
    { label: 'Academics', link: '/candidate/academics', icon: faGraduationCap },
    { label: 'Experiences', link: '/candidate/experiences', icon: faBriefcase },
    { label: 'Projects', link: '/candidate/projects', icon: faProjectDiagram },
    { label: 'Applied Jobs', link: '/candidate/applied-jobs', icon: faFileAlt },
    { label: 'Saved Jobs', link: '/candidate/saved-jobs', icon: faBookmark },
    {
      label: 'Change Password',
      link: '/candidate/change-password',
      icon: faEdit,
    },
  ];

  

  toggleSidebar(): void {
    this.collapsed = !this.collapsed;
  }
}
