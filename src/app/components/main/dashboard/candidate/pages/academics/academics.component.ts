import { Component, inject, OnInit } from '@angular/core';
import { SidebarComponent } from '../../../../../reusable/sidebar/sidebar.component';
import { HeaderComponent } from '../../../../../reusable/header/header.component';
import { faUser, faGraduationCap, faBriefcase, faProjectDiagram, faFileAlt, faBookmark, faCheckCircle, faExclamationCircle, faDashboard, faLocationArrow, faContactBook, faMailForward, faUserEdit, faEdit } from '@fortawesome/free-solid-svg-icons';
import { ReactiveFormsModule, FormControl, FormGroup, Validators } from '@angular/forms';
import { Academic } from '../../../../../../model/academic';
import { AcademicService } from '../../../../../../services/academic/academic.service';
import { NgIf } from '@angular/common';
import { GeneralResponse } from '../../../../../../model/response';
import { AuthService } from '../../../../../../services/auth/auth.service';
import Swal from 'sweetalert2';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-academics',
  standalone: true,
  imports: [ReactiveFormsModule, NgIf, RouterOutlet],
  templateUrl: './academics.component.html',
  styleUrls: ['./academics.component.css']
})
export class AcademicsComponent implements OnInit {
 
  title = 'My Academics'

  checkCircle = faCheckCircle; excCircle = faExclamationCircle; location = faLocationArrow; contact = faContactBook; mail = faMailForward;

  academics : Academic | null = null
  academicServices = inject(AcademicService)
  authService = inject(AuthService)

  academic: FormGroup = new FormGroup({
    institutionName: new FormControl('', [Validators.required]),
    stream: new FormControl('', [Validators.required]),
    startYear: new FormControl('', [Validators.required]),
    graduationYear: new FormControl('', [Validators.required]),
    degreeType: new FormControl('', [Validators.required]),
    currentSemester: new FormControl('', [Validators.required]),
  })
  
  academicId! : number

  ngOnInit(): void {
    this.getMyAcademics()
    this.academicServices.getMyAcademics().subscribe((response: Academic) => {
      if(response){
        this.academic.patchValue(response)
        this.academic.disable()
      }
    })
  }

  enableForm(){
    this.academic.enable()
  }

  getMyAcademics(){
    return this.academicServices.getMyAcademics().subscribe( {
      next: (response) => {
        this.academics = response
        this.academicId = response.id
      }
    })
  }

  // ----------------------- save/add new academics ---------------------
  saveAcademics(){
    if(this.academic.invalid){
      this.academic.markAllAsTouched()
      return;
    }
    const academic = this.academic.value
    this.academicServices.saveAcademics(academic).subscribe((response : GeneralResponse) => { 
      if(response.isSuccess){
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: response.message,
          showConfirmButton: false,
          timer: 1500
        });
        this.getMyAcademics()
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

  // --------------------------- update academics --------------------------
  updateAcademics(): void{
    if(this.academic.invalid){
      this.academic.markAllAsTouched()
      return;
    }
    const academic = this.academic.value
    if(this.academicId){
      this.academicServices.updateAcademics(this.academicId, academic).subscribe((response: GeneralResponse) => {
        if(response.isSuccess){
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: response.message,
            showConfirmButton: false,
            timer: 3000
          });
          this.academic.disable()
          this.getMyAcademics()
        }else{
          Swal.fire({
          position: "top-end",
          icon: "error",
          title: response.message,
          showConfirmButton: false,
          timer: 3000
        });
        }
      })
    }else{
      console.log("Error fetching id")
    }
  }

  // ------------------------- delete academics
  deleteAcademics(academicId: number){
    const id = academicId
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then((result) => {
      if (result.isConfirmed) {
        this.academicServices.deleteAcademics(id).subscribe((response: GeneralResponse) => {
        if(response.isSuccess){
          Swal.fire({
            title: "Deleted!",
            text: response.message,
            icon: "success"
          });
          this.getMyAcademics()
        }else{
          Swal.fire({
            title: "Deleted!",
            text: response.message,
            icon: "error"
          });
        }
          })
        }
    });
  }


  // --------------------------------- HELPER METHOD FOR FORM VALIDATION -----------------------------
  isInvalid(field: string){
    const value = this.academic.get(field)
    return !!(value && value.touched && value.invalid)
  }

}