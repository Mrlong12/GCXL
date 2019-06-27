import 'rxjs/add/operator/map';
import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {RedditData} from '../../providers/reddit-data';
import{GlobalStorage} from '../../providers/global-storage';
@Component({
  selector: 'page-callroll',
  templateUrl: 'callroll.html'
})
export class CallRollPage {
  coursename: string;
  id: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public CallData: RedditData, public globalStorage: GlobalStorage) {
    this.globalStorage.getStorage('stuId').then((res) => {
      this.id = res;
      console.log(this.id);
    });
    this.globalStorage.getStorage('coursename').then((res) => {
      this.coursename = res;

      console.log(this.coursename);
    });
  }

  find() {

  }
}

