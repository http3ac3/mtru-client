import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoryRowComponent } from './category-row.component';

describe('CategoryRowComponent', () => {
  let component: CategoryRowComponent;
  let fixture: ComponentFixture<CategoryRowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CategoryRowComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CategoryRowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
