import { Component, inject, OnInit } from '@angular/core';
import { SidebarComponent } from '../../../../reusable/sidebar/sidebar.component';
import { HeaderComponent } from '../../../../reusable/header/header.component';
import { NgFor, NgIf } from '@angular/common';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { faTachometerAlt, faUserAlt, faUser, faUserClock, faBriefcase, faClipboardList } from '@fortawesome/free-solid-svg-icons';
import { faClose, faFilePdf, faCheckCircle, faExclamationCircle, faDashboard, faLocationArrow, faContactBook, faMailForward, faUserEdit, faEdit } from '@fortawesome/free-solid-svg-icons';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { UserModel } from '../../../../../model/user';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../../../../services/auth/auth.service';
import { ExperiencesService } from '../../../../../services/experiences/experiences.service';
import { Experience } from '../../../../../model/experience';
import { JobService } from '../../../../../services/job/job.service';
import { GeneralResponse } from '../../../../../model/response';
import { faThinkPeaks } from '@fortawesome/free-brands-svg-icons';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-employer',
  standalone: true,
  imports: [SidebarComponent, HeaderComponent, FaIconComponent, NgFor, NgIf, PdfViewerModule],
  templateUrl: './employer.component.html',
  styleUrls: ['./employer.component.css']
})
export class EmployerComponent implements OnInit {

  checkCircle = faCheckCircle; excCircle = faExclamationCircle; location = faLocationArrow; contact = faContactBook; mail = faMailForward; close = faClose; pdf = faFilePdf

  collapsed = false;

  employer: UserModel | null = null
  experiences: Experience[] = []

  employerId!: string

  authService = inject(AuthService)
  experienceService = inject(ExperiencesService)
  jobService = inject(JobService)

  constructor(private activatedRoute: ActivatedRoute, private router: Router){}

  //--------------------------FETCHING USER DETAILS--------------------------
  ngOnInit(): void {
    this.getEmployerDetails()
  }

  getEmployerDetails(){
    this.employerId = this.activatedRoute.snapshot.paramMap.get('employerId')! 
    if(this.employerId){
      this.authService.getUserById(this.employerId).subscribe({
        next: (response) => {
          this.employer = response
          this.getEmployerExperiences(response.id)
        }
      })
    }
  }


  //--------------------------------GETTING EMPLOYER EXPERIENCES------------------------
  getEmployerExperiences(employerId: string){
    const cId = employerId
    if(cId){
      this.experienceService.getCandidateExperienceById(cId).subscribe((response: any) =>{
        this.experiences = response
      })
    }else{
      console.error("Error fetching candidate id")
    }
  }

  approveEmployer(employerId: string){
    const id = employerId;
    if(id){
      Swal.fire({
        title: "Do you want to approve this employer?",
        showDenyButton: true,
        showCancelButton: true,
        confirmButtonText: "Approve",
        denyButtonText: `Hold!`
      }).then((result) => {
        if (result.isConfirmed) {
          this.authService.approveEmployer(id).subscribe((response: GeneralResponse) => {
            if(response.isSuccess){
              Swal.fire({
                position: "top-end",
                icon: "success",
                title: response.message,
                showConfirmButton: false,
                timer: 3000
              });
            }else{
              Swal.fire({
                position: "top-end",
                icon: "error",
                title: response.message,
                showConfirmButton: false,
                timer: 3000
              });
            }
          })
        } else if (result.isDenied) {
          Swal.fire("Operation cancelled", "", "error");
        }
      });
    }else{
      console.error('Error fetching id')
    }
  }


  menuItems = [
    { label: 'Dashboard', link: '/admin/dashboard', icon: faTachometerAlt },
    { label: 'Users', link: '/admin/users', icon: faUser },
    { label: 'Pending Employers', link: '/admin/pending-employers', icon: faUserClock },
    { label: 'Jobs', link: '/admin/jobs', icon: faBriefcase },
    { label: 'Logs', link: '/admin/logs', icon:  faClipboardList }
  ];
  

  toggleSidebar(): void {
    this.collapsed = !this.collapsed;
  }
}