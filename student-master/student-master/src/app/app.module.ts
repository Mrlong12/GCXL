import {BrowserModule} from '@angular/platform-browser';
import {ErrorHandler, NgModule} from '@angular/core';
import {IonicApp, IonicErrorHandler, IonicModule} from 'ionic-angular';
import { HttpModule } from '@angular/http';
import {IonicStorageModule} from '@ionic/storage'

import {MyApp} from './app.component';
import {HomePage} from '../pages/home/home';
import {RecordPage} from '../pages/record/record';
import {LoginPage} from "../pages/login/login";
import {SignPage} from '../pages/sign/sign';
import{InfoPage} from '../pages/info/info'
import {ScorePage} from '../pages/score/score'

import {StatusBar} from '@ionic-native/status-bar';
import {SplashScreen} from '@ionic-native/splash-screen';
import {PositionPage} from "../pages/position/position";
import { RedditData} from '../providers/reddit-data';
import {GlobalStorage} from '../providers/global-storage'
import {SchedulePage} from "../pages/schedule/schedule";



@NgModule({
  declarations: [
    MyApp,
    LoginPage,
    HomePage,
    RecordPage,
    PositionPage,
    SignPage,
    InfoPage,
    ScorePage,
    SchedulePage,
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
    RecordPage,
    PositionPage,
    SignPage,
    InfoPage,
    ScorePage,
    SchedulePage,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    RedditData,
    GlobalStorage
  ]
})
export class AppModule {
}
