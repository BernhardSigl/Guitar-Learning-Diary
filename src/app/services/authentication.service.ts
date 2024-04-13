import { inject, Injectable } from '@angular/core';
import {
  Auth,
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
  UserCredential,
} from '@angular/fire/auth';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { FirebaseService } from './firebase.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  auth = inject(Auth);
  router = inject(Router);
  firebase = inject(FirebaseService);
  wrongInputs = false;

  private isAuthenticatedSubject: BehaviorSubject<boolean> =
  new BehaviorSubject<boolean>(false);

  constructor() {
    this.auth = getAuth();
   }

  // register start
  async verifyRegister(email: string, password: string): Promise<void> {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        this.auth,
        email,
        password
      );
      const userId = userCredential.user?.uid;     
      if (userId) {
        await this.firebase.createNewUser(email);
        localStorage.setItem('email', email);
        localStorage.setItem('password', password);
        localStorage.setItem('rememberMe', 'false');
        localStorage.setItem('autoLogin', 'false');
        this.router.navigate(['/']);
      }
    } catch (error) {
      throw error;
    }
  }
  // register end

  // log in start
  async loginWithEmailAndPassword(
    email: string,
    password: string
  ): Promise<UserCredential | undefined> {
    try {
      const credential = await signInWithEmailAndPassword(
        this.auth,
        email,
        password
      );
      this.isAuthenticatedSubject.next(true);
      this.navigate(email);
      return credential;
    } catch {
      localStorage.removeItem('email');
      localStorage.removeItem('password');
      this.wrongCredentials();
      return;
    }
  }

  wrongCredentials() {
    this.wrongInputs = true;
    setTimeout(() => {
      this.wrongInputs = false;
    }, 4000);
  }

  private async navigate(email: string): Promise<void> {
    const userId = await this.searchUserId(email);
    if (userId !== undefined) {
      localStorage.setItem('userId', userId);
      this.router.navigate(['/overview'], { queryParams: { userId } });
    }
  }

  async searchUserId(email: string) {
    await this.firebase.subAllUsers();
    for (const user of this.firebase.usersArray) {
      if (user.email === email) {
        return user.userId;
      }
    }
    return undefined;
  }

  canActivate(): Observable<boolean> {
    return this.isAuthenticated().pipe(
      tap((isAuthenticated) => {
        if (!isAuthenticated) {
          this.router.navigate(['/']);
        }
      })
    );
  }

  isAuthenticated(): Observable<boolean> {
    return this.isAuthenticatedSubject.asObservable();
  }
  // log in end
}
