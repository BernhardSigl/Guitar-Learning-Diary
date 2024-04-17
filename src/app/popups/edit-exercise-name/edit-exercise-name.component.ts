import { Component, EventEmitter, Inject, Output, inject } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FirebaseService } from '../../services/firebase.service';

@Component({
  selector: 'app-edit-exercise-name',
  standalone: true,
  imports: [
    FormsModule,
    CommonModule,
    MatInputModule,
    MatFormFieldModule,
    MatIconModule,
    MatButtonModule,
  ],
  templateUrl: './edit-exercise-name.component.html',
  styleUrl: './edit-exercise-name.component.scss',
})
export class EditExerciseNameComponent {
  newExerciseName!: string;
  firebase = inject(FirebaseService);

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<EditExerciseNameComponent>
  ) {}

  async ngOnInit(): Promise<void> {
    this.newExerciseName = this.data.exerciseName;
  }

  async save() {
    for (const item of this.firebase.usersArray[0].collection) {
      if (
        item.categoryName === this.data.categoryName &&
        item.exerciseName === this.data.exerciseName
      ) {
        item.exerciseName = this.newExerciseName;
      }
    }
    await this.firebase.saveCollection(this.firebase.usersArray[0].collection);
    await this.firebase.ngOnInit();
    this.dialogRef.close();
    this.firebase.triggerExerciseListUpdate();
  }
}
