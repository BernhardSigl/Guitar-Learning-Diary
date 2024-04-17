import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditLicksAmountComponent } from './edit-licks-amount.component';

describe('EditLicksAmountComponent', () => {
  let component: EditLicksAmountComponent;
  let fixture: ComponentFixture<EditLicksAmountComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditLicksAmountComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EditLicksAmountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
