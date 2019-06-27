import {Component, ViewChild} from '@angular/core';
import {Nav, Platform} from 'ionic-angular';
import {StatusBar} from '@ionic-native/status-bar';
import {SplashScreen} from '@ionic-native/splash-screen';


import {HomePage} from '../pages/home/home';
import {RecordPage} from '../pages/record/record';
import {LoginPage} from '../pages/login/login'
import {RedditData} from '../providers/reddit-data';
import{GlobalStorage} from '../providers/global-storage'
import{InfoPage} from '../pages/info/info'
import {ScorePage} from '../pages/score/score'
import {PositionPage} from "../pages/position/position";
import {SchedulePage} from "../pages/schedule/schedule";

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = LoginPage;//LoginPage

  pages: Array<{title: string, component: any, icon: string}>;

  // Name: any;
  // Id: any;


  constructor(private globalStorage: GlobalStorage, private personData: RedditData,
              public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen) {
    this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = [
      {title: '首页', component: HomePage, icon: 'paintbucket'},
      {title: '课程表', component: SchedulePage, icon: 'paintbucket'},
      {title: '考勤记录', component: InfoPage, icon: 'paintbucket'},
      {title: '学科成绩', component: ScorePage, icon: 'paintbucket'},
      {title: '退出登录', component: LoginPage, icon: 'paintbucket'}
    ];

  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }


}
