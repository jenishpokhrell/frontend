import { Component, inject, OnInit } from '@angular/core';
import { SidebarComponent } from '../../../../reusable/sidebar/sidebar.component';
import { HeaderComponent } from '../../../../reusable/header/header.component';
import { NgFor, NgIf } from '@angular/common';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { faUser, faGraduationCap, faBriefcase, faUserCheck, faProjectDiagram, faFileAlt, faBookmark, faCheckCircle, faExclamationCircle, faDashboard, faUserEdit, faEdit  } from '@fortawesome/free-solid-svg-icons';
import { AuthService } from '../../../../../services/auth/auth.service';
import { UserModel } from '../../../../../model/user';
import { JobService } from '../../../../../services/job/job.service';
import { GetJobForCandidate, MyJobApplications } from '../../../../../model/job';

@Component({
  selector: 'app-candidate',
  standalone: true,
  imports: [SidebarComponent, HeaderComponent,NgFor, FaIconComponent, NgIf],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class CandidateDashboardComponent implements OnInit{

  checkCircle = faCheckCircle; excCircle = faExclamationCircle 

  collapsed = false;

  applicationsCount : number = 0
  shortlistedCount: number = 0
  jobsCount: number = 0
  savedJobsCount : number = 0

  stats : any[] = []

  authService = inject(AuthService)
  jobService = inject(JobService)

  user: UserModel | null = null
  jobApplications: MyJobApplications[] = []
  mySavedJobs : GetJobForCandidate[] = []
  jobs: [] = []

  getMyDetails(){
    this.authService.getMyDetails().subscribe({
      next: (response) => {
        this.user = response
      }
    })
  }

  getJobs(){
    this.jobService.getJobsForCandidate().subscribe({
      next: (response) => {
        this.jobs = response
        this.jobsCount = this.jobs.length
        this.stats.push(
          { title: 'Available Jobs', value: this.jobsCount, icon: faFileAlt, color: 'bg-green-100 text-green-600' },
        )
      }
    })
  }

  getMySavedJobs(){
    this.jobService.getMySavedJobs().subscribe({
      next: (response) => {
        this.mySavedJobs = response
        this.savedJobsCount = this.mySavedJobs.length
        this.stats.push(
          { title: 'Saved Jobs', value: this.savedJobsCount, icon: faBookmark, color: 'bg-yellow-100 text-yellow-600' },
        )
      }
    })
  }

  getMyJobApplications(){
    this.jobService.getMyJobApplications().subscribe({
      next: (response) => {
        this.jobApplications = response
        this.applicationsCount = this.jobApplications.length
        this.shortlistedCount = response.filter((item:any) => item.jobStatus === 'Shortlisted').length
        this.stats.push(
          { title: 'Applied Jobs', value: this.applicationsCount, icon: faFileAlt, color: 'bg-green-100 text-green-600' },
          { title: 'Shortlisted', value: this.shortlistedCount, icon: faUserCheck, color: 'bg-purple-100 text-purple-600' }
        )
      }
    })
  }

  
  async ngOnInit() {
    this.getMyDetails()
    await this.getJobs()
    await this.getMySavedJobs()
    await this.getMyJobApplications()
  }

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

  // this.stats = [
  //   { title: 'Available Jobs', value: 2, icon: faBriefcase, color: 'bg-blue-100 text-blue-600' },
  //   { title: 'Applied Jobs', value: 7, icon: faFileAlt, color: 'bg-green-100 text-green-600' },
  //   { title: 'Saved Jobs', value: 8, icon: faBookmark, color: 'bg-yellow-100 text-yellow-600' },
  //   { title: 'Shortlisted', value: this.shortlistedCount, icon: faUserCheck, color: 'bg-purple-100 text-purple-600' }
  // ];

  recentApplications = [
    { id: 1, title: 'Senior Angular Developer', company: 'Tech Solutions', status: 'Shortlisted', applied: '2 days ago' },
    { id: 2, title: 'UX Designer', company: 'Creative Minds', status: 'Applied', applied: '1 week ago' },
    { id: 3, title: 'Backend Developer', company: 'Data Systems', status: 'Rejected', applied: '2 weeks ago' },
    { id: 4, title: 'Product Manager', company: 'Innovate Inc', status: 'Interview', applied: '3 weeks ago' }
  ];

  recommendedJobs = [
    { id: 1, title: 'Frontend Developer', company: 'WebTech', location: 'Remote', posted: '1 day ago' },
    { id: 2, title: 'Full Stack Engineer', company: 'CodeCraft', location: 'New York', posted: '3 days ago' },
    { id: 3, title: 'UI/UX Designer', company: 'DesignHub', location: 'San Francisco', posted: '5 days ago' },
    { id: 4, title: 'JavaScript Developer', company: 'Script Masters', location: 'Chicago', posted: '1 week ago' }
  ];

  

  toggleSidebar(): void {
    this.collapsed = !this.collapsed;
  }

}