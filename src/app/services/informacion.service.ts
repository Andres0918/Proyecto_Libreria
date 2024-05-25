import { Injectable } from '@angular/core';
import { Firestore } from '@angular/fire/firestore';
import { Message } from '../domain/message';
import { addDoc, collection, getDocs, query } from 'firebase/firestore';


@Injectable({
  providedIn: 'root'
})
export class InformacionService {

  constructor(private firestore: Firestore) { }

  addMessage(message: Message){
    addDoc(collection(this.firestore, 'informacion'), Object.assign({},message))
  }

  getMessages(){
    return getDocs(query(collection(this.firestore, 'informacion')))
  }

}
