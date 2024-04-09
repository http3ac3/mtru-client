import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateRentComponent } from './create-rent.component';

describe('CreateRentComponent', () => {
  let component: CreateRentComponent;
  let fixture: ComponentFixture<CreateRentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateRentComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CreateRentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
