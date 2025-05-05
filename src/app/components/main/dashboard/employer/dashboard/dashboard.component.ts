import { Component, inject, OnInit } from '@angular/core';
import { SidebarComponent } from '../../../../reusable/sidebar/sidebar.component';
import { HeaderComponent } from '../../../../reusable/header/header.component';
import { NgFor, NgIf } from '@angular/common';
import { faUser, faBriefcase, faBusinessTime, faBook, faUserCheck, faDashboard, faEdit, faBookBookmark, faFileAlt, faUserTimes  } from '@fortawesome/free-solid-svg-icons';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { AuthService } from '../../../../../services/auth/auth.service';
import { JobService } from '../../../../../services/job/job.service';
import { UserModel } from '../../../../../model/user';
import { GetMyJob } from '../../../../../model/job';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-employer',
  standalone: true,
  imports: [SidebarComponent, HeaderComponent, NgFor, FaIconComponent, RouterLink, NgIf, RouterOutlet],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class EmployerDashboardComponent implements OnInit {

  briefCase = faBriefcase; file = faFileAlt; check = faUserCheck; userTimes = faUserTimes

  collapsed = false

  menuItems = [
    { label: 'Dashboard', link: '/employer/dashboard', icon: faDashboard},
    { label: 'Profile', link: '/employer/profile', icon: faUser },
    { label: 'Experiences', link: '/employer/experiences', icon: faBriefcase },
    { label: 'Post Job', link: '/employer/post-job', icon: faBook },
    { label: 'My Jobs', link: '/employer/jobs', icon: faBusinessTime },
    { label: 'Shortlisted Candidates', link: '/employer/shortlisted-candidates', icon: faBookBookmark},
    { label: 'Change Password', link: '/employer/change-password', icon: faEdit}
  ];

  authService = inject(AuthService)
  jobService = inject(JobService)

  user: UserModel | null = null
  jobs: GetMyJob[] = []

  jobsCount: number = 0
  jobApplicationsCount : number = 0
  shortlistedCount : number = 0;
  rejectedCount : number = 0

  mobileSidebarVisible: boolean = false

  toggleMobileSidebar(){
    this.mobileSidebarVisible = !this.mobileSidebarVisible
  }

  getMyDetails(){
    this.authService.getMyDetails().subscribe({
      next: (response) => {
        this.user = response
      }
    })
  }

  getMyJobs(){
    this.jobService.getMyJobs().subscribe((response: GetMyJob[]) => {
      this.jobs = response
      this.jobsCount = this.jobs.length
      this.jobs.forEach(job => {
        const length = job.jobApplications.length
        this.jobApplicationsCount = this.jobApplicationsCount + length
      })
      this.jobs.forEach(job => {
        const length = job.jobApplications.filter(item => item.jobStatus === 'Shortlisted').length
        this.shortlistedCount = this.shortlistedCount + length
      })
      this.jobs.forEach(job => {
        const length = job.jobApplications.filter(item => item.jobStatus === 'Rejected').length
        this.rejectedCount = this.rejectedCount + length
      })
    })
  }

  ngOnInit(): void {
    this.getMyDetails()
    this.getMyJobs()
  }


  toggleSidebar(): void {
    this.collapsed = !this.collapsed;
  }
}