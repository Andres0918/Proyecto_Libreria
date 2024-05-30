import { Injectable } from '@angular/core';
import { Auth, createUserWithEmailAndPassword, signInWithPopup, GoogleAuthProvider, signInWithEmailAndPassword, signOut, updateProfile } from '@angular/fire/auth';
import { Firestore, doc, updateDoc } from '@angular/fire/firestore';
import { addDoc, collection, deleteDoc, getDocs, query, where } from 'firebase/firestore';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private auth: Auth,
    private firestore: Firestore
  ) { }

  register(email:any, pasword:any){
    const userRef = collection(this.firestore, 'usuarios')
    addDoc(userRef, {email: email, role: 'common'})
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

  updateProfile(user: any, displayName: any, picture: any){
    return updateProfile(user, {displayName: displayName, photoURL: picture})
  }

  updateRole(email: any, newRole: any){
    const userRef = doc(this.firestore, `usuarios/${email}`);
    updateDoc(userRef,{email: email, role: newRole})
  }

  async getUserRoleByEmail(email: string): Promise<string | null> {
    const usersRef = collection(this.firestore, 'usuarios');
    const q = query(usersRef, where('email', '==', email));
    const querySnapshot = await getDocs(q);
    let role = null;
    querySnapshot.forEach(doc => {
      const data = doc.data();
      role = data['role'];
    });
    return role;
  }
}
