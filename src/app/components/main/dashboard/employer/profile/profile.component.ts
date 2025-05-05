import { Component, inject, OnInit } from '@angular/core';
import { SidebarComponent } from '../../../../reusable/sidebar/sidebar.component';
import { HeaderComponent } from '../../../../reusable/header/header.component';
import { NgFor, NgIf } from '@angular/common';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { faUser, faClose, faFilePdf,faBusinessTime, faBook, faBriefcase, faBookBookmark, faCheckCircle, faExclamationCircle, faDashboard, faLocationArrow, faContactBook, faMailForward, faUserEdit, faEdit } from '@fortawesome/free-solid-svg-icons';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { AuthService } from '../../../../../services/auth/auth.service';
import { UserModel } from '../../../../../model/user';
import { RouterLink, RouterOutlet } from '@angular/router';
import { Skills } from '../../../../../model/skill';
import { SkillsService } from '../../../../../services/skills/skills.service';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [SidebarComponent, HeaderComponent, FaIconComponent, NgFor, PdfViewerModule, RouterLink, NgIf, RouterOutlet], 
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class EmployerProfileComponent implements OnInit { 

  checkCircle = faCheckCircle; excCircle = faExclamationCircle; location = faLocationArrow; contact = faContactBook; mail = faMailForward; close = faClose; pdf = faFilePdf

  authService = inject(AuthService)
  skillService = inject(SkillsService)

  collapsed = false;

  user: UserModel | null = null
  skills: Skills[] = []
  mySkills : Skills[] = []

  mobileSidebarVisible: boolean = false

  toggleMobileSidebar(){
    this.mobileSidebarVisible = !this.mobileSidebarVisible
  }

  ngOnInit(): void {
    this.getMyDetails()
  }

  getMyDetails(){
    const token = localStorage.getItem('token')
    if(token){
      this.authService.getMyDetails().subscribe({
        next: (response) => {
          this.user = response
        }
      })
    }
  }


  menuItems = [
    { label: 'Dashboard', link: '/employer/dashboard', icon: faDashboard},
    { label: 'Profile', link: '/employer/profile', icon: faUser },
    { label: 'Experiences', link: '/employer/experiences', icon: faBriefcase },
    { label: 'Post Job', link: '/employer/post-job', icon: faBook },
    { label: 'My Jobs', link: '/employer/jobs', icon: faBusinessTime },
    { label: 'Shortlisted Candidates', link: '/employer/shortlisted-candidates', icon: faBookBookmark},
    { label: 'Change Password', link: '/employer/change-password', icon: faEdit}
  ];

  toggleSidebar(): void {
    this.collapsed = !this.collapsed;
  }

}