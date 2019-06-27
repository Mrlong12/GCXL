import {Component, ViewChild} from '@angular/core';
import {Nav, Platform} from 'ionic-angular';
import {StatusBar} from '@ionic-native/status-bar';

import {SplashScreen} from '@ionic-native/splash-screen';
import{GlobalStorage} from '../providers/global-storage';
import{LocalStorage} from '../providers/local-storage';
import {HomePage} from '../pages/home/home';
import {ListPage} from '../pages/list/list';
import {CallRollPage} from '../pages/callroll/callroll';
import {LoginPage} from '../pages/login/login'
import {HistoryPage} from '../pages/history/history'
import {CoursePage} from '../pages/course/course'
import {ScorePage} from '../pages/score/score'
import {PersonPage} from '../pages/person/person'
import {ClassPage} from '../pages/class/class'
import {CountPage} from '../pages/count/count'
import {SigninPage} from '../pages/signin/signin'
import {LogoutPage} from '../pages/logout/logout';
import { RedditData } from '../providers/reddit-data';


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

 rootPage: any = LoginPage;
 // rootPage: any =PositionPage;
  //rootPage:any=HomePage;
  pages: Array<{title: string, component: any, icon: string}>;
  userName: String;
  userId:any;
  constructor(public personData:RedditData, private globalStorage: GlobalStorage, private localStore: LocalStorage,
              public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen) {
    this.initializeApp();

    let loginUser:any = this.localStore.get("loginUser", null);
    if(loginUser!=null){
      this.rootPage = HomePage;
      this.userName = loginUser['userName'];
    }else{
      this.rootPage = LoginPage;
    }


    // used for an example of ngFor and navigation
    this.pages = [
      { title: '首页', component: HomePage, icon: 'paintbucket' },
      { title: '签到设置', component: SigninPage, icon: 'chatboxes' },
      { title: '课程查询', component: CoursePage, icon: 'create' },
      { title: '成绩管理', component: ScorePage, icon: 'git-merge' },
      {title:'学生信息',component:PersonPage, icon: 'create'},
      {title:'班级信息',component:ClassPage,icon: 'git-merge'},
      { title: '考勤历史', component: HistoryPage, icon: 'cash' },
      {title:'考勤统计',component:CountPage,icon: 'cash' },
     //{ title: '设置', component: CallRollPage, icon: 'chatboxes' },
      {title: '退出', component: LogoutPage, icon: 'paintbucket'}
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
