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
  // const
 // hurl = ' http://localhost:8080';

//hurl = 'http://pandagp.cn:8888';
 hurl = 'http://119.27.178.12:8080';


  constructor(public http: Http) {
    console.log('Hello SignInData Provider');
  }

  login(loginName, password) {
    let url = this.hurl + '/xsdk_war/app/teacher/login?loginName=' + loginName + '&password=' + password;
    console.log(this.http.get(url).map(res => res.json()));
    //console.log(re);
    return this.http.get(url).map(res => res.json());
  }

  logout(token) {
    let url = this.hurl + '/xsdk_war/app/teacher/logout?token=' + token;
    return this.http.get(url).map(res => res.json());
  }

  getCourseList(token) {
    let url = this.hurl + '/xsdk_war/app/teacher/course_list?token=' + token;
    console.log(url);
    return this.http.get(url).map(res => res.json());
  }

  getPersonalCourseList(token) {
    let url = this.hurl + '/xsdk_war/app/teacher/personal_course_list?token=' + token;
    return this.http.get(url).map(res => res.json());
  }


  getMarkList(courseId, token) {
    let url = this.hurl + '/xsdk_war/app/teacher/mark_list?courseId=' + courseId + '&token=' + token;
    return this.http.get(url).map(res => res.json());
  }

  getMark(markId) {
    let url = this.hurl + '/xsdk_war/app/teacher/get_mark?markId=' + markId;
    return this.http.get(url).map(res => res.json());
  }

  editMark(markId, dailyScore, finalScore) {
    let url = this.hurl + '/xsdk_war/app/teacher/edit_mark?markId=' + markId + "&dailyScore=" + dailyScore + "&finalScore=" + finalScore;
    return this.http.get(url).map(res => res.json());
  }

  setSigninState(callTherollId, callState) {
    let url = this.hurl + '/xsdk_war/app/teacher/set_signin_state?callTherollId=' + callTherollId + "&callState=" + callState;
    return this.http.get(url).map(res => res.json());
  }

  freshMarkList(courseId) {
    let url = this.hurl + '/xsdk_war/app/teacher/fresh_mark_list?courseId=' + courseId;
    return this.http.get(url).map(res => res.json());
  }


  editCourse(courseId, courseName, dailyWeight, finalWeight, picketLine, classDate, classOrder) {
    let url = this.hurl + '/xsdk_war/app/teacher/edit_course?courseId=' + courseId +
      '&dailyWeight=' + dailyWeight + '&finalWeight=' + finalWeight + '&picketLine=' + picketLine + '&classDate=' + classDate +
      '&classOrder=' + classOrder;
    return this.http.get(url).map(res => res.json());
  }

  getCourse(courseId) {
    let url = this.hurl + '/xsdk_war/app/teacher/get_course?courseId=' + courseId;
    console.log(url);
    return this.http.get(url).map(res => res.json());
  }

  getCourseTimeList(courseId) {
    let url = this.hurl + '/xsdk_war/app/teacher/course_time_list?courseId=' + courseId;
    console.log(url);
    return this.http.get(url).map(res => res.json());
  }

  getCallTherollList(courseId, courseTimeId, callOrder) {
    let url = this.hurl + '/xsdk_war/app/teacher/call_theroll_list?courseId=' + courseId
      + "&courseTimeId=" + courseTimeId + "&callOrder=" + callOrder;
    return this.http.get(url).map(res => res.json());
  }

  createSignin(courseId, courseTimeId, callOrder) {
    let url = this.hurl + '/xsdk_war/app/teacher/create_signin?courseId=' + courseId
      + "&courseTimeId=" + courseTimeId + "&callOrder=" + callOrder;
    return this.http.get(url).map(res => res.json());
  }

  getCallTherollCount(token) {
    let url = this.hurl + '/xsdk_war/app/teacher/call_theroll_count?token=' + token;
    return this.http.get(url).map(res => res.json());
  }


  getStudentList(courseId, courseTimeId) {
    let url = this.hurl + '/xsdk_war/app/teacher/student_list?courseId=' + courseId
      + "&courseTimeId=" + courseTimeId;
    return this.http.get(url).map(res => res.json());
  }


}
