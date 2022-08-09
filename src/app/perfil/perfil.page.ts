import { Component, OnInit } from '@angular/core';
import { MenuController, NavController } from '@ionic/angular';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { getDatabase, ref, child, push, update, get, set, onValue} from "firebase/database";
import { ActivatedRoute, Router } from '@angular/router';
import { getAuth } from 'firebase/auth';
import { collection, getDocs, getFirestore } from "firebase/firestore";

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
})



export class PerfilPage implements OnInit {

nome: string;
name: string;
email: string;
uid: string;

  constructor(private activatedRoute: ActivatedRoute, private router: Router) { }

  async ngOnInit() {

    const db = getFirestore();
    const querySnapshot = await getDocs(collection(db, "users"));
    querySnapshot.forEach((doc) => {
      console.log(`${doc.id} => ${doc.data()}`);
    });
};
}






