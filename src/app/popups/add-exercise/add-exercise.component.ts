import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';
import { FirebaseService } from '../../services/firebase.service';
import { Category } from '../../class/category.class';
import { v4 as uuidv4 } from 'uuid';

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

  async ngOnInit():Promise<void>{
    await this.firebase.ngOnInit();
  }

  logInput(): void {
    // console.log('Category:', this.categoryName);
    // console.log('addCategory:', this.addCategory);
    // console.log('Exercise:', this.exerciseName);
    // console.log('Amount of licks:', this.licksAmount);
  }

  async save() {
    this.categoryArray = [];
    const newCategory = new Category({
      categoryName: this.categoryName || 'no category',
      exerciseName: this.exerciseName,
      licksAmount: this.licksAmount || 0,
      exerciseId: uuidv4(),
    });
    await this.firebase.addCollection(newCategory);
  }
}
