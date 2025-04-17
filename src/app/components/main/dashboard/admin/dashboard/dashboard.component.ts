import { Component, inject, OnInit } from '@angular/core';
import { SidebarComponent } from "../../../../reusable/sidebar/sidebar.component";
import { faTachometerAlt, faUserAlt, faUser, faUserClock, faBriefcase, faClipboardList } from '@fortawesome/free-solid-svg-icons';
import { NgFor, NgIf, SlicePipe } from '@angular/common';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { HeaderComponent } from '../../../../reusable/header/header.component';
import { UserModel } from '../../../../../model/user';
import { Job } from '../../../../../model/job';
import { JobService } from '../../../../../services/job/job.service';
import { AuthService } from '../../../../../services/auth/auth.service';
import { Logs } from '../../../../../model/log';
import { LogsService } from '../../../../../services/logs/logs.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [SidebarComponent, HeaderComponent, NgFor, FaIconComponent, SlicePipe, NgIf, RouterLink],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
}) 

export class AdminDashboardComponent implements OnInit {

  fauser = faUser; briefcase = faBriefcase; userClock = faUserClock; clipboard = faClipboardList

  collapsed = false;

  menuItems = [
    { label: 'Dashboard', link: '/admin/dashboard', icon: faTachometerAlt },
    { label: 'Users', link: '/admin/users', icon: faUser },
    { label: 'Pending Employers', link: '/admin/pending-employers', icon: faUserClock },
    { label: 'Jobs', link: '/admin/jobs', icon: faBriefcase },
    { label: 'Logs', link: '/admin/logs', icon:  faClipboardList }
  ];

  stats = [
    { title: 'Total Users', value: 1245, icon: faUser, color: 'bg-blue-100 text-blue-600' },
    { title: 'Active Jobs', value: 342, icon: faBriefcase, color: 'bg-green-100 text-green-600' },
    { title: 'Pending Employers', value: 23, icon: faUserClock, color: 'bg-yellow-100 text-yellow-600' },
    { title: 'Today Logs', value: 124, icon: faClipboardList, color: 'bg-purple-100 text-purple-600' }
  ];

  notifications = [
    { id: 1, message: 'New employer registration requires approval', time: '10 min ago', read: false },
    { id: 2, message: '3 new jobs posted today', time: '1 hour ago', read: false },
    { id: 3, message: 'System maintenance scheduled', time: '2 hours ago', read: true }
  ];

  usersCount: number = 0
  activeJobsCount: number = 0
  pendingEmployersCount: number = 0
  logsCount: number = 0

  users: UserModel[] = []
  pendingEmployers: UserModel[] = []
  jobs: Job[] = []
  logs: Logs[] = []

  jobService = inject(JobService)
  authService = inject(AuthService)
  logService = inject(LogsService)

  getAllUsers(){
    this.authService.getAllUsers().subscribe({
      next: (response) => {
        this.users = response
        this.usersCount = this.users.filter((user:any) => !user.roles.includes('ADMIN')).length
      }
    })
  }

  getAllJobs(){
    this.jobService.getAllJobs().subscribe({
      next: (response) => {
        this.jobs = response
        this.activeJobsCount = this.jobs.filter(job => job.isActive === true).length
      }
    })
  }

  getPendingEmployers(){
    this.authService.getPendingEmployers().subscribe({
      next: (response) => {
        this.pendingEmployers = response
        this.pendingEmployersCount = this.pendingEmployers.length
      }
    })
  }

  getLogs(){
    this.logService.getAllLogs().subscribe({
      next: (response) => {
        this.logs = response
        this.logsCount = this.logs.length 
      }
    })
  }

  ngOnInit(): void {
    this.getAllUsers()
    this.getAllJobs()
    this.getPendingEmployers()
    this.getLogs()
  }


  toggleSidebar(): void {
    this.collapsed = !this.collapsed;
  }

}
