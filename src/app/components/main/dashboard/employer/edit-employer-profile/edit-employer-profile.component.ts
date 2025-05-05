import { Component, inject, OnInit } from '@angular/core';
import { SidebarComponent } from '../../../../reusable/sidebar/sidebar.component';
import { HeaderComponent } from '../../../../reusable/header/header.component';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { faUser, faClose, faFilePdf, faBook, faBusinessTime, faBookBookmark, faBriefcase, faProjectDiagram, faFileAlt, faBookmark, faCheckCircle, faExclamationCircle, faDashboard, faLocationArrow, faContactBook, faMailForward, faUserEdit, faEdit } from '@fortawesome/free-solid-svg-icons';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { AuthService } from '../../../../../services/auth/auth.service';
import { UpdateUser, UserModel } from '../../../../../model/user';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterOutlet } from '@angular/router';
import { GeneralResponse } from '../../../../../model/response';
import { NgIf } from '@angular/common';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit-employer-profile',
  standalone: true,
  imports: [SidebarComponent, HeaderComponent, FaIconComponent, PdfViewerModule, ReactiveFormsModule, NgIf, RouterOutlet],
  templateUrl: './edit-employer-profile.component.html',
  styleUrls: ['./edit-employer-profile.component.css']
})
export class EditEmployerProfileComponent implements OnInit {

  checkCircle = faCheckCircle; excCircle = faExclamationCircle; location = faLocationArrow; contact = faContactBook; mail = faMailForward; close = faClose; pdf = faFilePdf

  collapsed = false;
  

  user : UserModel | null = null
  authService = inject(AuthService)
  userId! : string

  selectedImage : File | null = null;
  previewImage : string = ''

  constructor(private activatedRoute: ActivatedRoute, private router: Router ){}

  mobileSidebarVisible: boolean = false

  toggleMobileSidebar(){
    this.mobileSidebarVisible = !this.mobileSidebarVisible
  }
  
  menuItems = [
    { label: 'Dashboard', link: '/employer/dashboard', icon: faDashboard},
    { label: 'Profile', link: '/employer/profile', icon: faUser },
    { label: 'Experiences', link: '/employer/experiences', icon: faBriefcase },
    { label: 'Post Job', link: '/employer/post-job', icon: faBook },
    { label: 'My Jobs', link: '/employer/jobs', icon: faBusinessTime },
    { label: 'Shortlisted Candidates', link: '/employer/shortlisted-candidates', icon: faBookBookmark},
    { label: 'Change Password', link: '/employer/change-password', icon: faEdit}
  ];

  update: FormGroup = new FormGroup({
    firstname: new FormControl('', [Validators.required]),
    lastname: new FormControl('', [Validators.required]),
    username: new FormControl('', [Validators.required]),
    address: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    contact: new FormControl('', [
      Validators.required,
      Validators.pattern(/^[0-9]{10}$/) // Assuming 10-digit mobile numbers
    ]),
    gender: new FormControl('', [Validators.required]),
    profilePhoto : new FormControl(''),
    jobTitle: new FormControl('', [Validators.required]),
    years_Of_Experience: new FormControl('', [
      Validators.required,
      Validators.pattern(/^[0-9]+$/)
    ]),
  });

  ngOnInit(): void {
    this.userId = this.activatedRoute.snapshot.paramMap.get('id')!
    if(this.userId){
      this.authService.getUserById(this.userId).subscribe((response: UpdateUser) => {
        this.update.patchValue(response)
        this.previewImage = response.profilePhoto
      })
    }
  }
    onFileSelected(event:Event) : void{
      const input = event.target as HTMLInputElement

      if(input.files && input.files.length > 0){
        this.selectedImage = input.files[0]

      const reader = new FileReader();

      reader.onload = (e: ProgressEvent<FileReader>) => {
        this.previewImage = e.target?.result as string
      }

      reader.readAsDataURL(this.selectedImage)

      this.update.patchValue({
        profilePhoto: this.selectedImage
      })
      }else{
        console.error('No file selected')
      }

      }

  updateProfile(){
    if(this.update.invalid){
      this.update.markAllAsTouched()
      return;
    }

    const formData = new FormData()
    
    Object.keys(this.update.controls).forEach(controlName => {
      const controlValue = this.update.get(controlName)?.value;
      if(controlValue !== null && controlValue !== undefined){
        formData.append(controlName, controlValue)
      }
    })

    if(this.selectedImage){
      formData.append('profilePhoto', this.selectedImage)
    }else{
      console.error("No vaild profile photo is selected.")
    }

    return this.authService.updateProfile(this.userId, formData).subscribe((response: GeneralResponse) => {
      if(response.isSuccess){
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: response.message,
          showConfirmButton: false,
          timer: 1500
        });
        this.router.navigate(['/employer/profile'])
      }else{
        Swal.fire({
          position: "top-end",
          icon: "error",
          title: response.message,
          showConfirmButton: false,
          timer: 1500
        });
      }
    })
  }

  deleteProfile(userId: string) {
    const id = userId;
    if (id) {
      Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!',
      }).then((result) => {
        if (result.isConfirmed) {
          this.authService
            .deleteUser(id)
            .subscribe((response: GeneralResponse) => {
              if (response.isSuccess) {
                Swal.fire({
                  title: 'Deleted!',
                  text: response.message,
                  icon: 'success',
                });
                this.authService.logout()
              } else {
                Swal.fire({
                  title: 'Error!',
                  text: response.message,
                  icon: 'error',
                });
              }
            });
        }
      });
    } else {
      console.log('Error fetching id');
    }
  }

  isInvalid(field: string){
    const value = this.update.get(field);
    return !!(value && value.touched && value.invalid)
  }

  toggleSidebar(): void {
    this.collapsed = !this.collapsed;
  }
}