import { Component, OnInit } from '@angular/core';
import { AlertController, LoadingController, MenuController, NavController, ToastController } from '@ionic/angular';
import { getAuth, updateEmail, updatePassword } from 'firebase/auth';
import { collection, doc, getDoc, getDocFromCache, getDocs, getFirestore, updateDoc } from "firebase/firestore";
import { Router } from '@angular/router';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
})



export class PerfilPage implements OnInit {

public loading;
private user;

atualizar = true;

dados: {};

nome: string;
email: string;
cpf: number;
idade: number;
telefone: number;
senha: string;


  constructor(private loadingCtrl: LoadingController,
    private toastCtrl: ToastController,
    private router: Router,
    private alertController: AlertController) {}

  async ngOnInit() {

    const auth = getAuth();
    const user = auth.currentUser;
    const uid = user.uid;
    this.user = auth.currentUser;

    const db = getFirestore();
    const docRef = doc(db, "users", uid);
    try {
      const doc = await getDoc(docRef);
      const dados = doc.data();
      this.dados = doc.data();
      this.nome = dados.nome;
      this.email = dados.email;
      this.cpf = dados.cpf;
      this.idade = dados.idade;
      this.telefone = dados.telefone;
      this.senha = dados.senha;

    } catch (e) {
      console.log("Error getting cached document:", e);
    }

};

atualizarDados(){
 this.atualizar = false; 
}

async confirmar(){

  const alert = await this.alertController.create({
    header: 'Confirmação',
    message: 'Deseja realmente alterar os dados do usuário?',
    buttons: [
      {
        text: 'Cancel',
        role: 'cancel',
        handler: () => {

        },
      },
      {
        text: 'OK',
        role: 'confirm',
        handler: () => {
          this.updated()
          this.atualizar = true;
        },
      },
    ],
  });

  await alert.present();

}

async updated(){
 await this.presentLoading();

 try {
   
  updateEmail(this.user, this.email).then(() => {
  updatePassword(this.user, this.senha);
  });

  const auth = getAuth();
  const user = auth.currentUser;
  const uid = user.uid;

   const dbf = getFirestore();
   const docRef = doc(dbf, "users", uid);
   await updateDoc(docRef,{
    nome: this.nome,
    email: this.email,
    cpf: this.cpf,
    idade: this.idade,
    telefone: this.telefone,
    senha: this.senha
   });

   this.loading.dismiss(this.router.navigate(['/perfil']));
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







