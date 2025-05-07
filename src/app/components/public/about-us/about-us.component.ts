import { Component, inject } from '@angular/core';
import { FooterComponent } from "../../reusable/footer/footer.component";
import { MemberComponent } from '../../reusable/member/member.component';
import { AuthService } from '../../../services/auth/auth.service';
import { NgIf } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-about-us',
  standalone: true,
  imports: [FooterComponent, MemberComponent, NgIf, RouterLink],
  templateUrl: './about-us.component.html',
  styleUrl: './about-us.component.css'
})
export class AboutUsComponent {
  authService = inject(AuthService)

  isLoggedIn(){
    return this.authService.isLoggedIn()
  }
}
