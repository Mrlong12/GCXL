import {Component} from '@angular/core';
import {LoadingController,NavController, NavParams} from 'ionic-angular';
import {GlobalStorage} from '../../providers/global-storage'
import {RedditData} from '../../providers/reddit-data'
import {InfoPage} from "../info/info";

@Component({
  selector: 'page-record',
  templateUrl: 'record.html'
})
export class RecordPage {
  // selectedItem: any;
  // icons: string[];
  // items: Array<{title: string, note: string, icon: string}>;
  calltherolls: any;
  // backimg:string;
  // items:Array<{img:string, cn:any, cs:any, cd:any}>;

  constructor(public loadingCtrl: LoadingController,public absentData: RedditData, public globalStorage: GlobalStorage, public navCtrl: NavController, public navParams: NavParams) {


    globalStorage.getStorage('stuId').then(res => {
      absentData.getCallTheRollByID(res).subscribe(result => {
        this.calltherolls = result.callTheRolls;
      })
    });

  }


  gotoInfo() {
    let loading = this.loadingCtrl.create({
      duration: 2500
    });
    loading.present();
    this.navCtrl.push(InfoPage);
  }
}
