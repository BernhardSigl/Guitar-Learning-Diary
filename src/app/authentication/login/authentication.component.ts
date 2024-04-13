import { Component, inject, ChangeDetectorRef } from '@angular/core';
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
  selector: 'app-authentication',
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
  templateUrl: './authentication.component.html',
  styleUrl: './authentication.component.scss',
})
export class AuthenticationComponent {
  router = inject(Router);
  authService = inject(AuthenticationService);

  constructor(private cdr: ChangeDetectorRef){}

  async ngOnInit():Promise<void> {
    const storedEmail = localStorage.getItem('email');
    const storedPassword = localStorage.getItem('password');
    const rememberMe = localStorage.getItem('rememberMe');
    const autoLogin = localStorage.getItem('autoLogin');

    if (storedEmail && storedPassword && rememberMe && autoLogin === 'true') {
      this.form.setValue({
        email: storedEmail,
        password: storedPassword,
        rememberMe: true,
      });
      await this.login();
    } else if (storedEmail && storedPassword && rememberMe && autoLogin === 'false') {
      this.form.setValue({
        email: storedEmail,
        password: storedPassword,
        rememberMe: false,
      });
    } else {
      localStorage.clear();
    }
  }

  form: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
    rememberMe: new FormControl(false),
  });

  get email() {
    return this.form.get('email');
  }

  get password() {
    return this.form.get('password');
  }

  get rememberMe() {
    return this.form.get('rememberMe');
  }

  required(input: string): boolean {
    return this.form.get(input)?.hasError('required') || false;
  }

  async login() {
    if (this.form.value.rememberMe) {
      localStorage.setItem('email', this.form.value.email);
      localStorage.setItem('password', this.form.value.password);
      localStorage.setItem('rememberMe', this.form.value.rememberMe);
      localStorage.setItem('autoLogin', 'true');
    } else {
      localStorage.removeItem('email');
      localStorage.removeItem('password');
      localStorage.setItem('rememberMe', 'false');
    }
    await this.authService.loginWithEmailAndPassword(
      this.form.value.email,
      this.form.value.password
    );
  }
}
