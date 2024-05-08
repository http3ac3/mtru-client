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
    FormsModule,
    ReactiveFormsModule,
    NgFor,
    NgStyle
  ],
  templateUrl: './import.component.html',
  styleUrl: './import.component.css'
})
export class ImportComponent {
  importForm : FormGroup;
  imported = false;
  proccess = false;

  response : any;

  constructor(
    public dialog : MatDialogRef<ImportComponent>,
    private importService : ImportService
  ) {
    this.importForm = new FormGroup({
      fileSelect : new FormControl(null, [Validators.required]),
      file : new FormControl(null)
    })
  }

  onCancel() {
    this.dialog.close();
  }

  onImport() {
    this.proccess = true;
    
    this.importService.importFromExcel(this.importForm.value.file).subscribe({
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
