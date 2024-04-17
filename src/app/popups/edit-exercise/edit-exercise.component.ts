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
    console.log(this.firebase.updatedCategoryName);
    
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

}
