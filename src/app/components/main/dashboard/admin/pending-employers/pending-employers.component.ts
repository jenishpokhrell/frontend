import { Component, inject, OnInit } from '@angular/core';
import { SidebarComponent } from "../../../../reusable/sidebar/sidebar.component";
import { faTachometerAlt, faUserAlt, faUser, faUserClock, faBriefcase, faClipboardList } from '@fortawesome/free-solid-svg-icons';
import { NgFor, NgIf } from '@angular/common';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { HeaderComponent } from '../../../../reusable/header/header.component';
import { AuthService } from '../../../../../services/auth/auth.service';
import { UserModel } from '../../../../../model/user';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-pending-employers',
  standalone: true,
  imports: [SidebarComponent, HeaderComponent, NgFor, FaIconComponent, NgIf, RouterLink],
  templateUrl: './pending-employers.component.html',
  styleUrl: './pending-employers.component.css'
}) 

export class PendingEmployersComponent implements OnInit {

  tachometer = faTachometerAlt; userAlt = faUserAlt; userIcon = faUser; userClock = faUserClock; userBriefCase = faBriefcase; clipboard = faClipboardList;


  collapsed = false;

  menuItems = [
    { label: 'Dashboard', link: '/admin/dashboard', icon: faTachometerAlt },
    { label: 'Users', link: '/admin/users', icon: faUser },
    { label: 'Pending Employers', link: '/admin/pending-employers', icon: faUserClock },
    { label: 'Jobs', link: '/admin/jobs', icon: faBriefcase },
    { label: 'Logs', link: '/admin/logs', icon:  faClipboardList }
  ];

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

  // getEmployersById(employerId: string){
  //   const id = employerId
  //   this.authService.getUserById(id).subscribe({
  //     next: (response) => {
  //       this.employer = response
  //       console.log(response)
  //     }
  //   })
  // }

  toggleSidebar(): void {
    this.collapsed = !this.collapsed;
  }

}
