import { Component, Inject, inject } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FirebaseService } from '../../services/firebase.service';

@Component({
  selector: 'app-edit-category-name',
  standalone: true,
  imports: [
    FormsModule,
    CommonModule,
    MatInputModule,
    MatFormFieldModule,
    MatIconModule,
    MatButtonModule,
  ],
  templateUrl: './edit-category-name.component.html',
  styleUrl: './edit-category-name.component.scss',
})
export class EditCategoryNameComponent {
  newCategoryName!: string;
  firebase = inject(FirebaseService);

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<EditCategoryNameComponent>,
  ) {}

  async save() {
    for (const item of this.firebase.usersArray[0].collection) {
      if (item.categoryName === this.data.categoryName) {
        item.categoryName = this.newCategoryName;
      }
    }
   
    this.firebase.categoryDropdown = this.firebase.categoryDropdown.map((element) => {
      if (element === this.data.categoryName) {
        return this.newCategoryName;
      } else {
        return element;
      }
    });

    await this.firebase.saveCollection(this.firebase.usersArray[0].collection);
    await this.firebase.saveCategoryDropdown(this.firebase.categoryDropdown);
    await this.firebase.ngOnInit();
    this.dialogRef.close();
    this.firebase.updatedCategoryName = this.newCategoryName;
    this.firebase.triggerExerciseListUpdate();
    this.newCategoryName = '';
    this.firebase.triggerOverview();
  }
}
