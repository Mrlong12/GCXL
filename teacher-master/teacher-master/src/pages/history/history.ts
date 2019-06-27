import 'rxjs/add/operator/map';
import { Component } from '@angular/core';
import { NavController, NavParams, ToastController } from 'ionic-angular';
import {RedditData} from '../../providers/reddit-data';
import{GlobalStorage} from '../../providers/global-storage';
import {subscribeToResult} from "rxjs/util/subscribeToResult";
import{LocalStorage} from '../../providers/local-storage'

@Component({
  selector: 'page-history',
  templateUrl: 'history.html'
})
export class HistoryPage {


  result:any;
  token: String;
  courseList =[];
  courseTimeList = [];
  callOderList = [];
  callTherollList=[];
  courseId = '';
  courseTimeId ='';
  callOrder = '';

  constructor(public navCtrl: NavController, public navParams: NavParams,public CallData: RedditData,
              public toastCtrl: ToastController,
              private localStorage: LocalStorage, public globalStorage:GlobalStorage) {

    let loginUser:any = this.localStorage.get("loginUser", null);
    this.token = loginUser['token'];
    this.getCourseList();
    this.fullCallOderList(20);

  }

  fullCallOderList(l){

    for(var i=1; i<=l; i++){
      var co = {"key":"第"+i+"周", "value": i};
      this.callOderList.push(co);
    }

  }

  switchType() {
    console.log(this.courseId);
    this.callTherollList =[];
    this.CallData.getCourseTimeList(this.courseId).subscribe(
      result => {
        if (result.code == '0') {
          this.courseTimeList = result.data;
          console.log(this.courseTimeList);
          if(this.courseTimeId!=''&&this.callOrder!=''){
            this.getCallThreollList();
          }
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
        console.log('courseListSelect completed');
      }
    );

  }

  switchType2() {
    this.callTherollList =[];
    console.log(this.courseTimeId);
    if(this.courseTimeId!=''&&this.callOrder!=''){
      this.getCallThreollList();
    }
  }

  switchType3() {
    this.callTherollList =[];
    console.log(this.callOrder);
    if(this.courseTimeId!=''&&this.callOrder!=''){
      this.getCallThreollList();
    }
  }

  getCourseList(){
    this.CallData.getCourseList(this.token).subscribe(
      result => {

        if (result.code == '0') {

          this.courseList = result.data;
          console.log(this.courseList)
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
        console.log('courseListSelect completed');
      }
    );

  }


  getCallThreollList() {
    this.CallData.getCallTherollList(this.courseId, this.courseTimeId, this.callOrder).subscribe(
      result => {

        if (result.code == '0') {
          this.callTherollList = result.data;
          console.log(this.callTherollList)
        } else {
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
        console.log('courseListSelect completed');
      }
    );
  }

}

