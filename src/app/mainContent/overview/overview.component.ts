import { Component, inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatButtonModule } from '@angular/material/button';
import { AddExerciseComponent } from '../../popups/add-exercise/add-exercise.component';
import { FirebaseService } from '../../services/firebase.service';

@Component({
  selector: 'app-overview',
  standalone: true,
  imports: [MatButtonModule, MatTooltipModule, MatIconModule],
  templateUrl: './overview.component.html',
  styleUrl: './overview.component.scss',
})
export class OverviewComponent {

  firebase = inject(FirebaseService);

  constructor(
    public dialog: MatDialog,
  ) {}

  async ngOnInit():Promise<void>{
    await this.firebase.ngOnInit();
  }

  addExercisePopup() {
    this.dialog.open(AddExerciseComponent, {
      panelClass: 'addExercisePopup',
    });
  }
}
