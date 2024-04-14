import { Component, inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatButtonModule } from '@angular/material/button';
import { AddExerciseComponent } from '../../popups/add-exercise/add-exercise.component';
import { FirebaseService } from '../../services/firebase.service';
import { MatChipsModule } from '@angular/material/chips';
import { CommonModule } from '@angular/common';

import { MatCheckboxModule } from '@angular/material/checkbox';

@Component({
  selector: 'app-overview',
  standalone: true,
  imports: [
    MatCheckboxModule,
    CommonModule,
    MatButtonModule,
    MatTooltipModule,
    MatIconModule,
    MatChipsModule,
  ],
  templateUrl: './overview.component.html',
  styleUrl: './overview.component.scss',
})
export class OverviewComponent {
  firebase = inject(FirebaseService);
  // selectAllCategories: boolean[] = [];
  categoriesSelected = false;
  exercisesSelected = false;
  selectAllExercises: boolean[] = [];

  constructor(public dialog: MatDialog) {}

  async ngOnInit(): Promise<void> {
    await this.firebase.ngOnInit();
    this.allCategories();
  }

  addExercisePopup() {
    this.dialog.open(AddExerciseComponent, {
      panelClass: 'addExercisePopup',
    });
  }

  allCategories() {
    if (!this.categoriesSelected) {
      this.firebase.categories.forEach((element) => {
        element.categorySelected = true;
      });
      this.categoriesSelected = true;
    } else {
      this.firebase.categories.forEach((element) => {
        element.categorySelected = false;
      });
      this.categoriesSelected = false;
    }
  }

  allExercises() {
    if (!this.exercisesSelected) {
      this.firebase.exercises.forEach((element) => {
        element.exerciseSelected = true;
      });
      this.exercisesSelected = true;
    } else {
      this.firebase.exercises.forEach((element) => {
        element.exerciseSelected = false;
      });
      this.exercisesSelected = false;
    }
  }
}
