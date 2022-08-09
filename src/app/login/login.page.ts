/* eslint-disable @typescript-eslint/quotes */
/* eslint-disable @typescript-eslint/semi */
/* eslint-disable no-trailing-spaces */
/* eslint-disable @angular-eslint/use-lifecycle-interface */
import { Component, OnInit } from '@angular/core';
import { Registro } from '../cadastro/models/registro';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { NavController, LoadingController, ToastController } from '@ionic/angular';
import { AngularFireAuth} from '@angular/fire/compat/auth';
import { getAuth, onAuthStateChanged } from "firebase/auth"

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})



export class LoginPage {
  public userLogin: Registro = {};
  public loading;


  constructor(
    public auth: AngularFireAuth,
    private loadingCtrl: LoadingController,
    private toastCtrl: ToastController,
    private router: Router,
    public authService: AuthService,
    ) {
   }

   ngOnInit() {
  }

async login(){
  await this.presentLoading();

  try {
    await this.authService.login(this.userLogin);
    this.loading.dismiss(this.router.navigate(['/perfil']));
  }
  catch(error) {
    let message: string;

    switch(error.code) {
      case 'auth/wrong-password':
        message = 'Senha/Email incorreto';
        break;

        case 'auth/invalid-email':
        message = 'Email inválido!';
        break;

        case 'auth/weak-password':
        message = 'A senha deve ter no mínimo 6 caracteres';
        break;

        case 'auth/network-request-failed':
        message = 'Falha na conexão';
        break;

        case 'auth/user-not-found':
          message = 'Usuario não encontrado'
          break;

          case 'auth/too-many-requests':
          message = 'Muitas tentativas de login. Por favor, tente novamente mais tarde'
          break;

          case 'auth/missing-email':
          message = 'Campo(s) vazio(s), preencha todos antes de efetuar o login'
          break;

          case 'auth/internal-error':
            message = 'Erro na autenticação, revise os dados inseridos nos campos e tente novamente'
            break;

    }


  this.presentToast(message);
  }
  finally {
    this.loading.dismiss();
  }


  }

    async presentLoading() {
      this.loading = await this.loadingCtrl.create({ message: 'Autenticando...'});
    return this.loading.present();

  }

  async presentToast(message: string) {
    const toast = await this.toastCtrl.create({ message, duration: 2000 });
    toast.present();

  }
}






