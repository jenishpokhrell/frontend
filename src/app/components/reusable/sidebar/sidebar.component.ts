import { NgFor, NgIf } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [NgIf, NgFor, RouterLink, FaIconComponent],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {


  @Input() user: any;
  @Input() menuItems: any = [];
  @Input() collapsed = false;
  @Output() toggleCollapse = new EventEmitter<void>();
  @Output() logout = new EventEmitter<void>();
}
