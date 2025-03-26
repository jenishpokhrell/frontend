import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { FooterComponent } from "../../reusable/footer/footer.component";

@Component({
  selector: 'app-postjobs',
  standalone: true,
  imports: [FooterComponent],
  templateUrl: './postjobs.component.html',
  styleUrl: './postjobs.component.css'
})
export class PostjobsComponent {

}
