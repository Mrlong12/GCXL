import 'rxjs/add/operator/map';
import { Component } from '@angular/core';
import { NavController, NavParams, ToastController } from 'ionic-angular';
import {RedditData} from '../../providers/reddit-data';
import{GlobalStorage} from '../../providers/global-storage';
import{LocalStorage} from '../../providers/local-storage';
@Component({
  selector: 'page-count',
  templateUrl: 'count.html'
})
export class CountPage {
  due:boolean;
  judge1:boolean;
  judge2:boolean;
  result:any;
  countList =[];
  token ='';
  constructor(public navCtrl: NavController, public navParams: NavParams,public CallData: RedditData,
              public globalStorage:GlobalStorage, public toastCtrl:ToastController,private localStorage: LocalStorage) {

    let loginUser:any = this.localStorage.get("loginUser", null);
    this.token = loginUser['token'];
    this.getCallTherollCount();
  }

  getCallTherollCount(){

    this.CallData.getCallTherollCount(this.token).subscribe(
      result => {

        if (result.code == '0') {

          this.countList = result.data;
          console.log(this.countList)
        }else {
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

      }
    );
  }



 search(courseId, courseTime){

    console.log(courseId);
    console.log(courseTime);
 }




}

