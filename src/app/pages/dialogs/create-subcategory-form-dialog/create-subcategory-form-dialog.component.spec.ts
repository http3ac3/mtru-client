import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateSubcategoryFormDialogComponent } from './create-subcategory-form-dialog.component';

describe('CreateSubcategoryFormDialogComponent', () => {
  let component: CreateSubcategoryFormDialogComponent;
  let fixture: ComponentFixture<CreateSubcategoryFormDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateSubcategoryFormDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CreateSubcategoryFormDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
