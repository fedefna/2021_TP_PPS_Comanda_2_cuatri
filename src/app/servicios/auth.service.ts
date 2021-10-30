import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { User } from '../clases/user';
import * as firebase from 'firebase/app';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/compat/firestore';
import { Observable, of } from 'rxjs';
import { first, switchMap } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  usuario;
  public user$: Observable<User>;
  constructor(private afAuth: AngularFireAuth, private afs: AngularFirestore) {
    this.user$ = this.afAuth.authState.pipe(
      switchMap((user) => {
        if (user) {
          return this.afs.doc<User>(`users/${user.uid}`).valueChanges();

        }
        return of(null);
      })
    );
  }
  getUserAuth() {

    return this.afAuth.authState.pipe(first()).toPromise();

  }
  getUser() {
    try {
      console.log('ddd', this.user$.toPromise());
      return this.user$.toPromise();
    } catch (error) {
      console.log('error->', error);
    }
  }
  login(email: string, password: string) {

    return this.afAuth.signInWithEmailAndPassword(email, password);

  }
  async loginGoogle(){
    try {

    } catch (error) {
      console.log('error->', error);
    }
  }
  async registro(email: string, password: string): Promise<User> {
    try {
      const { user } = await this.afAuth.createUserWithEmailAndPassword(email, password);
      //   await this.sendVerificarionEmail();
      this.updateUserData(user);
      return user;
    } catch (error) {
      console.log('error->', error);
    }
  }
  async logOut(): Promise<void> {
    try {
      await this.afAuth.signOut();
    } catch (error) {
      console.log('error->', error);
    }
  }
  async resetPassword(email: string): Promise<void> {
    try {
      return this.afAuth.sendPasswordResetEmail(email);
    } catch (error) {
      console.log('error->', error);
    }
  }
  async sendVerificarionEmail(): Promise<void> {
    try {
      return (await this.afAuth.currentUser).sendEmailVerification();
    } catch (error) {
      console.log('error->', error);
    }
  }
  async isEmailVerified(user: User) {
    try {
      return user.emailVerified === true ? true : false;
    } catch (error) {
      console.log('error->', error);
    }
  }
  private updateUserData(user: User) {
    const userRef: AngularFirestoreDocument<User> = this.afs.doc(`user/${user.uid}`);
    const data: User = {
      uid: user.uid,
      email: user.email,
      emailVerified: user.emailVerified,
      displayName: user.displayName,

    };

    return userRef.set(data, { merge: true });
  }


}
