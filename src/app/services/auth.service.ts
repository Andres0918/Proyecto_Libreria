import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private user: any

  constructor() { }

  setUser(user: any){
    this.user = user
  }

  getUser(){
    return this.user
  }
}
