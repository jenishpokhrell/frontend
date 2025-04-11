import { Component, inject, OnInit } from '@angular/core';
import { SidebarComponent } from '../../../../reusable/sidebar/sidebar.component';
import { HeaderComponent } from '../../../../reusable/header/header.component';
import { faUser, faTrash, faClose, faFilePdf, faBusinessTime, faBook, faBriefcase, faBookBookmark, faCheckCircle, faExclamationCircle, faDashboard, faLocationArrow, faContactBook, faMailForward, faUserEdit, faEdit } from '@fortawesome/free-solid-svg-icons';
import { ReactiveFormsModule, FormControl, FormGroup } from '@angular/forms';
import { NgFor } from '@angular/common';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { JobService } from '../../../../../services/job/job.service';
import { GeneralResponse } from '../../../../../model/response';
import { ActivatedRoute } from '@angular/router';
import { GetMyJob, Job } from '../../../../../model/job';

@Component({
  selector: 'app-edit-job',
  standalone: true,
  imports: [SidebarComponent, HeaderComponent, ReactiveFormsModule, NgFor, FaIconComponent],
  templateUrl: './edit-job.component.html',
  styleUrls: ['./edit-job.component.css']
})
export class EditJobComponent implements OnInit {


  checkCircle = faCheckCircle; excCircle = faExclamationCircle; location = faLocationArrow; contact = faContactBook; mail = faMailForward; edit = faEdit; delete = faTrash

  collapsed = false;

  postJob: FormGroup = new FormGroup({
    jobTitle: new FormControl(''),
    requirements: new FormControl(''),
    minimumSalary: new FormControl(),
    maximumSalary: new FormControl(),
    min_Years_of_Experience_Required: new FormControl(),
    max_Years_of_Experience_Required: new FormControl(),
    no_of_Openings: new FormControl(),
    jobType: new FormControl(''),
    jobLevel: new FormControl(''),
    location: new FormControl(''),
    jobDescription: new FormControl(''),
    isActive: new FormControl(true)
  })

  jobService = inject(JobService)

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

  ngOnInit(): void {
    this.id = +this.activatedRoute.snapshot.paramMap.get('id')!
    if(this.id){
      this.jobService.getMyJobById(this.id).subscribe((response: GetMyJob) => {
        this.postJob.patchValue(response)
      }) 
    }
  }

  updateJob(){
    const data = this.postJob.value
    if(this.id){
      this.jobService.updateJob(this.id, data).subscribe((response: GeneralResponse) => {
        if(response.isSuccess){
          alert(response.message)
        }else{
          alert('Failed updating job')
        }
      })
    }else{
      console.error('Failed fetching id')
    }
  }

  toggleSidebar(): void {
    this.collapsed = !this.collapsed;
  }

}