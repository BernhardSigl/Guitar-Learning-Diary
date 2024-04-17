import { Component, Inject, inject } from '@angular/core';
import { FirebaseService } from '../../services/firebase.service';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { EditCategoryNameComponent } from '../edit-category-name/edit-category-name.component';
import { EditExerciseNameComponent } from '../edit-exercise-name/edit-exercise-name.component';
import { EditLicksAmountComponent } from '../edit-licks-amount/edit-licks-amount.component';

@Component({
  selector: 'app-edit-exercise',
  standalone: true,
  imports: [
    MatIconModule,
    MatButtonModule
  ],
  templateUrl: './edit-exercise.component.html',
  styleUrl: './edit-exercise.component.scss'
})
export class EditExerciseComponent {

  categories: any[] = [];

  firebase = inject(FirebaseService);

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialog: MatDialog
  ){}

  async ngOnInit(): Promise<void> {
    if (this.firebase.updatedCategoryName === '') {
          this.categories = this.firebase.collection.filter(item => item.categoryName === this.data.categoryName);
    } else {
      this.categories = this.firebase.collection.filter(item => item.categoryName === this.firebase.updatedCategoryName);
    }
  
    this.firebase.updateTrigger.subscribe(() => {
      this.ngOnInit();
    });
  }

  editCategoryName(categoryName: string) {
    const dialogRef = this.dialog.open(EditCategoryNameComponent, {
      panelClass: 'addExercisePopup',
      data: {
        categoryName: categoryName,
        categories: this.categories,
      }
    });
  }

  editExerciseName(exerciseName: string, categoryName: string) {
    const dialogRef = this.dialog.open(EditExerciseNameComponent, {
      panelClass: 'addExercisePopup',
      data: {
        categoryName: categoryName,
        exerciseName: exerciseName,
        categories: this.categories,
      }
    });
  }

  editLicksAmount(exerciseName: string, categoryName: string, licksAmount: number) {
    const dialogRef = this.dialog.open(EditLicksAmountComponent, {
      panelClass: 'addExercisePopup',
      data: {
        categoryName: categoryName,
        exerciseName: exerciseName,
        categories: this.categories,
        licksAmount: licksAmount,
      }
    });
  }

  async deleteExercise(exerciseName: string, categoryName: string) {
    let indexToDelete = -1;
    for (let i = 0; i < this.firebase.usersArray[0].collection.length; i++) {
      const collection = this.firebase.usersArray[0].collection[i];
      if (collection.categoryName === categoryName && collection.exerciseName === exerciseName) {
        indexToDelete = i;
        break;
      }
    }
  
    if (indexToDelete !== -1) {
      this.firebase.usersArray[0].collection.splice(indexToDelete, 1);
      await this.firebase.saveCollection(this.firebase.usersArray[0].collection);
      await this.firebase.ngOnInit();
      await this.ngOnInit();
    } else {
      console.log("Das zu löschende Element wurde nicht gefunden.");
    }
  }
  
  

}
