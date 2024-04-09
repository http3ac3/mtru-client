import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResponsibleRowComponent } from './responsible-row.component';

describe('ResponsibleRowComponent', () => {
  let component: ResponsibleRowComponent;
  let fixture: ComponentFixture<ResponsibleRowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ResponsibleRowComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ResponsibleRowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
