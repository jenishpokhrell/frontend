import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployerComponent } from './employer.component';

describe('EmployerProfileComponent', () => {
  let component: EmployerComponent;
  let fixture: ComponentFixture<EmployerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmployerComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EmployerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
