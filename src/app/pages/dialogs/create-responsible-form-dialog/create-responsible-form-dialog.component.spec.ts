import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateResponsibleFormDialogComponent } from './create-responsible-form-dialog.component';

describe('CreateResponsibleFormDialogComponent', () => {
  let component: CreateResponsibleFormDialogComponent;
  let fixture: ComponentFixture<CreateResponsibleFormDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateResponsibleFormDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CreateResponsibleFormDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
