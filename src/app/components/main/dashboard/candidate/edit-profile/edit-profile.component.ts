import { Component, inject, OnInit } from '@angular/core';
import { SidebarComponent } from '../../../../reusable/sidebar/sidebar.component';
import { HeaderComponent } from '../../../../reusable/header/header.component';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { faUser, faClose, faFilePdf, faGraduationCap, faBriefcase, faProjectDiagram, faFileAlt, faBookmark, faCheckCircle, faExclamationCircle, faDashboard, faLocationArrow, faContactBook, faMailForward, faUserEdit, faEdit } from '@fortawesome/free-solid-svg-icons';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { AuthService } from '../../../../../services/auth/auth.service';
import { UpdateUser, UserModel } from '../../../../../model/user';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { GeneralResponse } from '../../../../../model/response';

@Component({
  selector: 'app-edit-profile',
  standalone: true,
  imports: [SidebarComponent, HeaderComponent, FaIconComponent, PdfViewerModule, ReactiveFormsModule],
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent implements OnInit {

  checkCircle = faCheckCircle; excCircle = faExclamationCircle; location = faLocationArrow; contact = faContactBook; mail = faMailForward; close = faClose; pdf = faFilePdf

  collapsed = false;
  

  user : UserModel | null = null
  authService = inject(AuthService)
  userId! : string

  selectedImage : string | ArrayBuffer | null = null;

  constructor(private activatedRoute: ActivatedRoute){}
  
  menuItems = [
    { label: 'Dashboard', link: '/candidate/dashboard', icon: faDashboard},
    { label: 'Profile', link: '/candidate/profile', icon: faUser },
    { label: 'Academics', link: '/candidate/academics', icon: faGraduationCap },
    { label: 'Experiences', link: '/candidate/experiences', icon: faBriefcase },
    { label: 'Projects', link: '/candidate/projects', icon: faProjectDiagram },
    { label: 'Applied Jobs', link: '/candidate/applied-jobs', icon: faFileAlt },
    { label: 'Saved Jobs', link: '/candidate/saved-jobs', icon: faBookmark },
    { label: 'Change Password', link: '/candidate/change-password', icon: faEdit}

  ];

  update: FormGroup = new FormGroup({
    firstname: new FormControl(''),
    lastname: new FormControl(''),
    username: new FormControl(''),
    address: new FormControl(''),
    email: new FormControl(''),
    contact: new FormControl(''),
    gender: new FormControl(''),
    jobTitle: new FormControl(''),
    years_Of_Experience: new FormControl(),
    profilePhoto: new FormControl(''),

  })

  ngOnInit(): void {
    this.userId = this.activatedRoute.snapshot.paramMap.get('id')!
    if(this.userId){
      this.authService.getUserById(this.userId).subscribe((response: UpdateUser) => {
        this.update.patchValue(response)
      })
    }
  }

  updateProfile(){
    const formData = new FormData()
    
    Object.keys(this.update.controls).forEach(controlName => {
      const controlValue = this.update.get(controlName)?.value;
      if(controlValue !== null && controlValue !== undefined){
        formData.append(controlName, controlValue)
      }
    })

      return this.authService.updateProfile(this.userId, formData).subscribe((response: GeneralResponse) => {
        if(response.isSuccess){
          alert(response.message)
        }else{
          alert('Error updating profile')
        }
      })
  }

  // onFileSelected(event:Event) : void{
  //   const input = event.target as HTMLInputElement

  //   if(!input.files || input.files.length == 0)
  //     return;

  //   const file = input.files[0]
  //     const reader = new FileReader();

  //     reader.onload = () => {
  //       this.selectedImage = reader.result as string | ArrayBuffer
  //     }

  //     reader.readAsDataURL(file)

  //   }


  toggleSidebar(): void {
    this.collapsed = !this.collapsed;
  }

}