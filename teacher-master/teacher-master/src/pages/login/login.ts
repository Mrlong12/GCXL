import {Component} from '@angular/core';
import {AlertController, App, LoadingController, NavController, IonicPage, ToastController} from 'ionic-angular';
import {HomePage} from "../home/home";
import {RedditData} from '../../providers/reddit-data';
import{GlobalStorage} from '../../providers/global-storage'
import{LocalStorage} from '../../providers/local-storage'

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: './login.html',
})
export class LoginPage {
  user = {
    name: '',
    pwd: ''
  };

  loginUser = {
    userId:'',
    userName:"",
    name: "",
    token:""
  };

  isPass = '';
  stuInf: any;
  userName = '';
  userId='';
  token ='';
  name ='';
  public loginForm: any;

  constructor(private localStore: LocalStorage, public loginData: RedditData, public toastCtrl: ToastController, private navCtrl: NavController,
              public loadingCtrl: LoadingController, public alertCtrl: AlertController, public app: App) {
  }

  login() {
    let loading = this.loadingCtrl.create({
      duration: 1000
    });

    this.loginData.login(this.user.name, this.user.pwd).subscribe(
      result => {
        console.log(result);
        this.isPass = result.code;

        if (this.isPass == '0') {
          console.log('setRoot stage');
          loading.present();

          this.loginUser.userId = result.data.userId;
          this.loginUser.userName = result.data.userName;
          this.loginUser.token = result.data.token;
          this.loginUser.name = result.data.name;

          this.localStore.set('loginUser', this.loginUser);
          this.navCtrl.setRoot(HomePage);

        }
        else {
          let errmsg = result.errmsg;
          let toast = this.toastCtrl.create({
            message: errmsg,
            duration: 2000,
            position: 'middle',
            showCloseButton: true,
            closeButtonText: 'ClOSE'
          });
          toast.present();
        }
      },
      err => {
        console.error("Error : " + err);
      },
      () => {
        console.log('postLogin completed');
      }
    );

  }

}
