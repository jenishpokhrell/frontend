import { AsyncPipe, NgFor, NgIf } from '@angular/common';
import { Component, inject, NgModule, OnInit, Pipe } from '@angular/core';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { faFilter, faSearch, faClose, faUser } from '@fortawesome/free-solid-svg-icons';
import { FooterComponent } from "../../reusable/footer/footer.component";
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
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

  jobs: GetJobForCandidate[] = []
  jobService = inject(JobService)

  jobTitle: string | null = null
  jobType: string | null = null
  jobLevel: string | null = null


  selectedJobs: GetJobForCandidate[] = []

  ngOnInit(): void {
    this.getJobsForCandidates()
  }

  getJobsForCandidates(){
    this.jobService.getJobsForCandidate().subscribe((response: GetJobForCandidate[]) => {
      this.jobs = response
    })
  }


  showFilter : boolean = false
  
  private toggleBodyScroll(disable: boolean){
    if(disable){
      document.body.style.overflow = 'hidden'
    }else{
      document.body.style.overflow = ''
    }
  }

  showFilterBar() {
    this.showFilter = !this.showFilter
    this.toggleBodyScroll(this.showFilter)
  }

  get filteredJobs(){
    return this.jobs.filter(job => 
      this.searchJob === '' ||
      job.jobTitle.toLowerCase().includes(this.searchJob.toLowerCase())
    )
  }

  toggleFilter(event: any, filterType: 'title' | 'type' | 'level'){
    
  }

  filterJobs(){
    this.selectedJobs = this.jobs.filter(job => job.jobTitle == this.jobTitle)
  }
}
