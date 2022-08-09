import { set } from 'firebase/database';
/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable max-len */
/* eslint-disable @typescript-eslint/quotes */
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NavController, LoadingController, ToastController } from '@ionic/angular';
import { Registro } from './models/registro';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { Observable } from 'rxjs';
import { collection, addDoc, doc, setDoc } from "firebase/firestore";
import { initializeApp } from "firebase/app";
import { getFirestore} from "firebase/firestore";

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.page.html',
  styleUrls: ['./cadastro.page.scss'],
})
export class CadastroPage implements OnInit {
public cadastroForm: FormGroup;
public loading;
public userRegister: Registro = {};

  constructor(public authService: AuthService,
    public formBuilder: FormBuilder,
    private navCtrl: NavController,
    private loadingCtrl: LoadingController,
    private toastCtrl: ToastController,
    private router: Router,
    public db: AngularFireDatabase,
    )
    {
    this.cadastroForm = this.formBuilder.group({
      nome: ['', Validators.compose([Validators.required, Validators.minLength(4)])],
      email: ['', Validators.compose([Validators.required, Validators.minLength(15)])],
      senha: ['', Validators.compose([Validators.required, Validators.minLength(6)])],
      cpf: ['', Validators.compose([Validators.required, Validators.minLength(11), Validators.maxLength(14)])],
      idade: ['', Validators.compose([Validators.required, Validators.minLength(1), Validators.max(99)])],
      telefone: ['', Validators.compose([Validators.required, Validators.minLength(10), Validators.maxLength(11)])],
      cep: ['', Validators.compose([Validators.required, Validators.minLength(7), Validators.maxLength(8)])],
      cidade: ['', Validators.compose([Validators.required])],
    });

   }

  ngOnInit() {
  }

  async registro() {
//this.db.database.ref('/cadastros').push(this.cadastroForm.value); - Código anterior que usei para cadastro dos dados através do Realtime Database
  }


async cadastro(){
await this.presentLoading();

try {
  const newUser = await this.authService.register(this.userRegister);
  const dbf = getFirestore();
  await setDoc(doc(dbf, "users", newUser.user.uid), this.cadastroForm.value);
  this.loading.dismiss(this.router.navigate(['/confirmcadastro']));
}
catch(error) {
  let message: string;

  switch(error.code) {
    case 'auth/email-already-in-use':
      message = 'E-mail já em uso!';
      break;

      case 'auth/invalid-email':
      message = 'Email inválido!';
      break;
  }


this.presentToast(message);
}
finally {
  this.loading.dismiss();
}


}

  async presentLoading() {
    this.loading = await this.loadingCtrl.create({ message: 'Por favor, aguarde...'});
  return this.loading.present();

}

async presentToast(message: string) {
  const toast = await this.toastCtrl.create({ message, duration: 2000 });
  toast.present();

}


}
