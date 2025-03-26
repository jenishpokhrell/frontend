import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BrowsejobsComponent } from './browsejobs.component';

describe('BrowsejobsComponent', () => {
  let component: BrowsejobsComponent;
  let fixture: ComponentFixture<BrowsejobsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BrowsejobsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BrowsejobsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
