import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AngularFireAuth } from "angularfire2/auth";
import { auth } from "firebase/app";



@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  loginState = false;
  loginResponseData: any;
  dataLogin = {
    username: '',
    password: ''
  }
  constructor(public navCtrl: NavController, public afAuth: AngularFireAuth) {

  }
  ionViewDidLoad(){
    this.afAuth.authState.subscribe(loginData => {
      console.log(loginData);
      if(!loginData){
        alert('please login again!');
        this.loginResponseData =  null;
      }else{
        this.loginState = true;
        this.loginResponseData = {
          email: loginData.email,
          uid: loginData.uid
        }
      }
    });
  }
  Login() {
    if(this.dataLogin){
      const login = this.afAuth.auth.signInWithEmailAndPassword(this.dataLogin.username, this.dataLogin.password);
      login.then(data => {
        console.log('login ok ', data);
        this.loginState =  true;
        this.loginResponseData = { email: data.email, uid: data.uid };
      }).catch(err => {
        console.log('cannot login!');
      });
    }
  }
  Logout(){
    this.afAuth.auth.signOut();
    this.loginState = false;
  }

}
