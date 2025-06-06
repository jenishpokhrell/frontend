import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CandidateDashboardComponent } from './dashboard.component';

describe('DashboardComponent', () => {
  let component: CandidateDashboardComponent;
  let fixture: ComponentFixture<CandidateDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CandidateDashboardComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CandidateDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
