import 'rxjs/add/operator/map';
import { Component } from '@angular/core';
import { NavController, NavParams,AlertController,ToastController } from 'ionic-angular';
import {RedditData} from '../../providers/reddit-data';
import{GlobalStorage} from '../../providers/global-storage';
import{LocalStorage} from '../../providers/local-storage'


@Component({
  selector: 'page-signin',
  templateUrl: 'signin.html'
})
export class SigninPage {
  score: any;
  testRadioOpen: boolean;
  testRadioResult;
  due: boolean;
  due2: boolean;
  judge1: boolean;
  judge2: boolean;
  coursename: string;
  id: any;
  bcalldate: any;
  acalldate: any;
  ccalldate: any;
  result: any;
  result2: any;
  callposition: any;
  call1 = [];
  call2 = [];
  pname = [];
  hang: any;
  lie: any;
  position: any;
  hangT = [];
  lieT = [];
  token: String;
  courseList =[];
  courseTimeList = [];
  callOderList = [];
  callTherollList=[];
  courseId = '';
  courseTimeId ='';
  callOrder = '';
  classShape = '';
  isShowPosition = true;
  isShowPositonGrid = false;
  now = new Date();

  constructor(public toastCtrl: ToastController, public alerCtrl: AlertController,  private localStorage: LocalStorage,
              public navCtrl: NavController, public navParams: NavParams, public CallData: RedditData, public globalStorage: GlobalStorage) {

     let loginUser:any = this.localStorage.get("loginUser", null);
     this.token = loginUser['token'];
     this.due = true;
     this.getCourseList();
     this.fullCallOderList(20);
  }

  fullCallOderList(l){

    for(var i=1; i<=l; i++){
      var co = {"key":"第"+i+"周", "value": i};
      this.callOderList.push(co);
    }

  }

  switchType() {
    console.log(this.courseId);
    this.callTherollList =[];
    this.CallData.getCourseTimeList(this.courseId).subscribe(
      result => {
        if (result.code == '0') {
          this.courseTimeList = result.data;
          console.log(this.courseTimeList);
          if(this.courseTimeId!=''&&this.callOrder!=''){
            this.getCallThreollList();
          }
        }else {
          let errmsg = result.errmsg;
          let toast = this.toastCtrl.create({
            message: errmsg,
            duration: 2000,
            position: 'middle',
            showCloseButton: true,
            closeButtonText: 'ClOSE'
          });
          toast.present();
        }
      },
      err => {
        console.error("Error : " + err);
      },
      () => {
        console.log('courseListSelect completed');
      }
    );

  }

  switchType2() {
    this.callTherollList =[];
    console.log(this.courseTimeId);
    if(this.courseTimeId!=''&&this.callOrder!=''){
      this.getCallThreollList();
    }
  }

  switchType3() {
    this.callTherollList =[];
    console.log(this.callOrder);
    if(this.courseTimeId!=''&&this.callOrder!=''){
      this.getCallThreollList();
    }
  }

  getCourseList(){
    this.CallData.getCourseList(this.token).subscribe(
      result => {

        if (result.code == '0') {

          this.courseList = result.data;
          console.log(this.courseList)
        }else {
          let errmsg = result.errmsg;
          let toast = this.toastCtrl.create({
            message: errmsg,
            duration: 2000,
            position: 'middle',
            showCloseButton: true,
            closeButtonText: 'ClOSE'
          });
          toast.present();
        }
      },
      err => {
        console.error("Error : " + err);
      },
      () => {
        console.log('courseListSelect completed');
      }
    );

  }


  getCallThreollList() {
    this.closePosition();
    this.CallData.getCallTherollList(this.courseId, this.courseTimeId, this.callOrder).subscribe(
      result => {

        if (result.code == '0') {
          this.callTherollList = result.data;
          console.log(this.callTherollList)
        } else {
          let errmsg = result.errmsg;
          let toast = this.toastCtrl.create({
            message: errmsg,
            duration: 2000,
            position: 'middle',
            showCloseButton: true,
            closeButtonText: 'ClOSE'
          });
          toast.present();
        }
      },
      err => {
        console.error("Error : " + err);
      },
      () => {
        console.log('courseListSelect completed');
      }
    );
  }


  createSignin() {

    if(this.courseId==''||this.courseTimeId==''||this.callOrder==''){
      let toast = this.toastCtrl.create({
        message: "请选择完整的签到信息",
        duration: 2000,
        position: 'middle',
        showCloseButton: true,
        closeButtonText: 'ClOSE'
      });
      toast.present();
    }

    if(this.callTherollList.length>0){
      this.signinConfirm();
    }else {
      this.signin();
    }

  }

  signin(){
    this.CallData.createSignin(this.courseId, this.courseTimeId, this.callOrder).subscribe(
      result => {

        if (result.code == '0') {

          this.getCallThreollList();
        } else {
          let errmsg = result.errmsg;
          let toast = this.toastCtrl.create({
            message: errmsg,
            duration: 2000,
            position: 'middle',
            showCloseButton: true,
            closeButtonText: 'ClOSE'
          });
          toast.present();
        }
      },
      err => {
        console.error("Error : " + err);
      },
      () => {
        console.log('courseListSelect completed');
      }
    );
  }


  signinConfirm(){
    let alert = this.alerCtrl.create();
    alert.setTitle('开始签到');
    alert.setMessage("当前已经生成签到表了，是否继续签到？");

    alert.addButton({
      text:'取消'
    });
    alert.addButton({
      text: '确认',
      handler: data => {
        this.signin();
      }
    });

    alert.present();
  }


  openPosition(){
    this.isShowPosition = false;
    this.isShowPositonGrid = true;
    this.createPositons();

  }

  closePosition(){
    this.isShowPosition = true;
    this.isShowPositonGrid = false;
  }

  createPositons() {
    var classShape = '0*0';
    this.call1 = [];
    this.call2 = [];
    for(var i=0;i<this.courseTimeList.length; i++){
      if(this.courseTimeId==this.courseTimeList[i].courseTimeId){
        classShape = this.courseTimeList[i].classShape;
      }
    }
    console.log(classShape);

    this.bcalldate = "" + this.now.getFullYear() + "-" + (this.now.getMonth() + 1) + "-" + this.now.getDate();
    this.acalldate = this.bcalldate;
    this.ccalldate = this.bcalldate;

    var temp = [];
    var name = [];
    var no = [];
    var callTherollId = [];
    var major =[];
    var classNo =[];
    var callState = [];
    this.classShape = classShape;
    this.hang = parseInt(this.classShape.split("*")[0]);
    this.lie = parseInt(this.classShape.split("*")[1]);


    for(var i=0;i<this.callTherollList.length; i++){
        console.log(this.callTherollList[i].callPosition);
        if(this.callTherollList[i].callPosition!="0*0") {
          temp.push(this.callTherollList[i].callPosition);
          name.push(this.callTherollList[i].name);
          no.push(this.callTherollList[i].no);
          callTherollId.push(this.callTherollList[i].callTherollId);
          major.push(this.callTherollList[i].major);
          classNo.push(this.callTherollList[i].classNoStr);
          callState.push(this.callTherollList[i].callState);
        }
    }

    for (var i = 0; i < temp.length; i++) {

      this.call1[i] = parseInt(temp[i].split("*")[0]);
      this.call2[i] = parseInt(temp[i].split("*")[1]);
      console.log(this.call1[i]);
      console.log(this.call2[i]);
    }

    console.log(this.hang);
    console.log(this.lie);
    for (var j = 0; j < this.hang; j++) {
      this.hangT[j] = j;
    }
    for (var x = 0; x < this.lie; x++) {
      this.lieT[x] = x;
    }
    console.log(this.hangT);
    console.log(this.lieT);
    var state = [this.hang];


    var n = this.hang, m = this.lie;
    var hhh = new Array();
    for (var i = 0; i < n; i++) {
      hhh[i] = new Array();
      for (var j = 0; j < m; j++) {
        hhh[i][j] = new Array();
        hhh[i][j][0] = "";
        hhh[i][j][1] = 0;
        hhh[i][j][2] = 0;
        hhh[i][j][3] = '';
        hhh[i][j][4] = '';
        hhh[i][j][5]= '';
        hhh[i][j][6]= '';
      }
    }

    for (var i = 0; i < this.call1.length; i++) {
      hhh[this.call1[i] - 1][this.call2[i] - 1][0] = name[i];
      hhh[this.call1[i] - 1][this.call2[i] - 1][1] = 1;
      hhh[this.call1[i] - 1][this.call2[i] - 1][2] = no[i];
      hhh[this.call1[i] - 1][this.call2[i] - 1][3] = callTherollId[i];
      hhh[this.call1[i] - 1][this.call2[i] - 1][4] = major[i];
      hhh[this.call1[i] - 1][this.call2[i] - 1][5] = classNo[i];
      hhh[this.call1[i] - 1][this.call2[i] - 1][6] = callState[i];
    }
    this.position = hhh;

  }

look(j, i){

  let alert = this.alerCtrl.create();

  alert.setTitle('个人信息');
  alert.setMessage("<div>学号："+this.position[j-1][i-1][2]+"</div>" +
    "<div>姓名："+this.position[j-1][i-1][0] +"</div>"+
    "<div>专业："+this.position[j-1][i-1][4]+"</div>"+
    "<div>班级："+this.position[j-1][i-1][5]+"</div>");


  alert.addInput({
      type: 'radio',
      label: '旷课',
      value: '0'});
  alert.addInput({
    type: 'radio',
    label: '请假',
    value: '2' });

  alert.addButton('关闭');
  alert.addButton({
    text: '确定',
    handler: data => {
      let callTherollId = this.position[j-1][i-1][3];
      console.log('Radio data:', data);
      let callState =  data;
      this. CallData.setSigninState(callTherollId, callState).subscribe(
        result => {

          if (result.code == '0'){
            this.getCallThreollList();
            this.isShowPosition = false;
            this.isShowPositonGrid = true;
            this.position[j-1][i-1][1]=0;

          } else {
            let errmsg = result.errmsg;
            let toast = this.toastCtrl.create({
              message: errmsg,
              duration: 2000,
              position: 'middle',
              showCloseButton: true,
              closeButtonText: 'ClOSE'
            });
            toast.present();
          }
        },
        err => {
          console.error("Error : " + err);
        },
        () => {
          console.log('courseListSelect completed');
        }
      );


    }
  });
  alert.present();

}









































}

