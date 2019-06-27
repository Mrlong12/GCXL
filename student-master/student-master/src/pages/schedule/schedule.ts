import { Component } from '@angular/core';
import {IonicPage, NavController, NavParams, ToastController} from 'ionic-angular';
import {RedditData} from "../../providers/reddit-data";
import {GlobalStorage} from "../../providers/global-storage";

/**
 * Generated class for the SchedulePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-schedule',
  templateUrl: 'schedule.html',
})
export class SchedulePage {
  name: any;
  id: any;

  courses: any;
  public backgroundImage = "assets/img/background/pure.jpg";
  constructor(public toastCtrl: ToastController, private stuData: RedditData, private globalStorage: GlobalStorage,public navCtrl: NavController, public navParams: NavParams) {
    this.name = globalStorage.getStorage('userName');
    globalStorage.getStorage('userId').then((res) => {
      // this.stuInf = res;

      console.log('home page ' + res);

      stuData.getAllCoursesById(res).subscribe(
        result => {
          console.log(result);
          this.courses = result.data;
        }
      );
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SchedulePage');
  }

}
