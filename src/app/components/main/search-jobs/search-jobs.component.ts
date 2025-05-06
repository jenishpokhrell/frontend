import { AsyncPipe, NgFor, NgIf } from '@angular/common';
import { Component, inject, NgModule, OnInit, Pipe } from '@angular/core';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { faFilter, faSearch, faClose, faUser } from '@fortawesome/free-solid-svg-icons';
import { FooterComponent } from "../../reusable/footer/footer.component";
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { GetJobForCandidate } from '../../../model/job';
import { JobService } from '../../../services/job/job.service';

@Component({
  selector: 'app-search-jobs',
  standalone: true,
  imports: [FaIconComponent, NgIf, FooterComponent, NgFor, FormsModule, RouterLink ],
  templateUrl: './search-jobs.component.html',
  styleUrl: './search-jobs.component.css'
})

export class SearchjobsComponent implements OnInit{
  user = faUser

  searchQuery: string = ''

  constructor(private activatedRoute: ActivatedRoute){}


  jobs: GetJobForCandidate[] = []
  jobService = inject(JobService)

  getJobs: GetJobForCandidate[] = []

  searchedJobs: GetJobForCandidate[] = []

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe(params => {
      this.searchQuery = params['search'] || ''
      this.getAllJobs()
    })
  }
  
  //------------------- method for getting all jobs for candidates -------------------
  getAllJobs(){
    this.jobService.getJobsForCandidate().subscribe({
      next:(response) => {
        this.getJobs = response
        this.searchJobs(this.searchQuery)
      }
    })
  }

  // -------------------------- QUERY FOR SEARCHING JOBS ---------------------------------
  searchJobs(query: string){
    if(!query){
      this.searchedJobs = this.getJobs
      return
    }

    // ------------------ search jobs based on job title, level, location, type
    const lowerQuery = query.toLowerCase()
    this.searchedJobs = this.getJobs.filter(job => 
      job.jobTitle.toLowerCase().includes(lowerQuery) ||
      job.jobLevel.toLowerCase().includes(lowerQuery) ||
      job.location.toLowerCase().includes(lowerQuery) ||
      job.jobType.toLowerCase().includes(lowerQuery)
    )
  }

}
