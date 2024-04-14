import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { FirebaseService } from '../../services/firebase.service';
import { Category } from '../../class/category.class';
import { v4 as uuidv4 } from 'uuid';
import { CommonModule } from '@angular/common';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-add-exercise',
  standalone: true,
  imports: [
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatInputModule,
    MatFormFieldModule,
    FormsModule,
    MatSelectModule,
    CommonModule,
  ],
  templateUrl: './add-exercise.component.html',
  styleUrl: './add-exercise.component.scss',
})
export class AddExerciseComponent {
  categoryName!: string;
  exerciseName!: string;
  addCategory!: string;
  licksAmount!: number;

  disableSaveBtn = false;

  categoryArray: any[] = [];

  firebase = inject(FirebaseService);

  constructor(public dialogRef: MatDialogRef<AddExerciseComponent>) {}

  async ngOnInit(): Promise<void> {
    await this.firebase.ngOnInit();
  }

  async save() {
    this.categoryArray = [];
    const newCategory = new Category({
      categoryName: this.categoryName || 'no category',
      exerciseName: this.exerciseName,
      licksAmount: this.licksAmount || 0,
      categorySelected: false,
      exerciseSelected: false,
    });
    await this.firebase.addCollection(newCategory);
    await this.firebase.ngOnInit();
    this.dialogRef.close();
  }

  async addCategoryBtn(addCategory: string) {
    await this.firebase.addCategory(addCategory);
    await this.firebase.ngOnInit();
    this.addCategory = '';
  }
}
