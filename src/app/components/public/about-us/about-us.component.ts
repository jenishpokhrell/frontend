import { Component } from '@angular/core';
import { FooterComponent } from "../../reusable/footer/footer.component";
import { MemberComponent } from '../../reusable/member/member.component';

@Component({
  selector: 'app-about-us',
  standalone: true,
  imports: [FooterComponent, MemberComponent],
  templateUrl: './about-us.component.html',
  styleUrl: './about-us.component.css'
})
export class AboutUsComponent {
  
}
