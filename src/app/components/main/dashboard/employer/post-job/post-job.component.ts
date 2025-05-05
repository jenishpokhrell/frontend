import { Component, inject, OnInit } from '@angular/core';
import { SidebarComponent } from '../../../../reusable/sidebar/sidebar.component';
import { HeaderComponent } from '../../../../reusable/header/header.component';
import { faUser, faTrash, faClose, faFilePdf,faBusinessTime, faBook, faBriefcase, faBookBookmark, faCheckCircle, faExclamationCircle, faDashboard, faLocationArrow, faContactBook, faMailForward, faUserEdit, faEdit } from '@fortawesome/free-solid-svg-icons';
import { ReactiveFormsModule, FormControl, FormGroup, Validators } from '@angular/forms';
import { NgClass, NgFor, NgIf } from '@angular/common';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { JobService } from '../../../../../services/job/job.service';
import { GeneralResponse } from '../../../../../model/response';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { GetMyJob, Job } from '../../../../../model/job';
import Swal from 'sweetalert2';
//import * as districts from '../../../../../../assets/en.json'

@Component({
  selector: 'app-post-job',
  standalone: true,
  imports: [SidebarComponent, HeaderComponent, ReactiveFormsModule, NgFor, NgClass, NgIf, RouterOutlet],
  templateUrl: './post-job.component.html',
  styleUrls: ['./post-job.component.css']
})
export class PostJobComponent implements OnInit {

  checkCircle = faCheckCircle; excCircle = faExclamationCircle; location = faLocationArrow; contact = faContactBook; mail = faMailForward; edit = faEdit; delete = faTrash

  collapsed = false;

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

  mobileSidebarVisible: boolean = false

  toggleMobileSidebar(){
    this.mobileSidebarVisible = !this.mobileSidebarVisible
  }

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

  toggleSidebar(): void {
    this.collapsed = !this.collapsed;
  }

}