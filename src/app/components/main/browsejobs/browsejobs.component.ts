import { transition } from '@angular/animations';
import { NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { faFilter, faSearch, faClose, faUser } from '@fortawesome/free-solid-svg-icons';
import { FooterComponent } from "../../reusable/footer/footer.component";

@Component({
  selector: 'app-browsejobs',
  standalone: true,
  imports: [FaIconComponent, NgIf, FooterComponent],
  templateUrl: './browsejobs.component.html',
  styleUrl: './browsejobs.component.css'
})
export class BrowsejobsComponent {
  filter = faFilter
  search = faSearch
  close = faClose
  user = faUser

  showFilter : boolean = false

  showFilterBar() {
    this.showFilter = !this.showFilter
  }
}
