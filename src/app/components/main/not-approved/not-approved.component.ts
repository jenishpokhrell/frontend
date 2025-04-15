import { Component } from '@angular/core';
import { SidebarComponent } from '../../reusable/sidebar/sidebar.component';
import { HeaderComponent } from '../../reusable/header/header.component';
import { NgFor } from '@angular/common';
import { faUser, faBriefcase, faBusinessTime, faBook, faUserCheck, faDashboard, faEdit, faBookBookmark, faFileAlt, faUserTimes  } from '@fortawesome/free-solid-svg-icons';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';

@Component({
  selector: 'app-not-approved',
  standalone: true,
  imports: [SidebarComponent, HeaderComponent, NgFor, FaIconComponent],
  templateUrl: './not-approved.component.html',
  styleUrls: ['./not-approved.component.css']
})
export class NotApprovedComponent {
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

  stats = [
    { title: 'Posted Jobs', value: 15, icon: faBriefcase, color: 'bg-blue-100 text-blue-600' },
    { title: 'Total Applications', value: 342, icon: faFileAlt, color: 'bg-green-100 text-green-600' },
    { title: 'Shortlisted', value: 42, icon: faUserCheck, color: 'bg-yellow-100 text-yellow-600' },
    { title: 'Rejected', value: 120, icon: faUserTimes, color: 'bg-red-100 text-red-600' }
  ];

  recentJobs = [
    { id: 1, title: 'Senior Angular Developer', applications: 45, posted: '2 days ago', status: 'Active' },
    { id: 2, title: 'UX Designer', applications: 23, posted: '1 week ago', status: 'Active' },
    { id: 3, title: 'Backend Developer', applications: 56, posted: '2 weeks ago', status: 'Closed' },
    { id: 4, title: 'Product Manager', applications: 12, posted: '3 weeks ago', status: 'Active' }
  ];

  recentCandidates = [
    { id: 1, name: 'John Doe', job: 'Senior Angular Developer', status: 'Shortlisted', applied: '1 day ago' },
    { id: 2, name: 'Jane Smith', job: 'UX Designer', status: 'Applied', applied: '2 days ago' },
    { id: 3, name: 'Mike Johnson', job: 'Backend Developer', status: 'Rejected', applied: '1 week ago' },
    { id: 4, name: 'Sarah Williams', job: 'Product Manager', status: 'Interview', applied: '1 week ago' }
  ];

  toggleSidebar(): void {
    this.collapsed = !this.collapsed;
  }

  logout(): void {
    console.log('Logout clicked');
    // Implement logout logic
  }

  getStatusClass(status: string): string {
    switch(status) {
      case 'Shortlisted':
        return 'bg-green-100 text-green-800';
      case 'Applied':
        return 'bg-blue-100 text-blue-800';
      case 'Rejected':
        return 'bg-red-100 text-red-800';
      case 'Interview':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  }
}