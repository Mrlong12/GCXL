import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import 'rxjs/add/operator/map';

/*
 Generated class for the RedditData provider.

 See https://angular.io/docs/ts/latest/guide/dependency-injection.html
 for more info on providers and Angular 2 DI.
 */
@Injectable()
export class RedditData {

  hurl = 'http://119.27.178.12:8080';
  //hurl = 'http://localhost:8080';
  // hurl = 'http://119.29.60.141:8888';


  constructor(public http: Http) {
    console.log('Hello SignInData Provider');
  }

  getJsonData() {
    let url = this.hurl + '/shhTest/personnelaction/getAllPersonnelHql';
    return this.http.get(url).map(res => res.json());
  }

  postLogin(id, password) {
    // http://119.27.178.12:8080
    //let url = this.hurl + '/shhTest/personnelaction/CheckPersonnel?id=' + id + '&password=' + password;
    let url = this.hurl + '/xsdk_war/app/student/login?loginName='+id+'&password='+password;
    console.log(url);
    return this.http.get(url).map(res => res.json());
  }

  getCoursesById(id) {
    // let url = this.hurl + '/shhTest/personnelaction/getPersonnelByID?id=' + id;
    let url = this.hurl + '/xsdk_war/app/student/getCourseList?param='+id;
    return this.http.get(url).map(res => res.json());
  }

  getAllCoursesById(id) {
    // let url = this.hurl + '/shhTest/personnelaction/getPersonnelByID?id=' + id;
    let url = this.hurl + '/xsdk_war/app/student/getAllCourseList?userId='+id;
    console.log(url);
    return this.http.get(url).map(res => res.json());
  }


  getCourseByName(name) {
    let url = this.hurl + '/shhTest/courseaction/getCourseByName?coursename=' + name;
    return this.http.get(url).map(res => res.json());
  }

  createCallTheRoll(cn, cs, cd, id, cp) {
    let url = this.hurl + '/shhTest/calltherollaction/createCallTheRoll?coursename=' + cn + '&callstate=' + cs
      + '&calldate=' + cd + '&id=' + id + '&callposition=' + cp;
    console.log(url);
    return this.http.get(url).map(res => res.json());
  }

  getCallTheRollByID(id) {
    let url = this.hurl + '/shhTest/calltherollaction/getCallTheRollByIDHql?id=' + id;
    return this.http.get(url).map(res => res.json());
  }

  countCallTheRoll(id, cs, cn) {
    let url = this.hurl + '/shhTest/calltherollaction/countCallTheRoll?id=' + id + '&callstate=' + cs +
      '&coursename=' + cn;
    return this.http.get(url).map(res => res.json());
  }

  getQuestion(cn, id) {
    let url = this.hurl + '/shhTest/questionaction/getQuestionByCoursenameAndID?courseName=' + cn + '&id=' + id;
    return this.http.get(url).map(res => res.json());
  }
  getScore(uid){
    let url = this.hurl + '/xsdk_war/app/student/getScoreList?userId=' + uid;
    return this.http.get(url).map(res => res.json());
  }
  getRecordList(uid){
    let url = this.hurl + '/xsdk_war/app/student/getRecordList?userId=' + uid;
    return this.http.get(url).map(res => res.json());
  }
  updateCallTheRoll(cid,uid, cp, courseTimeId, cs) {
    // let url = this.hurl + '/shhTest/calltherollaction/updateCallTheRoll?calldate=1' + '&id=' + id + '&callposition=' + cp
    //   + '&coursename=' + cn + '&callstate=' + cs + '&autoid=0';
    let url = this.hurl + '/xsdk_war/app/student/signIn?cid='+cid+'&uid='+uid+'&callPosition='+cp+'&callState='+cs+'&courseTimeId='+courseTimeId;
    console.log(url);
    return this.http.get(url).map(res => res.json());
  }

  // getCourseByName(cn) {
  //   let url = this.hurl + '/shhTest/courseaction/getCourseByName?coursename=' + cn;
  //   return this.http.get(url).map(res => res.json());
  // }
}
