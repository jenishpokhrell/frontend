import { Component, inject, OnInit } from '@angular/core';
import { SidebarComponent } from '../../../../reusable/sidebar/sidebar.component';
import { HeaderComponent } from '../../../../reusable/header/header.component';
import { faUser, faTrash, faClose, faFilePdf,faBusinessTime, faBook, faBriefcase, faBookBookmark, faCheckCircle, faExclamationCircle, faDashboard, faLocationArrow, faContactBook, faMailForward, faUserEdit, faEdit, faTachographDigital } from '@fortawesome/free-solid-svg-icons';
import { ReactiveFormsModule, FormControl, FormGroup } from '@angular/forms';
import { NgFor, NgIf } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { GetMyJob } from '../../../../../model/job';
import { UserModel } from '../../../../../model/user';
import { JobService } from '../../../../../services/job/job.service';
import { AuthService } from '../../../../../services/auth/auth.service';

@Component({
  selector: 'app-job-applications',
  standalone: true,
  imports: [SidebarComponent, HeaderComponent, ReactiveFormsModule, NgFor, NgIf, RouterLink],
  templateUrl: './job-applications.component.html',
  styleUrls: ['./job-applications.component.css']
})
export class JobApplicationsComponent implements OnInit {

  checkCircle = faCheckCircle; excCircle = faExclamationCircle; location = faLocationArrow; contact = faContactBook; mail = faMailForward; edit = faEdit; delete = faTrash

  collapsed = false;

  job: GetMyJob | null = null
  candidates : UserModel[] = []
  candidate: UserModel | null = null
  jobService = inject(JobService)
  authService = inject(AuthService)
  jobId!: number
  cId!: string

  menuItems = [
    { label: 'Dashboard', link: '/employer/dashboard', icon: faDashboard},
    { label: 'Profile', link: '/employer/profile', icon: faUser },
    { label: 'Experiences', link: '/employer/experiences', icon: faBriefcase },
    { label: 'Post Job', link: '/employer/post-job', icon: faBook },
    { label: 'My Jobs', link: '/employer/jobs', icon: faBusinessTime },
    { label: 'Shortlisted Candidates', link: '/employer/shortlisted-candidates', icon: faBookBookmark},
    { label: 'Change Password', link: '/employer/change-password', icon: faEdit}
  ];

  constructor(private activatedRoute: ActivatedRoute){}

  ngOnInit(): void {
    this.getMyJobById()
  }

  getMyJobById(){
    this.jobId = +this.activatedRoute.snapshot.paramMap.get('id')!
    if(this.jobId){
      this.jobService.getMyJobById(this.jobId).subscribe((response: GetMyJob) => {
        this.job = response
        this.job.jobApplications.forEach(application => {
          this.getCandidateById(application.candidateId)
        })
      })
    }
  }

  getCandidateById(cId: string){
    const id = cId
    if(id){
      this.authService.getUserById(id).subscribe({
        next: (response) => {
          this.candidates.push(response)
        },
        error: (err) => {
          console.error(err)
        }
      })
    }else{
      console.error("Error fetching candidate id")
    }
  }

  toggleSidebar(): void {
    this.collapsed = !this.collapsed;
  }

}