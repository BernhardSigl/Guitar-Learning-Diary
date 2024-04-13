import { Component, inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../services/authentication.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    MatButtonModule,
    MatCheckboxModule,
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent {
  registerBtn = true;
  showConfirmPasswordError: boolean = false;
  errorMessage: string = '';

  form: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(3)]),
    confirmPassword: new FormControl('', [Validators.required, Validators.minLength(3)])
  });
  
  router = inject(Router);
  authService = inject(AuthenticationService);

  get email() {
    return this.form.get('email');
  }

  get password() {
    return this.form.get('password');
  }

  get confirmPassword() {
    return this.form.get('confirmPassword');
  }

  required(input: string): boolean {
    return this.form.get(input)?.hasError('required') || false;
  }

  passwordsMismatch() {
    if (this.form.value.password === this.form.value.confirmPassword) {
      this.showConfirmPasswordError = false;
    } else if (this.form.value.confirmPassword !== '') {
      this.showConfirmPasswordError = true;
    }
  }

  async register(): Promise<void> {
    if (this.form.valid && this.form.value.password === this.form.value.confirmPassword) {
      this.registerBtn = false;     
      await this.authService.verifyRegister(this.form.value.email, this.form.value.password);
    } else {
      this.passwordsMismatch();
      return;
    }
  }
}
