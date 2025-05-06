import { Component, inject, OnInit } from '@angular/core';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { FooterComponent } from "../../reusable/footer/footer.component";
import { faSearch, faUser, faAdd, faCheck, faCode } from '@fortawesome/free-solid-svg-icons';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { MemberComponent } from '../../reusable/member/member.component';
import { AuthService } from '../../../services/auth/auth.service';
import { NgFor, NgIf, SlicePipe } from '@angular/common';
import { UserModel } from '../../../model/user';
import { JobService } from '../../../services/job/job.service';
import { GetJobForCandidate } from '../../../model/job';
import { FormControl, FormGroup, FormsModule, NgModel } from '@angular/forms';

@Component({
  selector: 'app-home',
  standalone : true,
  imports: [RouterOutlet, FooterComponent, MemberComponent, RouterLink, FaIconComponent, NgIf, NgFor, SlicePipe, FormsModule],
  templateUrl: './home.component.html', 
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {

  searchBar = faSearch; user = faUser; add = faAdd; check = faCheck; code = faCode

  authService = inject(AuthService)
  jobService = inject(JobService)
  jobs : GetJobForCandidate[] = []
  sortedJobs: GetJobForCandidate[] = []
  featuredJobs: GetJobForCandidate[] = []
  findJobs: GetJobForCandidate[] = []
  userDetails: UserModel | null = null
  userId!: string 

ngOnInit(): void {
  this.getMyDetails();
  this.getJobForCandidates()
}

searchQuery: string = ''

constructor(private router: Router){}

// ------------------ getting currently loggedInUser details
getMyDetails(){
  this.authService.getMyDetails().subscribe({
    next: (response) => {
      this.userDetails = response
    }
  })
}

// ------------------------ getting jobs for candidates ------------------
getJobForCandidates(){
  this.jobService.getJobsForCandidate().subscribe({
    next: (response) => {
      this.jobs = response
      // --------------- filter jobs on the basis of date its posted  ----------------
      this.sortedJobs = this.jobs.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())

      // -------------------- filter jobs on the basis of experience required and salary --------------
      this.featuredJobs = this.jobs.filter(job => job.max_Years_of_Experience_Required > 3 && job.maximumSalary > 90000)
      }
    })
  }

  // ----------------- navigates to searched jobs page ---------------------
  onSearch(){
    if(this.searchQuery.trim()){
      this.router.navigate(['/searchjobs'], {queryParams: {search: this.searchQuery}})
    }
  }

  // ---------------- checks if user is currwntly loggedIn
  isLoggedIn(){
    return this.authService.isLoggedIn()
  }
}