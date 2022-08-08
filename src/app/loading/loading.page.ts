import { Component, OnInit } from '@angular/core';
import { NavController, LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-loading',
  templateUrl: './loading.page.html',
  styleUrls: ['./loading.page.scss'],
})
export class LoadingPage implements OnInit {

  constructor(private navCtrl: NavController, private loadingCtrl: LoadingController) { }

  public loading;

  ngOnInit() {

      this.loadingCtrl.create({
      }).then((overlay) => {
        this.loading = overlay;
      });
    
      setTimeout(() => {
    
        this.loading.dismiss();
        this.navCtrl.navigateRoot('/home')
      }, 4000);
  }

}
