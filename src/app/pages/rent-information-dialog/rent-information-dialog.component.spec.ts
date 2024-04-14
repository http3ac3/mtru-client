import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RentInformationDialogComponent } from './rent-information-dialog.component';

describe('RentInformationDialogComponent', () => {
  let component: RentInformationDialogComponent;
  let fixture: ComponentFixture<RentInformationDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RentInformationDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RentInformationDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
