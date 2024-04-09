import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserRentRowComponent } from './user-rent-row.component';

describe('UserRentRowComponent', () => {
  let component: UserRentRowComponent;
  let fixture: ComponentFixture<UserRentRowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserRentRowComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UserRentRowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
