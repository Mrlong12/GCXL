import 'rxjs/add/operator/map';
import { Component } from '@angular/core';
import { NavController, NavParams, ToastController } from 'ionic-angular';
import {RedditData} from '../../providers/reddit-data';
import{GlobalStorage} from '../../providers/global-storage';
import{LocalStorage} from '../../providers/local-storage';


@Component({
  selector: 'page-person',
  templateUrl: 'person.html'
})
export class PersonPage {
  token: String;
  courseList =[];
  courseTimeList = [];
  courseId = '';
  courseClassNo ='';
  studentList = [];
  courseClassNoList = [];
  constructor(public navCtrl: NavController, public navParams: NavParams,public CallData: RedditData,
              public toastCtrl:ToastController,private localStorage: LocalStorage, public globalStorage:GlobalStorage) {

    let loginUser:any = this.localStorage.get("loginUser", null);
    this.token = loginUser['token'];
    this.getCourseList();
    this.fullCourseClassNoList(1);
  }

  switchType() {
    console.log(this.courseId);
    this.studentList =[];
    if(this.courseId==''){
      return;
    }
    this.getStudentList();

  }

  switchType2() {
    this.studentList =[];
    console.log(this.courseClassNo);
    if(this.courseId==''){
      return;
    }
    this.getStudentList();
  }

  fullCourseClassNoList(l){

    for(var i=1; i<=l; i++){
      var ccn = {"key":"("+i+")班", "value": i};
      this.courseClassNoList.push(ccn);
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


  getStudentList() {
    this.CallData.getStudentList(this.courseId, this.courseClassNo).subscribe(
      result => {

        if (result.code == '0') {
          this.studentList = result.data;
          console.log(this.studentList)
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

  look(stuId){

    console.log(stuId);

  }


}

