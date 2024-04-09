import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EquipmentRowComponent } from './equipment-row.component';

describe('EquipmentRowComponent', () => {
  let component: EquipmentRowComponent;
  let fixture: ComponentFixture<EquipmentRowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EquipmentRowComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EquipmentRowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
