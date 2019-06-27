import {Component} from '@angular/core';
import {NavController, ToastController} from 'ionic-angular';
import {PositionPage} from "../position/position";
import{GlobalStorage} from '../../providers/global-storage'
import {RedditData} from '../../providers/reddit-data'

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  name: any;
  id: any;

  courses: any;
  public backgroundImage = "assets/img/background/pure.jpg";
  // record:Array<{c:string,k:string}>;

  constructor(public toastCtrl: ToastController, private stuData: RedditData, private globalStorage: GlobalStorage, public navCtrl: NavController) {
    this.name = globalStorage.getStorage('userName');
    globalStorage.getStorage('userId').then((res) => {
      // this.stuInf = res;

      console.log('home page ' + res);

      stuData.getCoursesById(res).subscribe(
        result => {
          console.log(result);
          this.courses = result.data;
          if (this.courses.length==0){
            this.courses=0;
          }
          // for(let item of result.marks) {
          //   this.courses.push(item);
          // }
          // for(let i of result.marks){
          // console.log('home page 2' + i.cnameAndID.courseName);
          // }
          // this.record = [];
          // for (let item of this.courses) {
          //   stuData.countCallTheRoll(res, 3, item.cnameAndID.courseName).subscribe(r2 => {
          //     // this.record.push({c:item,k: r2.countnum});
          //     stuData.getCourseByName(item).subscribe(r3 => {
          //       console.log('home page r3 ' + r2.countnum);
          //       if (parseInt(r2.countnum) >= 2) {
          //         console.log('home page r2 ' + r2.countnum);
          //         let toast = this.toastCtrl.create({
          //           message: '课程：'+item.cnameAndID.courseName + '已旷课'+ r2.countnum +'次，超过该课程最大旷课数',
          //           duration: 4000,
          //           position: 'middle',
          //           showCloseButton: true,
          //           closeButtonText: 'OK'
          //         });
          //         toast.present();
          //       }
          //     });
          //   });
          // }
        }
      );
    });

  }
  refresh(){
    this.navCtrl.setRoot(HomePage);
  }
  courseSelected(event, course) {
    this.navCtrl.push(PositionPage, {
      item: course
    })
  }
}
