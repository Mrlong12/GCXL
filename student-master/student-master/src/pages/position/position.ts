import {Component} from '@angular/core';

import {NavParams, NavController,LoadingController, ToastController} from 'ionic-angular';
import {RedditData} from '../../providers/reddit-data';
import {SignPage} from "../sign/sign";
import {GlobalStorage} from '../../providers/global-storage'

@Component({
  selector: 'page-position',
  templateUrl: 'position.html'
})
export class PositionPage {
  uid:string;
  w:string;
  homeItem: any;

  constructor(public toastCtrl: ToastController, public loadingCtrl: LoadingController,public globalStorage:GlobalStorage,
              public navCtrl: NavController, public navParams: NavParams, public redditService: RedditData) {


    this.homeItem = navParams.get('item');
    console.log(this.homeItem);
    globalStorage.setStorage('courseName', this.homeItem);

  }



  ionViewDidLoad() {

  }

  gotoSign() {

    this.navCtrl.push(SignPage);
  }

  askForLeave() {
    let loading = this.loadingCtrl.create({
      duration: 1000
    });
    this.globalStorage.getStorage('userId').then(res=>{
      this.uid = res.toString();
    });
    this.globalStorage.getStorage('courseName').then(res => {
        this.w="0*0";
      this.redditService.updateCallTheRoll(res.course_id, this.uid, this.w, res.course_time_id, 1).subscribe(r => {
        if(r.state == '0') {
          let toast = this.toastCtrl.create({
            message: '请假申请成功',
            duration: 1500,
            position: 'bottom',
          });
          toast.present();
          loading.present();
        }
        else {
          let toast = this.toastCtrl.create({
            message: '请假申请成功',
            duration: 1500,
            position: 'middle',
          });
          toast.present();
          loading.present();
        }
      });
    });

  }
}
