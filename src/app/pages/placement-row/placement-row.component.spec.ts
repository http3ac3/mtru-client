import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlacementRowComponent } from './placement-row.component';

describe('PlacementRowComponent', () => {
  let component: PlacementRowComponent;
  let fixture: ComponentFixture<PlacementRowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PlacementRowComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PlacementRowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
