import { Component, inject, OnInit } from '@angular/core';
import { faUser, faTrash, faBusinessTime, faBook, faBriefcase, faBookBookmark, faCheckCircle, faExclamationCircle, faDashboard, faLocationArrow, faContactBook, faMailForward, faEdit } from '@fortawesome/free-solid-svg-icons';
import { ReactiveFormsModule } from '@angular/forms';
import { NgFor, NgIf } from '@angular/common';
import { RouterLink, RouterOutlet } from '@angular/router';
import { GetShortlistedCandidate } from '../../../../../../model/job';
import { JobService } from '../../../../../../services/job/job.service';

@Component({
  selector: 'app-job-applications',
  standalone: true,
  imports: [ReactiveFormsModule, NgFor, RouterLink, NgIf, RouterOutlet],
  templateUrl: './shortlisted-candidates.component.html',
  styleUrls: ['./shortlisted-candidates.component.css']
})
export class ShortlistedCandidatesComponent implements OnInit {

  checkCircle = faCheckCircle; excCircle = faExclamationCircle; location = faLocationArrow; contact = faContactBook; mail = faMailForward; edit = faEdit; delete = faTrash
  candidates: GetShortlistedCandidate[] = []
  jobService = inject(JobService)

  ngOnInit(): void {
    this.getshortlistedCandidates()
  }

  getshortlistedCandidates(){
    this.jobService.getSavedCandidates().subscribe({
      next: (response) => {
        this.candidates = response
      }
    })
  }
}