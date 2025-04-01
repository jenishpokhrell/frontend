import { Component } from '@angular/core';
import { SidebarComponent } from '../../../../reusable/sidebar/sidebar.component';
import { HeaderComponent } from '../../../../reusable/header/header.component';
import { NgFor } from '@angular/common';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { faUser, faGraduationCap, faBriefcase, faUserCheck, faProjectDiagram, faFileAlt, faBookmark, faCheckCircle, faExclamationCircle, faDashboard, faUserEdit, faEdit  } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-candidate',
  standalone: true,
  imports: [SidebarComponent, HeaderComponent,NgFor, FaIconComponent],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class CandidateDashboardComponent {

  checkCircle = faCheckCircle; excCircle = faExclamationCircle 

  collapsed = false;
  user = {
    name: 'Jane Doe',
    role: 'Candidate'
  };

  menuItems = [
    { label: 'Dashboard', link: '/candidate/dashboard', icon: faDashboard},
    { label: 'Profile', link: '/candidate/profile', icon: faUser },
    { label: 'Academics', link: '/candidate/academics', icon: faGraduationCap },
    { label: 'Experiences', link: '/candidate/experiences', icon: faBriefcase },
    { label: 'Projects', link: '/candidate/projects', icon: faProjectDiagram },
    { label: 'Applied Jobs', link: '/candidate/applied-jobs', icon: faFileAlt },
    { label: 'Saved Jobs', link: '/candidate/saved-jobs', icon: faBookmark },
    { label: 'Update Profile', link: '/candidate/update-profile', icon: faUserEdit},
    { label: 'Change Password', link: '/candidate/change-password', icon: faEdit}
  ];

  stats = [
    { title: 'Available Jobs', value: 1245, icon: faBriefcase, color: 'bg-blue-100 text-blue-600' },
    { title: 'Applied Jobs', value: 12, icon: faFileAlt, color: 'bg-green-100 text-green-600' },
    { title: 'Saved Jobs', value: 8, icon: faBookmark, color: 'bg-yellow-100 text-yellow-600' },
    { title: 'Shortlisted', value: 3, icon: faUserCheck, color: 'bg-purple-100 text-purple-600' }
  ];

  recentApplications = [
    { id: 1, title: 'Senior Angular Developer', company: 'Tech Solutions', status: 'Shortlisted', applied: '2 days ago' },
    { id: 2, title: 'UX Designer', company: 'Creative Minds', status: 'Applied', applied: '1 week ago' },
    { id: 3, title: 'Backend Developer', company: 'Data Systems', status: 'Rejected', applied: '2 weeks ago' },
    { id: 4, title: 'Product Manager', company: 'Innovate Inc', status: 'Interview', applied: '3 weeks ago' }
  ];

  recommendedJobs = [
    { id: 1, title: 'Frontend Developer', company: 'WebTech', location: 'Remote', posted: '1 day ago' },
    { id: 2, title: 'Full Stack Engineer', company: 'CodeCraft', location: 'New York', posted: '3 days ago' },
    { id: 3, title: 'UI/UX Designer', company: 'DesignHub', location: 'San Francisco', posted: '5 days ago' },
    { id: 4, title: 'JavaScript Developer', company: 'Script Masters', location: 'Chicago', posted: '1 week ago' }
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