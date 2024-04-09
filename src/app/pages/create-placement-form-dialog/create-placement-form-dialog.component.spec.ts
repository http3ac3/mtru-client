import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatePlacementFormDialogComponent } from './create-placement-form-dialog.component';

describe('CreatePlacementFormDialogComponent', () => {
  let component: CreatePlacementFormDialogComponent;
  let fixture: ComponentFixture<CreatePlacementFormDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreatePlacementFormDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CreatePlacementFormDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
