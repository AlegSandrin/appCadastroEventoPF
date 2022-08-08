import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Registro } from '../cadastro/models/registro';
 


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(public auth: AngularFireAuth) { }

  login(user: Registro) {
    return this.auth.signInWithEmailAndPassword(user.email, user.senha)
  }

  register(user: Registro){
     return this.auth.createUserWithEmailAndPassword(user.email, user.senha);
  }

  logout() {
    this.auth.signOut()
  }

  getAuth() {

  }
}
