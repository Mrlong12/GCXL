import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import {LoginPage} from "../login/login";
import{GlobalStorage} from '../../providers/global-storage'
import {RedditData} from '../../providers/reddit-data';
import{LocalStorage} from '../../providers/local-storage'
/**
 * Generated class for the LogoutPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-logout',
  templateUrl: 'logout.html',
})
export class LogoutPage {

  token :  String;

  constructor(public navCtrl: NavController, public redditData: RedditData, private localStorage: LocalStorage,
              public navParams: NavParams, private globalStorage: GlobalStorage) {


  this.logout();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LogoutPage');
  }

  logout(){


    let loginUser:any = this.localStorage.get("loginUser", null);
    if(loginUser){
      this.token = loginUser['token'];
    }

     this.redditData.logout(this.token).subscribe(
      result => {

      })
    this.localStorage.set('loginUser', null);
    this.navCtrl.setRoot(LoginPage);


  }


}
