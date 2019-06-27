import {Component} from '@angular/core';
import {NavController,ToastController} from 'ionic-angular';
import {SigninPage} from "../signin/signin";
import{GlobalStorage} from '../../providers/global-storage'
import {HistoryPage} from "../history/history";
import {RedditData} from '../../providers/reddit-data';
import{LocalStorage} from '../../providers/local-storage'
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  stuInf: any;
  public temp:string;
  courseList=[];
  name="老师";
  token ='';
  constructor(public toastCtrl:ToastController,private globalStorage: GlobalStorage,
              private localStore: LocalStorage, public navCtrl: NavController,public CallData: RedditData) {

    let loginUser:any = this.localStore.get("loginUser", null);
    this.name = loginUser['name']+this.name;
    this.token =  loginUser['token'];
    console.log(this.name)
    this.getPersonalCourse();
  }

  getPersonalCourse(){

    this.CallData.getPersonalCourseList(this.token).subscribe(
      result => {

        if (result.code == '0') {
           this.courseList = result.data;
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


  courseSelected(course) {
    // this.navCtrl.push(HomePage);
    let toast = this.toastCtrl.create({
     // message: '您已成功选择课程:'+course+'！请进入侧边栏选择功能',
      duration:3000
    });
    toast.present();
    this.temp=course;
    this.globalStorage.setStorage('coursename',this.temp);
  }


}
