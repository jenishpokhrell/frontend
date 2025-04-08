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

  ngOnInit(): void {
    this.getJobsForCandidates()
  }

  getJobsForCandidates(){
    this.jobService.getJobsForCandidate().subscribe((response: GetJobForCandidate[]) => {
      this.jobs = response
    })
  }

  // jobs = [
  //   {jobTitle: 'Frontend Developer', postedBy: 'jenish_pokhrel', jobType: 'Full-Time', jobLevel: 'Junior', experience: '0 - 1 years', noOfOpening: 4, location: 'Pulchowk, Lalitpur'},
  //   {jobTitle: 'Backend Developer', postedBy: 'shristi_sharma', jobType: 'Full-Time', jobLevel: 'Junior', experience: '0 - 1 years', noOfOpening: 2, location: 'Pulchowk, Lalitpur'},
  //   {jobTitle: 'FullStack Developer', postedBy: 'aman_dhakal', jobType: 'Full-Time', jobLevel: 'Junior', experience: '0 - 1 years', noOfOpening: 3, location: 'Pulchowk, Lalitpur'},
  //   {jobTitle: 'Frontend Developer', postedBy: 'jenish_pokhrel', jobType: 'Full-Time', jobLevel: 'Junior', experience: '0 - 1 years', noOfOpening: 1, location: 'Pulchowk, Lalitpur'},
  //   {jobTitle: 'Frontend Developer', postedBy: 'jenish_pokhrel', jobType: 'Full-Time', jobLevel: 'Junior', experience: '0 - 1 years', noOfOpening: 2, location: 'Pulchowk, Lalitpur'},
  // ]

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
}
