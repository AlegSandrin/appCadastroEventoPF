import { Component, OnInit } from '@angular/core';
import { MenuController, NavController } from '@ionic/angular';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { getDatabase, ref, child, push, update, get} from "firebase/database";


@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
})



export class PerfilPage implements OnInit {

name: string;

  constructor() { }

  ngOnInit() {
  }

lerDados(nome,email,cpf,idade,telefone) {
  const dbRef = ref(getDatabase());

  const cadastroData = {
    nome: nome,
email: email,
cpf: cpf,
idade: idade,
telefone: telefone
  };

get(child(dbRef, 'cadastros')).then((snapshot) => {
  if (snapshot.exists()) {
    console.log(snapshot.val());
  } else {
    console.log("No data available");
  }
}).catch((error) => {
  console.error(error);
});
}

  update(nome, email, cpf, idade, telefone) {
    const db = getDatabase();
  
    // A post entry.
    const cadastroData = {
      nome: nome,
      email: email,
      cpf: cpf,
      idade: idade,
      telefone: telefone
    };
  
  
    // Write the new post's data simultaneously in the posts list and the user's post list.
    const updates = {};
    updates['/cadastros/'] = cadastroData;
    
  
    return update(ref(db), updates);
  }
  

}

