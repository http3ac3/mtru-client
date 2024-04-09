import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlacementComponent } from './placement.component';

describe('PlacementComponent', () => {
  let component: PlacementComponent;
  let fixture: ComponentFixture<PlacementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PlacementComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PlacementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
