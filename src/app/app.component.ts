import { Component } from '@angular/core';
import { getAuth, signOut } from "firebase/auth";
import { Router } from '@angular/router';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {

  constructor(private router: Router) {}

signOut(){

const auth = getAuth();
signOut(auth).then(() => {
  
this.router.navigateByUrl("/home");

}).catch((error) => {


});

}

}
