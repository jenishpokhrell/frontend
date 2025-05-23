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
  selector: 'app-browsejobs',
  standalone: true,
  imports: [FaIconComponent, NgIf, FooterComponent, NgFor, FormsModule, RouterLink ],
  templateUrl: './browsejobs.component.html',
  styleUrl: './browsejobs.component.css'
})

export class BrowsejobsComponent implements OnInit{
  filter = faFilter
  search = faSearch
  close = faClose
  user = faUser

  searchJob : string = ""

  searchQuery: string = ''

  constructor(private activatedRoute: ActivatedRoute){}


  jobs: GetJobForCandidate[] = []
  jobService = inject(JobService)

  jobTitle: string | null = null
  jobType: string | null = null
  jobLevel: string | null = null

  getJobs: GetJobForCandidate[] = []


  selectedJobs: GetJobForCandidate[] = []
  searchedJobs: GetJobForCandidate[] = []

  ngOnInit(): void {
    this.getJobsForCandidates()
    this.activatedRoute.queryParams.subscribe(params => {
      this.searchQuery = params['search'] || ''
      this.getJobs = this.jobs
      this.searchJobs(this.searchQuery)
    })
  }

  searchJobs(query: string){
    if(!query){
      this.searchedJobs = this.getJobs
      return
    }

    const lowerQuery = query.toLowerCase()
    this.searchedJobs = this.getJobs.filter(job => 
      job.jobTitle.toLowerCase().includes(lowerQuery)
    )
  }

  getJobsForCandidates(){
    this.jobService.getJobsForCandidate().subscribe((response: GetJobForCandidate[]) => {
      this.jobs = response
    })
  }

// --------------------------- GETS FILTERED JOBS BASED ON JOB TITLE ------------------------------
  get filteredJobs(){
    return this.jobs.filter(job => 
      this.searchJob === '' ||
      job.jobTitle.toLowerCase().includes(this.searchJob.toLowerCase())
    )
  }

  filterJobs(){
    this.selectedJobs = this.jobs.filter(job => job.jobTitle == this.jobTitle)
  }
}
