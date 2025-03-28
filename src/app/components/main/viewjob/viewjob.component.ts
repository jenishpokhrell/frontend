import { Component } from '@angular/core';
import { FooterComponent } from "../../reusable/footer/footer.component";
import { NgFor } from '@angular/common';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { faBookmark } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-viewjob',
  standalone: true,
  imports: [FooterComponent, NgFor, FaIconComponent ],
  templateUrl: './viewjob.component.html',
  styleUrl: './viewjob.component.css'
})
export class ViewjobComponent {

  save = faBookmark

  job = [{
    jobTitle: '.NET Developer with angular', jobType: 'Full-Time', jobLevel: 'Junior', openings: 4, minExp : 1, maxExp: 2, minSalary: 30000, maxSalary: 40000, location: 'Pulchowk, Lalitpur',
    isActive: true, jobDescription: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Dolor reiciendis aspernatur quisquam sunt culpa soluta libero, debitis ipsum est rem itaque? Consectetur voluptate dolor explicabo amet quisquam earum atque impedit, ratione laudantium modi unde repellat quam, consequuntur cum accusantium deleniti delectus? Ad officia odit ex maiores magni, totam veritatis? Corrupti quo cumque possimus quis ullam laborum expedita delectus in quibusdam sapiente, voluptatibus tenetur mollitia commodi incidunt sint obcaecati accusamus culpa nulla exercitationem ad eum earum beatae ipsa quod! Temporibus voluptates pariatur cupiditate tempora animi consequatur. Autem ipsam perferendis voluptatum. Iste atque aspernatur est quae, vel earum beatae. Corporis maiores delectus, animi et quidem molestias nemo molestiae accusamus est soluta voluptates similique optio totam blanditiis sunt tempore magni nam aut eveniet fugit ipsam debitis doloribus modi? Totam, et modi. Voluptates, dicta?',
    requirements: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Dolor reiciendis aspernatur quisquam sunt culpa soluta libero, debitis ipsum est rem itaque? Consectetur voluptate dolor explicabo amet quisquam earum atque impedit, ratione laudantium modi unde repellat quam, consequuntur cum accusantium deleniti delectus? Ad officia odit ex maiores magni, totam veritatis? Corrupti quo cumque possimus quis ullam laborum expedita delectus in quibusdam sapiente, voluptatibus tenetur mollitia commodi incidunt sint obcaecati accusamus culpa nulla exercitationem ad eum earum beatae ipsa quod! Temporibus voluptates pariatur cupiditate tempora animi consequatur. Autem ipsam perferendis voluptatum. Iste atque aspernatur est quae, vel earum beatae. Corporis maiores delectus, animi et quidem molestias nemo molestiae accusamus est soluta voluptates similique optio totam blanditiis sunt tempore magni nam aut eveniet fugit ipsam debitis doloribus modi? Totam, et modi. Voluptates, dicta?'
  }]

  JobApply(){
    window.confirm("thank you for applying")
  }
}
