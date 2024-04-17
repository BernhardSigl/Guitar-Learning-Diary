import { Component, inject } from '@angular/core';
import { FirebaseService } from '../../services/firebase.service';
import {MatListModule} from '@angular/material/list';
import { MatDialog } from '@angular/material/dialog';
import { EditExerciseComponent } from '../edit-exercise/edit-exercise.component';

@Component({
  selector: 'app-exercise-list',
  standalone: true,
  imports: [
    MatListModule
  ],
  templateUrl: './exercise-list.component.html',
  styleUrl: './exercise-list.component.scss'
})
export class ExerciseListComponent {
  firebase = inject(FirebaseService);

  constructor(public dialog: MatDialog){}

  editExercisePopup(categoryName: string) {
    const dialogRef = this.dialog.open(EditExerciseComponent, {
      panelClass: 'addExercisePopup',
      data: {
        categoryName: categoryName,
      }
    });
  }

  
}
