import { Component, inject } from '@angular/core';
import { FirebaseService } from '../../services/firebase.service';
import { MatListModule } from '@angular/material/list';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { EditExerciseComponent } from '../edit-exercise/edit-exercise.component';

@Component({
  selector: 'app-exercise-list',
  standalone: true,
  imports: [MatListModule, MatIconModule, MatButtonModule],
  templateUrl: './exercise-list.component.html',
  styleUrl: './exercise-list.component.scss',
})
export class ExerciseListComponent {
  firebase = inject(FirebaseService);

  constructor(public dialog: MatDialog) {}

  async ngOnInit(): Promise<void> {}

  async deleteCategory(categoryName: string) {
    console.log(this.firebase.usersArray[0].collection);
    for (let i = 0; i < this.firebase.usersArray[0].collection.length; i++) {
      const category = this.firebase.usersArray[0].collection[i];
      if (category.categoryName === categoryName) {
        this.firebase.usersArray[0].collection.splice(i, 1);
        i--;
      }
    }
    this.firebase.categoryDropdown.forEach((element, index) => {
      if (element === categoryName) {
        this.firebase.categoryDropdown.splice(index, 1);
      }
    });
    this.firebase.saveCollection(this.firebase.usersArray[0].collection);
    this.firebase.saveCategoryDropdown(this.firebase.categoryDropdown);
    this.firebase.triggerOverview();
  }

  editExercisePopup(categoryName: string) {
    const dialogRef = this.dialog.open(EditExerciseComponent, {
      panelClass: 'addExercisePopup',
      data: {
        categoryName: categoryName,
      },
    });
  }
}
