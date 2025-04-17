import { Component, inject, OnInit } from '@angular/core';
import { SidebarComponent } from '../../../../reusable/sidebar/sidebar.component';
import { HeaderComponent } from '../../../../reusable/header/header.component';
import { faUser, faTrash, faClose, faFilePdf,faBusinessTime, faBook, faBriefcase, faBookBookmark, faCheckCircle, faExclamationCircle, faDashboard, faLocationArrow, faContactBook, faMailForward, faUserEdit, faEdit } from '@fortawesome/free-solid-svg-icons';
import { ReactiveFormsModule, FormControl, FormGroup } from '@angular/forms';
import { NgFor } from '@angular/common';
import { RouterLink } from '@angular/router';
import { GetShortlistedCandidate } from '../../../../../model/job';
import { JobService } from '../../../../../services/job/job.service';

@Component({
  selector: 'app-job-applications',
  standalone: true,
  imports: [SidebarComponent, HeaderComponent, ReactiveFormsModule, NgFor, RouterLink],
  templateUrl: './shortlisted-candidates.component.html',
  styleUrls: ['./shortlisted-candidates.component.css']
})
export class ShortlistedCandidatesComponent implements OnInit {

  checkCircle = faCheckCircle; excCircle = faExclamationCircle; location = faLocationArrow; contact = faContactBook; mail = faMailForward; edit = faEdit; delete = faTrash

  collapsed = false;

  menuItems = [
    { label: 'Dashboard', link: '/employer/dashboard', icon: faDashboard},
    { label: 'Profile', link: '/employer/profile', icon: faUser },
    { label: 'Experiences', link: '/employer/experiences', icon: faBriefcase },
    { label: 'Post Job', link: '/employer/post-job', icon: faBook },
    { label: 'My Jobs', link: '/employer/jobs', icon: faBusinessTime },
    { label: 'Shortlisted Candidates', link: '/employer/shortlisted-candidates', icon: faBookBookmark},
    { label: 'Change Password', link: '/employer/change-password', icon: faEdit}
  ];


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


  toggleSidebar(): void {
    this.collapsed = !this.collapsed;
  }


}