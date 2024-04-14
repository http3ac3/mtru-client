import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateEquipmentFormDialogComponent } from './create-equipment-form-dialog.component';

describe('CreateEquipmentFormDialogComponent', () => {
  let component: CreateEquipmentFormDialogComponent;
  let fixture: ComponentFixture<CreateEquipmentFormDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateEquipmentFormDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CreateEquipmentFormDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
