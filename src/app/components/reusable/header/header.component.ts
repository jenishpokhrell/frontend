import { Component, Input, Output, EventEmitter, inject } from '@angular/core';
import { ThemeService } from '../../../services/theme/theme.service';
import { NgIf } from '@angular/common';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { faSun, faMoon, faBell, faChartBar } from '@fortawesome/free-regular-svg-icons';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { RouterLink } from '@angular/router';

@Component({ 
  selector: 'app-header',
  standalone: true,
  imports: [NgIf, FaIconComponent, RouterLink],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  sun = faSun
  moon = faMoon
  chart = faChartBar
  bell = faBell
  bars = faBars

  @Input() title: string = '';
  @Input() notifications: any[] = [];
  @Output() toggleSidebar = new EventEmitter<void>();

  //themeService = inject(ThemeService)

  constructor(public themeService: ThemeService) {}

  toggleTheme(): void {
    this.themeService.toggleTheme();
  }

}