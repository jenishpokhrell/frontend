import { Component, inject, OnInit } from '@angular/core';
import { faUser, faTrash, faBusinessTime, faBook, faBriefcase, faBookBookmark, faCheckCircle, faExclamationCircle, faDashboard, faLocationArrow, faContactBook, faMailForward, faEdit } from '@fortawesome/free-solid-svg-icons';
import { ReactiveFormsModule, FormControl, FormGroup, Validators } from '@angular/forms';
import { NgClass, NgFor, NgIf } from '@angular/common';
import { JobService } from '../../../../../../services/job/job.service';
import { GeneralResponse } from '../../../../../../model/response';
import { ActivatedRoute } from '@angular/router';
import { GetMyJob } from '../../../../../../model/job';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-post-job',
  standalone: true,
  imports: [ReactiveFormsModule, NgFor, NgClass, NgIf],
  templateUrl: './post-job.component.html',
  styleUrls: ['./post-job.component.css']
})
export class PostJobComponent implements OnInit {

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

  editMode: boolean = false
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


  postJobDetails(){
    if(this.postJob.invalid){
      this.postJob.markAllAsTouched()
      return 
    }
    const data = this.postJob.value
    this.jobService.postJob(data).subscribe((response: GeneralResponse) => {
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
  }

  updateJob(){
    this.editMode = true
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

  isInvalid(field: string){
    const value = this.postJob.get(field)
    return !!(value && value.touched && value.invalid)
  }

  isValid(field: string){
    const value = this.postJob.get(field)
    return !!(value && value.touched && value.valid)
  }


}