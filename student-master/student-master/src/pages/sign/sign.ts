import {Component} from '@angular/core';

import {LoadingController, ToastController, NavController} from 'ionic-angular';
import {GlobalStorage} from '../../providers/global-storage'
import {RedditData} from '../../providers/reddit-data'
import {HomePage} from "../home/home";

@Component({
  selector: 'page-sign',
  templateUrl: 'sign.html'
})

export class SignPage {

  c: any;
  site: string[];
  row: any;
  col: any;
  rows: number[];
  cols: number[];
  cid:string;
  uid:string;
  pai: string;
  lie: string;


  constructor(public toastCtrl: ToastController, public navCtrl: NavController,
              public loadingCtrl: LoadingController, public courseData: RedditData, public globalStorage: GlobalStorage) {
    globalStorage.getStorage('userId').then(res=>{
      this.uid = res.toString();
    });
    globalStorage.getStorage('courseName').then(res => {
      this.c = res.course_name;
      this.site = res.class_shape.split('*');
      this.row = this.site[0];
      this.col = this.site[1];
      console.log('sign page row ' + this.row);
      console.log('sign page col ' + this.col);
      this.cols = [];
      this.rows = [];
      for (let i = 1; i <= this.col; i++) {
        this.cols.push(i);
      }
      for (let i = 1; i <= this.row; i++) {
        this.rows.push(i);
      }
      console.log('sign page ' + res);
    });



  }

  sign() {
    let loading = this.loadingCtrl.create({
      duration: 1000
    });
    let w = this.pai + '*' + this.lie;
    this.globalStorage.getStorage('courseName').then(res => {
      this.courseData.updateCallTheRoll(res.course_id, this.uid, w, res.course_time_id, 1).subscribe(r => {
        console.log(r.state);
        if(r.state == '0') {
          let toast = this.toastCtrl.create({
            message: '签到成功',
            duration: 1000,
            position: 'bottom',
          });
          toast.present();
          loading.present();
        }
        else {
          let toast = this.toastCtrl.create({
            message: '签到成功',
            duration: 1000,
            position: 'middle',
          });
          toast.present();
          loading.present();
          this.navCtrl.setRoot(HomePage);
        }
      });
      // console.log('sign page final' + this.c + ' ' + res + ' ' + w);
    });



  }
}
