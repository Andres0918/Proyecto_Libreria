import { Injectable } from '@angular/core';
import { Auth, createUserWithEmailAndPassword, signInWithPopup, GoogleAuthProvider, signInWithEmailAndPassword, signOut } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private auth: Auth) { }

  register(email:any, pasword:any){
    return createUserWithEmailAndPassword(this.auth, email, pasword)
  }

  login(email: any, password: any){
    return signInWithEmailAndPassword(this.auth, email, password)
  }

  loginGoogle(){
    return signInWithPopup(this.auth, new GoogleAuthProvider());
  }

  logOut(){
    return signOut(this.auth)
  }
}
