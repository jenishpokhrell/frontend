import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { faTachometerAlt, faUserAlt, faUser, faUserClock, faBriefcase, faClipboardList } from '@fortawesome/free-solid-svg-icons';
import { SidebarComponent } from '../../../../reusable/sidebar/sidebar.component';
import { HeaderComponent } from '../../../../reusable/header/header.component';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-adminlayout',
  standalone: true,
  imports: [RouterOutlet, SidebarComponent, HeaderComponent, NgIf],
  templateUrl: './adminlayout.component.html', 
  styleUrl: './adminlayout.component.css'
})
export class AdminlayoutComponent {
  collapsed = false;

  mobileSidebarVisible: boolean = false

  toggleMobileSidebar(){
    this.mobileSidebarVisible = !this.mobileSidebarVisible
  }
  
  toggleSidebar(): void {
    this.collapsed = !this.collapsed;
  }

  menuItems = [
    { label: 'Dashboard', link: '/admin/dashboard', icon: faTachometerAlt },
    { label: 'Users', link: '/admin/users', icon: faUser },
    { label: 'Pending Employers', link: '/admin/pending-employers', icon: faUserClock },
    { label: 'Jobs', link: '/admin/jobs', icon: faBriefcase },
    { label: 'Logs', link: '/admin/logs', icon:  faClipboardList }
  ];
}
