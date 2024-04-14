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
  categoriesSelected: boolean = false;
  exercisesSelected: boolean = false;

  isAllCategoriesBtnSelected: boolean = false;
  isAllExercisesBtnSelected: boolean = false;

  constructor(public dialog: MatDialog) {}

  async ngOnInit(): Promise<void> {
    await this.firebase.ngOnInit();
    this.allCategories();
    // this.allExercises();
  }

  addExercisePopup() {
    this.dialog.open(AddExerciseComponent, {
      panelClass: 'addExercisePopup',
    });
  }

  // categories start
  allCategories() {
    console.log(this.categoriesSelected);
    
    if (!this.categoriesSelected) {
      this.controlCategories(true);
    } else {
      this.controlCategories(false);
      this.controlExercises(false);
    }
  }

  controlCategories(bool: boolean) {
    this.firebase.collection.forEach((element) => {
      element.categorySelected = bool;
    });
    this.categoriesSelected = bool;
    this.allCategoriesBtn(bool);
  }

  allCategoriesBtn(bool: boolean) {
    this.isAllCategoriesBtnSelected = bool;
  }

  categoriesBehaviour(collection: any) {
    let atLeastOneFalse = false;
    collection.categorySelected = !collection.categorySelected;
    this.firebase.collection.forEach((element) => {
      if (!element.categorySelected) {
        atLeastOneFalse = true;
        this.allCategoriesBtn(false);
        this.categoriesSelected = false;
        return;
      } else if (!atLeastOneFalse) {
        this.allCategoriesBtn(true);
        this.categoriesSelected = true;
      }
    });
  }
  // categories end

  help() {
    console.log(this.firebase.collection);
  }

  // exercises start
  allExercises() {
    if (!this.exercisesSelected) {
      this.controlExercises(true);
    } else {
      this.controlExercises(false);
    }
  }

  controlExercises(bool: boolean) {
    this.firebase.collection.forEach((element) => {
      element.exerciseSelected = bool;
    });
    this.exercisesSelected = bool;
    this.allExercisesBtn(bool);
  }

  allExercisesBtn(bool: boolean) {
    this.isAllExercisesBtnSelected = bool;
  }

  exercisesBehaviour(collection: any) {
    let atLeastOneFalse = false;
    collection.exerciseSelected = !collection.exerciseSelected;
    this.firebase.collection.forEach((element) => {
      element.exerciseSelected;
      if (!element.exerciseSelected) {
        atLeastOneFalse = true;
        this.allExercisesBtn(false);
        this.exercisesSelected = false;
        return;
      } else if (!atLeastOneFalse) {
        this.allExercisesBtn(true);
        this.exercisesSelected = true;
      }
    });
  }
  // exercises end
}
