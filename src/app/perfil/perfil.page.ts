import { Component, OnInit } from '@angular/core';
import { MenuController, NavController } from '@ionic/angular';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { getDatabase, ref, child, push, update, get, set, onValue} from "firebase/database";
import { ActivatedRoute, Router } from '@angular/router';
import { getAuth } from 'firebase/auth';
import { collection, doc, getDoc, getDocFromCache, getDocs, getFirestore } from "firebase/firestore";

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
})



export class PerfilPage implements OnInit {

nome: string;
email: string;
cpf: string;
idade: string;
telefone: string;
data: string;

  constructor(private activatedRoute: ActivatedRoute, private router: Router) { }

  async ngOnInit() {

    const auth = getAuth();
    const user = auth.currentUser;
    const uid = user.uid;

    const db = getFirestore();
    const docRef = doc(db, "users", uid);
    try {
      const doc = await getDoc(docRef);
      const data = doc.data();
      console.log(data);
      this.nome = data.nome;
      this.email = data.email;
      this.cpf = data.cpf;
      this.idade = data.idade;
      this.telefone = data.telefone;
    } catch (e) {
      console.log("Error getting cached document:", e);
    }

};
}






