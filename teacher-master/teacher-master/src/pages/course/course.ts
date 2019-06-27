import 'rxjs/add/operator/map';
import { Component } from '@angular/core';
import { NavController, NavParams,ToastController  } from 'ionic-angular';
import {RedditData} from '../../providers/reddit-data';
import{GlobalStorage} from '../../providers/global-storage';
import{LocalStorage} from '../../providers/local-storage'


@Component({
  selector: 'page-course',
  templateUrl: 'course.html'
})
export class CoursePage {
  due:boolean;
  courseList = [];
  dailyWeight:any;
  finalWeight=1-this.dailyWeight;
  picketLine:any;
  classDate:any;
  classOrder:any;
  token : String;
  courseId :String;
  courseName: String;
  courseNo : String;
  constructor(public navCtrl: NavController, private localStorage: LocalStorage,
              public navParams: NavParams,public CallData: RedditData,public globalStorage:GlobalStorage,public toastCtrl:ToastController) {

    let loginUser:any = this.localStorage.get("loginUser", null);
    this.token = loginUser['token'];
    this.getCourseList();
    this.due=true;



  }


  getCourseList(){
    console.log('1234');
    this.CallData.getCourseList(this.token).subscribe(
      result => {
        console.log(result);
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

 post(){
    this.finalWeight=1-this.dailyWeight;
    console.log('q23r');
    this.CallData.editCourse(this.courseId,this.courseName,
      this.dailyWeight,this.finalWeight,this.picketLine,this.classDate,this.classOrder).subscribe(
      result=>{
        console.log("成功");
        let toast = this.toastCtrl.create({
         // message: '期末权重为：'+this.finalWeight,
          duration:3000
        });
        console.log('aefa');
        toast.present();
        this.getCourseList();
        this.due=true;
      }
    )

  }


  edit(courseId){
    this.courseId =courseId;
    this.due=false;
    this.CallData.getCourse(this.courseId).subscribe(
      result => {
        console.log(result);
        if (result.code == "0") {
          this.courseName = result.data.courseName;
          this.courseNo = result.data.courseNo;
          this.dailyWeight = result.data.dailyWeight;
          this.finalWeight = result.data.finalWeight;
          this.picketLine = result.data.picketLine;
          this.classDate = result.data.classDate;

          this.classOrder = result.data.classOrder;
        }else {
          console.log(result);
        }
      }

    );

  }

  back(){

    this.due=true;

  }


}

