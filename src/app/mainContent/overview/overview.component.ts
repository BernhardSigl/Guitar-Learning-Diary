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
import { Category } from '../../class/category.class';

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

  previousCategoryName: string = '';

  uniqueCategories: { categoryName: string; categorySelected: boolean }[] = [];
  categoriesLoaded: boolean = false;

  number: number = 1;

  gambleArray: any[] = [];
  uniqueCategoryNamesResults: string[] = [];

  constructor(public dialog: MatDialog) {}

  async ngOnInit(): Promise<void> {
    await this.firebase.ngOnInit();
    await this.checkEmptyCategories();
    await this.getUniqueCategories();
    this.allCategories();
  }

  addExercisePopup() {
    this.dialog.open(AddExerciseComponent, {
      panelClass: 'addExercisePopup',
    });
  }

  async checkEmptyCategories() {
    if (this.firebase.collection.length === 0) {
      this.firebase.addCategory('Sweep picking');
      const newCategory = new Category({
        categoryName: 'Sweep picking',
        exerciseName: 'Downward',
        licksAmount: 3,
        categorySelected: false,
        exerciseSelected: false,
      });
      await this.firebase.addCollection(newCategory);

      await this.firebase.ngOnInit();
    }
  }

  // categories start
  allCategories() {
    this.categoriesSelected = !this.categoriesSelected;
    if (!this.categoriesSelected) {
      this.controlCategories(false);
    } else {
      this.controlCategories(true);
      this.controlExercises(false);
    }
  }

  controlCategories(bool: boolean) {
    this.uniqueCategories.forEach((element) => {
      element.categorySelected = bool;
    });
    this.firebase.collection.forEach((element) => {
      element.categorySelected = bool;
      this.firebase.saveCategoriesBool(bool);
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
      if (collection.categoryName === element.categoryName) {
        element.categorySelected = collection.categorySelected;
      }

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
      this.firebase.saveExercisesBool(bool);
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

  increaseNumber() {
    this.number++;
  }

  decreaseNumber() {
    if (this.number > 1) {
      this.number--;
    }
  }

  result() {
    this.gambleArray = [];
    this.firebase.collection.forEach((element) => {
      if (element.exerciseSelected === true) {
        this.gambleArray.push({
          exerciseName: element.exerciseName,
          licksAmount: element.licksAmount,
          categoryName: element.categoryName
        });
      } else {
        console.log('err');
      }
    });
    this.gambleArray.forEach((exercise) => {
      exercise.lickNumber = this.generateRandomLicks(0, exercise.licksAmount);
    });

    if (this.gambleArray.length > 0) {
      this.gambleArray = this.generateResults(this.number);
    }
    this.gambleArray.sort((a, b) => {
      return a.categoryName.localeCompare(b.categoryName); // Sort by categoryName
    });

    const uniqueNamesSet = new Set<string>();
    this.gambleArray.forEach(item => uniqueNamesSet.add(item.categoryName));
    this.uniqueCategoryNamesResults = Array.from(uniqueNamesSet);
  }

  generateRandomLicks(min: number, max: number): number {
    return Math.floor(Math.random() * max) + min + 1;
  }

  generateResults(number: number) {
    const results = [];

    for (let i = 0; i < number; i++) {
      const randomIndex = Math.floor(Math.random() * this.gambleArray.length);
      const selectedExercise = this.gambleArray[randomIndex];
      const lickNumber = this.generateRandomLicks(
        0,
        selectedExercise.licksAmount
      );

      results.push({
        exerciseName: selectedExercise.exerciseName,
        lickNumber: lickNumber,
        categoryName: selectedExercise.categoryName
      });
    }

    return results;
  }

  async getUniqueCategories() {
    this.uniqueCategories = [];
    this.firebase.collection.forEach((collection) => {
      if (
        !this.uniqueCategories.find(
          (cat) => cat.categoryName === collection.categoryName
        )
      ) {
        this.uniqueCategories.push({
          categoryName: collection.categoryName,
          categorySelected: false,
        });
      }
    });
    this.categoriesLoaded = true;
  }
  
  sortedExercises() {
    return this.firebase.collection.sort((a, b) => {
      if (a.categoryName < b.categoryName) {
        return -1;
      }
      if (a.categoryName > b.categoryName) {
        return 1;
      }
      return 0;
    });
  }

  hasSelectedCategories(): boolean {
    return this.firebase.collection.some(item => item.categorySelected);
  }

  hasSelectedExercises(): boolean {
    return this.firebase.collection.some(item => item.exerciseSelected);
  }

  hasMultipleSelectedExercises(): boolean {
    return this.firebase.collection.filter(item => item.categorySelected).length > 1;
  }

  hasMultipleCategories(): boolean {
    return this.uniqueCategories.length > 1;
  }
}
