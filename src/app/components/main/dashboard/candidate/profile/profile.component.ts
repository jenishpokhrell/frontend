import { Component, inject, OnInit } from '@angular/core';
import { SidebarComponent } from '../../../../reusable/sidebar/sidebar.component';
import { HeaderComponent } from '../../../../reusable/header/header.component';
import { NgFor } from '@angular/common';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { faUser, faClose, faFilePdf, faGraduationCap, faBriefcase, faProjectDiagram, faFileAlt, faBookmark, faCheckCircle, faExclamationCircle, faDashboard, faLocationArrow, faContactBook, faMailForward, faUserEdit, faEdit } from '@fortawesome/free-solid-svg-icons';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { AuthService } from '../../../../../services/auth/auth.service';
import { UserModel } from '../../../../../model/user';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-candidate',
  standalone: true,
  imports: [SidebarComponent, HeaderComponent, FaIconComponent, NgFor, PdfViewerModule, RouterLink],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  checkCircle = faCheckCircle; excCircle = faExclamationCircle; location = faLocationArrow; contact = faContactBook; mail = faMailForward; close = faClose; pdf = faFilePdf

  collapsed = false;
  

  user : UserModel | null = null
  authService = inject(AuthService)
  
  menuItems = [
    { label: 'Dashboard', link: '/candidate/dashboard', icon: faDashboard},
    { label: 'Profile', link: '/candidate/profile', icon: faUser },
    { label: 'Academics', link: '/candidate/academics', icon: faGraduationCap },
    { label: 'Experiences', link: '/candidate/experiences', icon: faBriefcase },
    { label: 'Projects', link: '/candidate/projects', icon: faProjectDiagram },
    { label: 'Applied Jobs', link: '/candidate/applied-jobs', icon: faFileAlt },
    { label: 'Saved Jobs', link: '/candidate/saved-jobs', icon: faBookmark },
    //{ label: 'Update Profile', link: '/candidate/update-profile', icon: faUserEdit},
    { label: 'Change Password', link: '/candidate/change-password', icon: faEdit}

  ];

  skills = [
    {id: 1, skill: 'Frontend'},
    {id: 2, skill: 'Angular'},
    {id: 3, skill: 'ReactJs'},
    {id: 4, skill: 'jQuery'},
    {id: 5, skill: 'Communication'},
    {id: 6, skill: 'Teamwork and collaboration'},
    {id: 7, skill: 'Javascript'},
    {id: 7, skill: 'HTML/CSS'},
    {id: 6, skill: 'Adaptability'},
    {id: 6, skill: 'Time management'},
  ]

  ngOnInit(): void {
    this.getMyDetails()
  }

  getMyDetails(){
    const token = localStorage.getItem('token')
    if(token){
      this.authService.getMyDetails().subscribe({
        next: (response) => {
          this.user = response
          console.log(this.user.roles)
        },
        error: (err) => {
          console.error("Error fetching data", err)
        }
      })
    }else{
      console.error('Token not found')
    }
  }


  toggleSidebar(): void {
    this.collapsed = !this.collapsed;
  }

  
}