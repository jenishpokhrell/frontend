import { Component, inject, OnInit } from '@angular/core';
import { SidebarComponent } from '../../../../../reusable/sidebar/sidebar.component';
import { HeaderComponent } from '../../../../../reusable/header/header.component';
import { faUser, faTrash, faClose, faFilePdf, faBusinessTime, faBook, faBriefcase, faBookBookmark, faCheckCircle, faExclamationCircle, faDashboard, faLocationArrow, faContactBook, faMailForward, faUserEdit, faEdit } from '@fortawesome/free-solid-svg-icons';
import { ReactiveFormsModule, FormControl, FormGroup, Validators } from '@angular/forms';
import { NgClass, NgFor, NgIf } from '@angular/common';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { JobService } from '../../../../../../services/job/job.service';
import { GeneralResponse } from '../../../../../../model/response';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { GetMyJob, Job } from '../../../../../../model/job';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit-job',
  standalone: true,
  imports: [SidebarComponent, HeaderComponent, ReactiveFormsModule, NgFor, NgClass, NgIf, RouterOutlet],
  templateUrl: './edit-job.component.html',
  styleUrls: ['./edit-job.component.css']
})
export class EditJobComponent implements OnInit {


  checkCircle = faCheckCircle; excCircle = faExclamationCircle; location = faLocationArrow; contact = faContactBook; mail = faMailForward; edit = faEdit; delete = faTrash

  postJob: FormGroup = new FormGroup({
    jobTitle: new FormControl('', [Validators.required]),
    requirements: new FormControl('', [Validators.required]),
    minimumSalary: new FormControl(null, [Validators.required]),
    maximumSalary: new FormControl(null, [Validators.required]),
    min_Years_of_Experience_Required: new FormControl(null, [Validators.required]),
    max_Years_of_Experience_Required: new FormControl(null, [Validators.required]),
    no_of_Openings: new FormControl(null, [Validators.required]),
    jobType: new FormControl('', [Validators.required]),
    jobLevel: new FormControl('', [Validators.required]),
    location: new FormControl('', [Validators.required]),
    jobDescription: new FormControl('', [Validators.required]),
    isActive: new FormControl(true)
  }) 

  jobService = inject(JobService)

  id!: number

  constructor(private activatedRoute: ActivatedRoute){}

  ngOnInit(): void {
    this.id = +this.activatedRoute.snapshot.paramMap.get('id')!
    if(this.id){
      this.jobService.getMyJobById(this.id).subscribe((response: GetMyJob) => {
        this.postJob.patchValue(response)
      }) 
    }
  }

  updateJob(){
    if(this.postJob.invalid){
      this.postJob.markAllAsTouched()
      return;
    }

    const data = this.postJob.value
    if(this.id){
      this.jobService.updateJob(this.id, data).subscribe((response: GeneralResponse) => {
        if(response.isSuccess){
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: response.message,
            showConfirmButton: false,
            timer: 3000
          });
          this.postJob.reset()
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
      console.error('Failed fetching id')
    }
  }

  closeJob(){
    this.postJob.patchValue({ isActive: false})
    const data = this.postJob.value
    if(this.id){
      Swal.fire({
        title: "Do you want to deactivate the job?",
        showDenyButton: true,
        showCancelButton: true,
        confirmButtonText: "Update",
        denyButtonText: `No`
      }).then((result) => {
        if (result.isConfirmed) {
          this.jobService.updateJob(this.id, data).subscribe({
            next: (response) => {
              if(response.isSuccess){
                Swal.fire({
                  position: "top-end",
                  icon: "success",
                  title: response.message,
                  showConfirmButton: false,
                  timer: 1500
                });
              }else{
                Swal.fire({
                  position: "top-end",
                  icon: "error",
                  title: response.message,
                  showConfirmButton: false,
                  timer: 1500
                });
              }
            },
            error: (err) => {
              console.error(err)
            }
          })
        } else if (result.isDenied) {
          Swal.fire("Operation cancelled", "OKKK", "error");
        }
      });
    }else{
      console.error('Failed fetching id')
    }
  }

  isInvalid(field: string){
    const value = this.postJob.get(field)
    return !!(value && value.touched && value.invalid)
  }

  isValid(field: string){
    const value = this.postJob.get(field)
    return !!(value && value.touched && value.valid)
  }
}