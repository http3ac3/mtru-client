import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubcategoryRowComponent } from './subcategory-row.component';

describe('SubcategoryRowComponent', () => {
  let component: SubcategoryRowComponent;
  let fixture: ComponentFixture<SubcategoryRowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SubcategoryRowComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SubcategoryRowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
