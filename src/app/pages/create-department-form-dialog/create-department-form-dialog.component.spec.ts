import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateDepartmentFormDialogComponent } from './create-department-form-dialog.component';

describe('CreateDepartmentFormDialogComponent', () => {
  let component: CreateDepartmentFormDialogComponent;
  let fixture: ComponentFixture<CreateDepartmentFormDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateDepartmentFormDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CreateDepartmentFormDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
