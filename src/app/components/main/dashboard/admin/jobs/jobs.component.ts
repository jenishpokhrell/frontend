import { Component, inject, OnInit } from '@angular/core';
import { SidebarComponent } from "../../../../reusable/sidebar/sidebar.component";
import { faTachometerAlt, faUserAlt, faUser, faUserClock, faBriefcase, faClipboardList } from '@fortawesome/free-solid-svg-icons';
import { NgFor } from '@angular/common';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { HeaderComponent } from '../../../../reusable/header/header.component';
import { AllJobs } from '../../../../../model/job';
import { JobService } from '../../../../../services/job/job.service';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [SidebarComponent, HeaderComponent, NgFor, FaIconComponent],
  templateUrl: './jobs.component.html',
  styleUrl: './jobs.component.css'
}) 

export class JobsComponent implements OnInit {


  collapsed = false;

  menuItems = [
    { label: 'Dashboard', link: '/admin/dashboard', icon: faTachometerAlt },
    { label: 'Users', link: '/admin/users', icon: faUser },
    { label: 'Pending Employers', link: '/admin/pending-employers', icon: faUserClock },
    { label: 'Jobs', link: '/admin/jobs', icon: faBriefcase },
    { label: 'Logs', link: '/admin/logs', icon:  faClipboardList }
  ];

  jobs: AllJobs[] = []
  jobService = inject(JobService)

  ngOnInit(): void {
    this.getAllJobs()
  }

  getAllJobs(){
    this.jobService.getAllJobs().subscribe({
      next: (response) => {
        this.jobs = response
      }
    })
  }

  noDelete(){
    alert('You cannot delete active jobs')
  }
  

  notifications = [
    { id: 1, message: 'New employer registration requires approval', time: '10 min ago', read: false },
    { id: 2, message: '3 new jobs posted today', time: '1 hour ago', read: false },
    { id: 3, message: 'System maintenance scheduled', time: '2 hours ago', read: true }
  ];

  toggleSidebar(): void {
    this.collapsed = !this.collapsed;
  }

  
  
}
