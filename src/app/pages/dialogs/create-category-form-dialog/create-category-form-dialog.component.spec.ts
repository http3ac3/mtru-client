import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateCategoryFormDialogComponent } from './create-category-form-dialog.component';

describe('CreateCategoryFormDialogComponent', () => {
  let component: CreateCategoryFormDialogComponent;
  let fixture: ComponentFixture<CreateCategoryFormDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateCategoryFormDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CreateCategoryFormDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
