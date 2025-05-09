import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployerprofileforcandidateComponent } from './employerprofileforcandidate.component';

describe('EmployerprofileforcandidateComponent', () => {
  let component: EmployerprofileforcandidateComponent;
  let fixture: ComponentFixture<EmployerprofileforcandidateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmployerprofileforcandidateComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EmployerprofileforcandidateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
