import { Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import {
  MatDialogRef,
  MatDialogTitle,
  MatDialogContent,
  MatDialogActions,
} from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { ImportService } from '../../../../services/import/import.service';
import { NgFor, NgStyle } from '@angular/common';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { ResponsibleService } from '../../../../services/responsible/responsible.service';
import { AccessService } from '../../../../services/access/access.service';
import { StorageService } from '../../../../services/storage/storage.service';
import { PlacementService } from '../../../../services/placement/placement.service';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { provideNativeDateAdapter } from '@angular/material/core';



@Component({
  selector: 'app-import',
  standalone: true,
  imports: [
    MatDialogTitle,
    MatDialogActions,
    MatDialogContent,
    MatIconModule,
    MatButtonModule,
    MatProgressBarModule,
    MatSelectModule,
    MatInputModule,
    MatDatepickerModule,
    FormsModule,
    ReactiveFormsModule,
    NgFor,
    NgStyle
  ],
  templateUrl: './import.component.html',
  styleUrl: './import.component.css',
  providers: [provideNativeDateAdapter()]
})
export class ImportComponent {
  importForm : FormGroup;
  imported = false;
  proccess = false;

  response : any;

  responsibleData : any[] = [];
  placements : any[] = [];

  constructor(
    public dialog : MatDialogRef<ImportComponent>,
    private importService : ImportService,
    private responsibleService : ResponsibleService,
    private placementService : PlacementService,
    private accessService : AccessService,
    private storageService : StorageService
  ) {
    this.importForm = new FormGroup({
      fileSelect : new FormControl(null, [Validators.required]),
      file : new FormControl(null),
      autoResponsible : new FormControl(null),
      autoPlacement : new FormControl(null),
      autoCommissioningDate : new FormControl(null),
      autoCommissioningActNumber : new FormControl(null)
    })
  }

  ngOnInit() {
    this.responsibleService.getAll().subscribe({ 
      next: (data : any) => this.responsibleData = data,
      complete: () => {
        if (this.accessService.isLabhead()) {
          this.responsibleData = this.responsibleData.filter((r) => 
            this.storageService.getResponsible().department.id === r.department.id
          )
        }
      }
    });
    
    this.placementService.getAll().subscribe((data : any) => this.placements = data);
    
  }

  convertDateTOISOFormat(s : string) : string {
    let date = new Date(s + " EDT");
    return date.toISOString().substring(0, 10);
  }

  onCancel() {
    this.dialog.close();
  }

  onImport() {
    let request = this.importForm.value;
    if (request.autoCommissioningDate != null)
      request.autoCommissioningDate = this.convertDateTOISOFormat(request.autoCommissioningDate)
    this.proccess = true;
    console.log(this.importForm.value)

    this.importService.importFromExcel(request).subscribe({
      next: (data : any) => this.response = data,
      complete: () => {
        this.proccess = false;
        this.imported = true;
      }
    })
  }

  onFileChange(event : any) {
    const reader = new FileReader();
    if (event.target.files && event.target.files.length) {
      const [file] = event.target.files;
      reader.readAsDataURL(file);

      reader.onload = () => {
        // this.imageSrc = reader.result as string;
      }

      this.importForm.patchValue({
        file : file
      })
    }
  }
}
