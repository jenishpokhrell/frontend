import { Component } from '@angular/core';
import { SidebarComponent } from "../../../../reusable/sidebar/sidebar.component";
import { faTachometerAlt, faUserAlt, faUser, faUserClock, faBriefcase, faClipboardList } from '@fortawesome/free-solid-svg-icons';
import { NgFor } from '@angular/common';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { HeaderComponent } from '../../../../reusable/header/header.component';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [SidebarComponent, HeaderComponent, NgFor, FaIconComponent],
  templateUrl: './jobs.component.html',
  styleUrl: './jobs.component.css'
}) 

export class JobsComponent {


  collapsed = false;
  user = {
    name: 'Admin User',
    role: 'Administrator'
  };

  menuItems = [
    { label: 'Dashboard', link: '/admin/dashboard', icon: faTachometerAlt },
    { label: 'Users', link: '/admin/users', icon: faUser },
    { label: 'Pending Employers', link: '/admin/pending-employers', icon: faUserClock },
    { label: 'Jobs', link: '/admin/jobs', icon: faBriefcase },
    { label: 'Logs', link: '/admin/logs', icon:  faClipboardList }
  ];

  jobs = [
    {jobTitle: 'Frontend Developer', postedBy: 'jenish_pokhrel', jobType: 'Full-Time', jobLevel: 'Junior', experience: '0 - 1 years', noOfOpening: 4, location: 'Pulchowk, Lalitpur', isActive: true},
    {jobTitle: 'Backend Developer', postedBy: 'shristi_sharma', jobType: 'Full-Time', jobLevel: 'Mid-Level', experience: '0 - 1 years', noOfOpening: 2, location: 'Pulchowk, Lalitpur', isActive: false},
    {jobTitle: 'FullStack Developer', postedBy: 'aman_dhakal', jobType: 'Full-Time', jobLevel: 'Junior', experience: '0 - 1 years', noOfOpening: 3, location: 'Pulchowk, Lalitpur', isActive: true},
    {jobTitle: 'Frontend Developer', postedBy: 'jenish_pokhrel', jobType: 'Full-Time', jobLevel: 'Internship', experience: '0 - 1 years', noOfOpening: 1, location: 'Pulchowk, Lalitpur', isActive: true},
    {jobTitle: 'Data Analyst', postedBy: 'jenish_pokhrel', jobType: 'Full-Time', jobLevel: 'Senior', experience: '0 - 1 years', noOfOpening: 2, location: 'Pulchowk, Lalitpur', isActive: false},
  ]

  notifications = [
    { id: 1, message: 'New employer registration requires approval', time: '10 min ago', read: false },
    { id: 2, message: '3 new jobs posted today', time: '1 hour ago', read: false },
    { id: 3, message: 'System maintenance scheduled', time: '2 hours ago', read: true }
  ];

  toggleSidebar(): void {
    this.collapsed = !this.collapsed;
  }

  logout(): void {
    console.log('Logout clicked');
  }
}
