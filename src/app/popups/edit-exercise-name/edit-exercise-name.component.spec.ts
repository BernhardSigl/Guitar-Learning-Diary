import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditExerciseNameComponent } from './edit-exercise-name.component';

describe('EditExerciseNameComponent', () => {
  let component: EditExerciseNameComponent;
  let fixture: ComponentFixture<EditExerciseNameComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditExerciseNameComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EditExerciseNameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
