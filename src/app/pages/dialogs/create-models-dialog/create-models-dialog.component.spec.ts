import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateModelsDialogComponent } from './create-models-dialog.component';

describe('CreateModelsDialogComponent', () => {
  let component: CreateModelsDialogComponent;
  let fixture: ComponentFixture<CreateModelsDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateModelsDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CreateModelsDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
