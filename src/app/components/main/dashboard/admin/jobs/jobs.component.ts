import { Component, inject, OnInit } from '@angular/core';
import { SidebarComponent } from "../../../../reusable/sidebar/sidebar.component";
import { faTachometerAlt, faUserAlt, faUser, faUserClock, faBriefcase, faClipboardList } from '@fortawesome/free-solid-svg-icons';
import { NgFor, NgIf } from '@angular/common';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { HeaderComponent } from '../../../../reusable/header/header.component';
import { AllJobs } from '../../../../../model/job';
import { JobService } from '../../../../../services/job/job.service';
import { GeneralResponse } from '../../../../../model/response';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [SidebarComponent, HeaderComponent, NgFor, FaIconComponent, NgIf],
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
  job: AllJobs | null = null
  jobService = inject(JobService)
  jobId!: number

  mobileSidebarVisible: boolean = false

  toggleMobileSidebar(){
    this.mobileSidebarVisible = !this.mobileSidebarVisible
  }

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
    Swal.fire({
      position: "center",
      icon: "error",
      title: 'You cannot delete active jobs',
      showConfirmButton: false,
      timer: 3000
    });
  }

  deleteJob(jobId: number): void{
    if(jobId){
      this.jobService.deleteJob(jobId).subscribe((response: GeneralResponse) => {
        this.jobs = this.jobs.filter(job => job.id !== jobId)
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
    }else{
      console.error("Error fetching job data")
    }
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
