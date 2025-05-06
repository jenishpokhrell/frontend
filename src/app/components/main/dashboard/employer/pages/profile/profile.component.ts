import { Component, inject, OnInit } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { faClose, faFilePdf,faCheckCircle, faExclamationCircle, faLocationArrow, faContactBook, faMailForward } from '@fortawesome/free-solid-svg-icons';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { AuthService } from '../../../../../../services/auth/auth.service';
import { UserModel } from '../../../../../../model/user';
import { RouterLink, RouterOutlet } from '@angular/router';
import { Skills } from '../../../../../../model/skill';
import { SkillsService } from '../../../../../../services/skills/skills.service';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [ FaIconComponent, NgFor, PdfViewerModule, RouterLink, NgIf, RouterOutlet], 
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class EmployerProfileComponent implements OnInit { 

  checkCircle = faCheckCircle; excCircle = faExclamationCircle; location = faLocationArrow; contact = faContactBook; mail = faMailForward; close = faClose; pdf = faFilePdf

  authService = inject(AuthService)
  skillService = inject(SkillsService)


  user: UserModel | null = null
  skills: Skills[] = []
  mySkills : Skills[] = []

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

}