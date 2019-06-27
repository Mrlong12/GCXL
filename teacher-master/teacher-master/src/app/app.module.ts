import {BrowserModule} from '@angular/platform-browser';
import {ErrorHandler, NgModule} from '@angular/core';
import {IonicApp, IonicErrorHandler, IonicModule} from 'ionic-angular';
import { HttpModule } from '@angular/http';
import {IonicStorageModule} from '@ionic/storage'

import {MyApp} from './app.component';
import {HomePage} from '../pages/home/home';
import {ListPage} from '../pages/list/list';
import {CallRollPage} from '../pages/callroll/callroll';
import {LoginPage} from "../pages/login/login";
import {LogoutPage} from "../pages/logout/logout";
import {HistoryPage} from "../pages/history/history";
import {CoursePage} from "../pages/course/course";
import {ScorePage} from "../pages/score/score";
import {PersonPage} from "../pages/person/person";
import {ClassPage} from '../pages/class/class';
import {CountPage} from '../pages/count/count';
import {SigninPage} from "../pages/signin/signin";
import {StatusBar} from '@ionic-native/status-bar';
import {SplashScreen} from '@ionic-native/splash-screen';
import { RedditData} from '../providers/reddit-data';
import {GlobalStorage} from '../providers/global-storage'
import {LocalStorage} from '../providers/local-storage'

@NgModule({
  declarations: [
    MyApp,
    LoginPage,
    HomePage,
    ListPage,
    CallRollPage,
    SigninPage,
    ScorePage,
    HistoryPage,
    CoursePage,
    PersonPage,
    ClassPage,
    CountPage,
    LogoutPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpModule,
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    LoginPage,
    HomePage,
    ListPage,
    CallRollPage,
    SigninPage,
    HistoryPage,
    CoursePage,
    ScorePage,
    PersonPage,
    ClassPage,
    CountPage,
    LogoutPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    RedditData,
    LocalStorage,
    GlobalStorage
  ]
})
export class AppModule {
}
