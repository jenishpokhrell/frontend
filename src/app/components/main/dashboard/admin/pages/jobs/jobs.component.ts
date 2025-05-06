import { Component, inject, OnInit } from '@angular/core';
import { NgFor } from '@angular/common';
import { AllJobs } from '../../../../../../model/job';
import { JobService } from '../../../../../../services/job/job.service';
import { GeneralResponse } from '../../../../../../model/response';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [NgFor],
  templateUrl: './jobs.component.html',
  styleUrl: './jobs.component.css'
}) 

export class JobsComponent implements OnInit {

  jobs: AllJobs[] = []
  job: AllJobs | null = null
  jobService = inject(JobService)
  jobId!: number

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
  
}
