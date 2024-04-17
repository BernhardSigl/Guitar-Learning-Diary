import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditCategoryNameComponent } from './edit-category-name.component';

describe('EditCategoryNameComponent', () => {
  let component: EditCategoryNameComponent;
  let fixture: ComponentFixture<EditCategoryNameComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditCategoryNameComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EditCategoryNameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
