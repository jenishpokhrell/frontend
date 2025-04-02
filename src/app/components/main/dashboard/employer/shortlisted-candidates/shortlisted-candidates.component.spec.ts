import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShortlistedCandidatesComponent } from './shortlisted-candidates.component';

describe('ShortlistedCandidatesComponent', () => {
  let component: ShortlistedCandidatesComponent;
  let fixture: ComponentFixture<ShortlistedCandidatesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShortlistedCandidatesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ShortlistedCandidatesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
