import 'rxjs/add/operator/map';
import { Component } from '@angular/core';
import { NavController, NavParams,ToastController } from 'ionic-angular';
import {RedditData} from '../../providers/reddit-data';
import{GlobalStorage} from '../../providers/global-storage';
import {subscribeToResult} from "rxjs/util/subscribeToResult";
import{LocalStorage} from '../../providers/local-storage'


@Component({
  selector: 'page-score',
  templateUrl: 'score.html'
})
export class ScorePage {
  due:boolean;
  due2:boolean;
  judge1:boolean;
  judge2:boolean;
  courseName: string;
  courseId : String;
  markId :String;
  no : String;
  name : String;
  result:any;
  // 本地数据
  ID:any;
  dailyScore:any;
  finalScore:any;
  courseList =[];
  markList =[];
  token:'';
  constructor(public navCtrl: NavController, public navParams: NavParams,public CallData: RedditData,
              public globalStorage:GlobalStorage,public toastCtrl:ToastController, private localStorage: LocalStorage) {

    let loginUser:any = this.localStorage.get("loginUser", null);
    this.token = loginUser['token'];
    this.getCourseList();
    this.due=true;

  }

  post(){
    this.CallData.editMark(this.markId,this.dailyScore,this.finalScore).subscribe(
      result=>{
       if(result.code=='0') {
        console.log("成功");
        let toast = this.toastCtrl.create({
          message: 'success',
          duration:3000
        });
        toast.present();
         this.due=true;
         this.switchType();

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
    )

  }

  switchType() {
    console.log(this.courseId);
    this.CallData.getMarkList(this.courseId, this.token).subscribe(
      result => {
        if (result.code == '0') {
          this.markList = result.data;
          console.log(this.markList)
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

  fresh(){
    if(this.due){
      this.CallData.freshMarkList(this.courseId).subscribe(
        result => {
          if (result.code == '0') {
            this.switchType();
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
          console.log('freshMarkList completed');
        }
      );


    }

  }


  edit(markId){
    this.markId =markId;
    this.due=false;
    this.CallData.getMark(this.markId).subscribe(
      result=>{
        this.courseName = result.data.courseName;
        this.name = result.data.name;
        this.no = result.data.no;
        this.markId=result.data.markId;
        this.dailyScore=result.data.dailyScore;
        this.finalScore=result.data.finalScore;
      }
    )

  }

  back(){

    this.due=true;

  }


}

