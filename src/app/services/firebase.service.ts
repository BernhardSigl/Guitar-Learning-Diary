import { Injectable, inject } from '@angular/core';
import {
  Firestore,
  addDoc,
  arrayUnion,
  collection,
  doc,
  onSnapshot,
  query,
  setDoc,
  updateDoc,
} from '@angular/fire/firestore';
import { User } from '../class/user.class';
import { Category } from '../class/category.class';

@Injectable({
  providedIn: 'root',
})
export class FirebaseService {
  userId!: string;
  usersArray: any[] = [];

  contributionsArray: any[] = [];
  email!: string;
  collection: any[] = [];
  // categories: any[] = [];
  // exercises: any[] = [];
  categoryDropdown: any[] = [];

  firestore: Firestore = inject(Firestore);

  constructor() {}

  async ngOnInit(): Promise<void> {
    await this.subAllUsers();
    await this.updateUserValues();
  }

  async subAllUsers(): Promise<void> {
    return new Promise<void>((resolve) => {
      const q = query(this.getUsersColRef());
      onSnapshot(q, async (querySnapshot) => {
        this.usersArray = [];
        querySnapshot.forEach(async (doc) => {
          const usersData = doc.data();
          // this.userId = doc.id;
          this.usersArray.push(usersData);
        });
        // await this.getLoggedInUserInfos();
        resolve();
      });
    });
  }

  async updateUserValues() {
    const userId = localStorage.getItem('userId');
    this.categoryDropdown = [];
    this.collection = [];
    for (const user of this.usersArray) {
      if (user.userId === userId) {
        this.email = user.email;
        this.categoryDropdown = user.categories;
        if (user.collection) {      
          user.collection.forEach((element: { categoryName: string,  exerciseName: string, licksAmount: number}) => {
            this.collection.push({
              licksAmount: element.licksAmount,
              categoryName: element.categoryName,
              categorySelected: false,
              exerciseName: element.exerciseName,
              exerciseSelected: false,
            });
          });
        }
      }
      break;
    }
  }

  getUsersColRef() {
    return collection(this.firestore, 'user');
  }

  getSingleUserDocRef() {
    this.userId = localStorage.getItem('userId')!;
    return doc(this.getUsersColRef(), this.userId);
  }

  // async getLoggedInUserInfos(): Promise<void> {
  //   const loggedInUserInfo = this.usersArray[0];
  // }

  async createNewUser(email: string) {
    const newUser = new User({
      email: email,
    });
    try {
      const result = await addDoc(this.getUsersColRef(), newUser.toJson());
      this.userId = result.id;
      await this.saveUserId(newUser, result.id);
    } catch (error) {
      console.error('Error adding channel:', error);
    }
  }

  async saveUserId(newUser: User, userId: string) {
    localStorage.setItem('userId', userId);
    let docRef = this.getSingleUserDocRef();
    await updateDoc(docRef, newUser.toJson());
    await this.updateUserId(userId);
  }

  async updateUserId(userId: string) {
    await setDoc(
      this.getSingleUserDocRef(),
      { userId: userId },
      { merge: true }
    );
  }

  // save exercise start
  async addCollection(newCategory: Category) {
    await setDoc(
      this.getSingleUserDocRef(),
      { collection: arrayUnion(newCategory.toJson()) },
      { merge: true }
    );
  }

  async addCategory(category: string) {
    await setDoc(
      this.getSingleUserDocRef(),
      { categories: arrayUnion(category) },
      { merge: true }
    );
  }

  // save exercise end
}
