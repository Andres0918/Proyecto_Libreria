import { Injectable } from '@angular/core';
import { Auth, createUserWithEmailAndPassword, signInWithPopup, GoogleAuthProvider, signInWithEmailAndPassword, signOut, updateProfile } from '@angular/fire/auth';
import { Firestore, collectionData, doc, docData, updateDoc } from '@angular/fire/firestore';
import { addDoc, collection, deleteDoc, getDocs, query, where } from 'firebase/firestore';
import { from, Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { user } from '../domain/user';
import { enviroment } from '../enviroments/enviroment';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  private usuarios= collection(this.firestore, 'usuarios');

  constructor(private auth: Auth, private firestore: Firestore, private http: HttpClient) { }

  agregarRol(email: any){
    let url = enviroment.WS_PATH + "/usuarios"
    let u = {'usuario': email, 'rol': 'common'}
    return this.http.post<any>(url, u)
  }
  
  register(email:any, pasword:any){
    let u = this.agregarRol(email).subscribe(data =>{
      u = data
    })
    console.log('xd', u)
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



  async updateRole(email: any, newRole: any){
    const usuariosRef = collection(this.firestore, 'usuarios');
    const q = query(usuariosRef, where('email', '==', email));

    const querySnapshot = await getDocs(q);
    if (querySnapshot.empty) {
      console.log('No matching documents.');
      return;
    }

    querySnapshot.forEach(async (doc) => {
      const userRef = doc.ref; // Referencia al documento
      await updateDoc(userRef, { role: newRole });
      console.log('Document updated with ID: ', userRef.id);
    });
  }



  getRoleByEmail(email: any): Observable<any> {
    const usuariosRef = collection(this.firestore, 'usuarios');
    const q = query(usuariosRef, where('email', '==', email));
    return from(getDocs(q)).pipe(
      map(querySnapshot => {
        const doc = querySnapshot.docs[0];
        return doc ? doc.data()['role'] as string : null; // Cambiado a notación de corchetes
      })
    );
  }

  getUsuarios(): Observable<user[]> {
    return collectionData(this.usuarios, { idField: 'uid' }) as Observable<user[]>;
  }

  updateUsuario(uid: string, data: Partial<user>): Promise<void> {
    const usuarioDoc = doc(this.firestore, `usuarios/${uid}`);
    return updateDoc(usuarioDoc, data);
  }




}
