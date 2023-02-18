import { Component, OnInit } from '@angular/core';
import { getAuth, signOut } from "firebase/auth";
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { doc, getDoc, getFirestore } from 'firebase/firestore';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit {

  usuario: any;

  constructor(private router: Router,
    private auth: AngularFireAuth
    ) {}

  async ngOnInit(){
    
    this.auth.onAuthStateChanged(async user => { // verifica se o usuário esta logado
      if (user) {
    this.router.navigateByUrl("/perfil");  // se estiver logado manda pra página inicial  
    const auth = getAuth();
    const user = auth.currentUser;
    const uid = user.uid;
    const db = getFirestore();
    const docRef = doc(db, "users", uid);


    try {
      const doc = await getDoc(docRef);
      this.usuario = doc.data();
    } catch (e) {
      console.log("Error getting cached document:", e);
    }
      }
      else{
        this.router.navigateByUrl("/home");
      }
    });

  }

signOut(){

const auth = getAuth();
signOut(auth).then(() => {
  
this.router.navigateByUrl("/home");

}).catch((error) => {


});

}

}
