import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { FooterComponent } from "../../reusable/footer/footer.component";
import { faSearch, faUser, faAdd, faCheck, faCode } from '@fortawesome/free-solid-svg-icons';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { MemberComponent } from '../../reusable/member/member.component';

@Component({
  selector: 'app-home',
  standalone : true,
  imports: [RouterOutlet, FooterComponent, MemberComponent, FaIconComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

  search = faSearch; user = faUser; add = faAdd; check = faCheck; code = faCode
}