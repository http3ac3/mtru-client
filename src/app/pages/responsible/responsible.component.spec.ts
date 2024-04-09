import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResponsibleComponent } from './responsible.component';

describe('ResponsibleComponent', () => {
  let component: ResponsibleComponent;
  let fixture: ComponentFixture<ResponsibleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ResponsibleComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ResponsibleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
