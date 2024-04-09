import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RentRowComponent } from './rent-row.component';

describe('RentRowComponent', () => {
  let component: RentRowComponent;
  let fixture: ComponentFixture<RentRowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RentRowComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RentRowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
