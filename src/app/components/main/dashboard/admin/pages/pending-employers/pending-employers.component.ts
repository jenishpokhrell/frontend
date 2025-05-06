import { Component, inject, OnInit } from '@angular/core';
import { faTachometerAlt, faUserAlt, faUser, faUserClock, faBriefcase, faClipboardList } from '@fortawesome/free-solid-svg-icons';
import { NgFor, NgIf } from '@angular/common';
import { AuthService } from '../../../../../../services/auth/auth.service';
import { UserModel } from '../../../../../../model/user';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-pending-employers',
  standalone: true,
  imports: [ NgFor, RouterLink],
  templateUrl: './pending-employers.component.html',
  styleUrl: './pending-employers.component.css'
}) 

export class PendingEmployersComponent implements OnInit {

  tachometer = faTachometerAlt; userAlt = faUserAlt; userIcon = faUser; userClock = faUserClock; userBriefCase = faBriefcase; clipboard = faClipboardList;

  notifications = [
    { id: 1, message: 'New employer registration requires approval', time: '10 min ago', read: false },
    { id: 2, message: '3 new jobs posted today', time: '1 hour ago', read: false },
    { id: 3, message: 'System maintenance scheduled', time: '2 hours ago', read: true }
  ];

  authService = inject(AuthService)
  pendingEmployers: UserModel[] = []
  employer: UserModel | null = null
  employerId!: string


  ngOnInit(): void {
    this.getPendingEmployers();
  }

  getPendingEmployers(){
    this.authService.getPendingEmployers().subscribe({
      next: (response) => {
        this.pendingEmployers = response
      }
    })
  }

}
