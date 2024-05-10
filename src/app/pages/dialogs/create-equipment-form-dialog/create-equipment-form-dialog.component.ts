import { NgFor } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import {
  MAT_DIALOG_DATA,
  MatDialogRef,
  MatDialogTitle,
  MatDialogContent,
  MatDialogActions,
  MatDialogClose,
} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { Equipment } from '../../../models/equipment/equipment';
import { SubcategoryService } from '../../../services/subcategory/subcategory.service';
import { ResponsibleService } from '../../../services/responsible/responsible.service';
import { PlacementService } from '../../../services/placement/placement.service';
import { EquipmentService } from '../../../services/equipment/equipment.service';
import { Subcategory } from '../../../models/subcategory/subcategory';
import { Placement } from '../../../models/placement/placement';
import { Responsible } from '../../../models/responsible/responsible';
import { StorageService } from '../../../services/storage/storage.service';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { provideNativeDateAdapter } from '@angular/material/core';

@Component({
  selector: 'app-create-equipment-form-dialog',
  standalone: true,
  imports: [FormsModule,
    MatDialogTitle, 
    MatDialogContent, 
    MatDialogActions, 
    MatFormFieldModule, 
    MatDialogClose,
    MatInputModule,
    MatIconModule,
    MatButtonModule, 
    MatSelectModule,
    MatDatepickerModule,
    ReactiveFormsModule,
    NgFor
  ],
  templateUrl: './create-equipment-form-dialog.component.html',
  styleUrl: './create-equipment-form-dialog.component.css',
  providers: [provideNativeDateAdapter()],
})
export class CreateEquipmentFormDialogComponent {
  dialogHeader = "Новое оборудование";
  equipmentForm : FormGroup;
  subcategories : any[] = [];
  placements : any[] = [];
  responsibleData : any[] = [];
  currentUser : any;
  currentResponsible : any;
  userIsAdmin : boolean = false;
  imageSrc : any;
  selectedImage : any;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data : any,
    public dialogRef: MatDialogRef<CreateEquipmentFormDialogComponent>,
    private subcategoryService : SubcategoryService,
    private responsibleService : ResponsibleService,
    private placementService : PlacementService,
    private equipmentService : EquipmentService,
    private storageService : StorageService
  ) {
    this.equipmentForm = new FormGroup({
      id : new FormControl(),
      inventoryNumber : new FormControl(null, [Validators.required]),
      name : new FormControl(null, [Validators.required]),
      initialCost : new FormControl(null, [Validators.required]),
      commissioningDate : new FormControl(null, [Validators.required]),
      commissioningActNumber : new FormControl(null, [Validators.required]),
      decommissioningDate : new FormControl(),
      decommissioningActNumber : new FormControl(""),
      description : new FormControl(),
      subcategory : new FormControl(null, [Validators.required]),
      responsible : new FormControl(null, [Validators.required]),
      placement : new FormControl(null, [Validators.required]),
      imageData : new FormControl(),
    });
  }

  ngOnInit() {
    this.currentUser = this.storageService.getUser();
    this.currentResponsible = this.storageService.getResponsible();
    this.userIsAdmin = this.currentUser.roles.some((r : any) => r.name === 'ROLE_ADMIN');
    this.subcategoryService.getAll().subscribe({ 
      next: (data : any[]) => this.subcategories = data,
      complete: () => { 
        if (!this.data) this.equipmentForm.patchValue({subcategory : this.subcategories[0]});
        else {
          this.dialogHeader = "Подробные сведения";
          this.equipmentForm.patchValue({
            subcategory : this.subcategories.find((s) => s.id === this.data.subcategory.id)
          });
        }
      } 
    });

    this.placementService.getAll().subscribe({
      next: (data : any[]) => this.placements = data,
      complete: () => { 
        if (!this.data) this.equipmentForm.patchValue({ placement : this.placements[0] })
        else {
          this.equipmentForm.patchValue({
            placement : this.placements.find((p) => p.id === this.data.placement.id)
          });
        }
      } 
    });

    this.responsibleService.getAll().subscribe({
      next: (data : any) => this.responsibleData = data,
      complete: () => {
        if (!this.data) {
          if (this.userIsAdmin) {
            this.equipmentForm.patchValue({ responsible : this.responsibleData[0] });
          }
          else {
            this.responsibleData = [this.currentResponsible];
            this.equipmentForm.patchValue({ responsible : this.responsibleData[0]})
          }
        } 
        else {
          if (this.userIsAdmin) {
            this.equipmentForm.patchValue({
              responsible : this.responsibleData.find((r) => r.id === this.data.responsible.id)
            });
          }
          else {
            this.responsibleData = [this.data.responsible];
            this.equipmentForm.patchValue({ responsible : this.responsibleData[0]})
          }
        }
      }
    });
    if (this.data) {
      this.loadDataToForm(this.data);
      this.equipmentService.getBase64Image(this.data.id).subscribe(
        (data: any) => this.imageSrc = data.imageBase64
      );
    }
    else {
      this.equipmentForm.patchValue({ commissioningDate : new Date().toISOString().substring(0, 10) });
    }
  }

  convertDateTOISOFormat(s : string) : string {
    let date = new Date(s + " EDT");
    return date.toISOString().substring(0, 10);
  }
  
  onCancel() : void {
    this.dialogRef.close();
  }
  
  onEquipmentCreate() {
    let equipment = this.createEquipmentFromForm(this.equipmentForm.value);
    equipment.commissioningDate = this.convertDateTOISOFormat(equipment.commissioningDate);
    if (equipment.decommissioningDate) {
      equipment.decommissioningDate = this.convertDateTOISOFormat(equipment.decommissioningDate);
    }
    this.equipmentService.create(equipment).subscribe({
      complete: () => {
        alert(`Информация о ${equipment.name} (инв. № ${equipment.inventoryNumber}) была успешно сохранена`);
        this.dialogRef.close();
        window.location.reload();
      },
      error: (err) => {
        alert('При сохранении информации произошла ошибка! Проверьте правильность заполнения формы');
      }
    })
  }

  onEquipmentChange() {
    let equipment = this.createEquipmentFromForm(this.equipmentForm.value);
    equipment.commissioningDate = this.convertDateTOISOFormat(equipment.commissioningDate);
    if (equipment.decommissioningDate) {
      equipment.decommissioningDate = this.convertDateTOISOFormat(equipment.decommissioningDate);
    }
    if (typeof equipment.imageData === 'string') {
      equipment.imageData = null;
    }
    if (!confirm(`Вы уверены что хотите изменить данные о ` +
        `${equipment.name} (инв. № ${equipment.inventoryNumber})?`)) return;
    this.equipmentService.update(equipment).subscribe({
      complete: () => {
        alert('Данные были успешно обновлены!');
        this.dialogRef.close();
        window.location.reload();
      },
      error: (err) => {
        alert(`Оборудование с инвентарным номером "${equipment.inventoryNumber}" уже существует`);
      }
    });
  }

  onEquipmentDelete() {
    let equipment = this.createEquipmentFromForm(this.equipmentForm.value);
    if (!confirm(`Вы уверены что хотите удалить данные о ` +
        `${equipment.name} (инв. № ${equipment.inventoryNumber})?`)) return;
        this.equipmentService.delete(equipment.id).subscribe({
          complete: () => {
            alert(`Данные об оборудовании о ` +
              `${equipment.name} (инв. № ${equipment.inventoryNumber}) были успешно удалены!`);
            this.dialogRef.close();
            window.location.reload();
          },
          error: (err) => {
            if (err.status === 404) {
              alert('Данного оборудования не существует!');
            } else if (err.status === 409) {
              alert(`Оборудование ${equipment.name} (инв. № ${equipment.inventoryNumber}) не может быть удалено: ` +  
                    `за ним закреплены взятия!`);
            } else {
              alert('Непредвиденная ошибка! Удалить ответственного невозможно');
            }
          }
        });
  }

  loadDataToForm(data : any) {
    this.equipmentForm.patchValue({
      id : data.id,
      inventoryNumber : data.inventoryNumber,
      name : data.name, 
      initialCost : data.initialCost,
      imageData : data.imageData,
      commissioningDate : data.commissioningDate,
      commissioningActNumber : data.commissioningActNumber,
      decommissioningDate : data.decommissioningDate,
      decommissioningActNumber : data.decommissioningActNumber,
      description : data.description,
    });
  }

  onFileChange(event : any) {
    const reader = new FileReader();
    if (event.target.files && event.target.files.length) {
      const [file] = event.target.files;
      reader.readAsDataURL(file);

      reader.onload = () => {
        this.imageSrc = reader.result as string;
      }

      this.equipmentForm.patchValue({
        imageData : file
      })
    }
  }

  createEquipmentFromForm(formValues : any) : any {
    let form  = {
      id : formValues.id, 
      inventoryNumber : formValues.inventoryNumber.trim(), 
      name : formValues.name.trim(), 
      initialCost: formValues.initialCost, 
      commissioningDate: formValues.commissioningDate, 
      commissioningActNumber : formValues.commissioningActNumber.trim(),
      responsible : formValues.responsible, 
      subcategory : formValues.subcategory, 
      placement : formValues.placement, 
      imageData : formValues.imageData,
      description : formValues.description,
      decommissioningDate : formValues.decommissioningDate,
      decommissioningActNumber : formValues.decommissioningActNumber
    };
    return form;
  } 

  OnDecommissionFilling() {
    let decommissioiningDateControl = this.equipmentForm.get("decommissioningDate");
    let decommissioiningActControl = this.equipmentForm.get("decommissioningActNumber");
    let decommissioiningDateValueIsEmpty = decommissioiningDateControl?.value == null;
    let decommissioiningActValueIsEmpty = (decommissioiningActControl?.value == "" || decommissioiningActControl?.value == null);

    if (!decommissioiningActValueIsEmpty && decommissioiningDateValueIsEmpty) {
      decommissioiningDateControl?.setValidators([Validators.required]);
      decommissioiningDateControl?.setErrors({unfilled : true});
      decommissioiningDateControl?.updateValueAndValidity();
    }

    if (!decommissioiningDateValueIsEmpty && decommissioiningActValueIsEmpty) 
    {
      decommissioiningActControl?.setValidators([Validators.required]);
      decommissioiningActControl?.setErrors({unfilled : true});
      decommissioiningActControl?.updateValueAndValidity();
    }

    if ((decommissioiningActValueIsEmpty && decommissioiningDateValueIsEmpty) ||  
        (!decommissioiningActValueIsEmpty && !decommissioiningDateValueIsEmpty)
    ) {
      decommissioiningDateControl?.removeValidators([Validators.required]);
      decommissioiningActControl?.removeValidators([Validators.required]);

      decommissioiningDateControl?.setErrors(null);
      decommissioiningActControl?.setErrors(null);
    }
  }
}
