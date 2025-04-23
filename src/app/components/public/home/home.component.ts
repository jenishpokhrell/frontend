import { Component, inject, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { FooterComponent } from "../../reusable/footer/footer.component";
import { faSearch, faUser, faAdd, faCheck, faCode } from '@fortawesome/free-solid-svg-icons';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { MemberComponent } from '../../reusable/member/member.component';
import { AuthService } from '../../../services/auth/auth.service';
import { NgFor, NgIf, SlicePipe } from '@angular/common';
import { UserModel } from '../../../model/user';
import { JobService } from '../../../services/job/job.service';
import { GetJobForCandidate } from '../../../model/job';

@Component({
  selector: 'app-home',
  standalone : true,
  imports: [RouterOutlet, FooterComponent, MemberComponent, RouterLink, FaIconComponent, NgIf, NgFor, SlicePipe],
  templateUrl: './home.component.html', 
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {

  search = faSearch; user = faUser; add = faAdd; check = faCheck; code = faCode

  authService = inject(AuthService)
  jobService = inject(JobService)
  jobs : GetJobForCandidate[] = []
  sortedJobs: GetJobForCandidate[] = []
  featuredJobs: GetJobForCandidate[] = []
  userDetails: UserModel | null = null
  userId!: string 

ngOnInit(): void {
  this.getMyDetails();
  this.getJobForCandidates()
}


getMyDetails(){
  this.authService.getMyDetails().subscribe({
    next: (response) => {
      this.userDetails = response
    }
  })
}

getJobForCandidates(){
  this.jobService.getJobsForCandidate().subscribe({
    next: (response) => {
      this.jobs = response
      this.sortedJobs = this.jobs.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
      this.featuredJobs = this.jobs.filter(job => job.max_Years_of_Experience_Required > 3 && job.maximumSalary > 90000)
      }
    })
  }

  isLoggedIn(){
    return this.authService.isLoggedIn()
  }
}