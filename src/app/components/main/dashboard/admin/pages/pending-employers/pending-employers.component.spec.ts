import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PendingEmployersComponent } from './pending-employers.component';

describe('PendingEmployersComponent', () => {
  let component: PendingEmployersComponent;
  let fixture: ComponentFixture<PendingEmployersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PendingEmployersComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PendingEmployersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
