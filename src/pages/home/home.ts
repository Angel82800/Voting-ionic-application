import { Component } from '@angular/core';
import { NavController, Platform } from 'ionic-angular';
import { AndroidPermissions } from '@ionic-native/android-permissions';
declare var SMS:any;
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})

export class HomePage {
  messages:any=[];
  result:number[] = [0,0,0,0,0];
  index:any = -1;

  star:boolean = false;
  show:boolean = false;
  startFlag:boolean = null;

  constructor(public navCtrl: NavController,
    public platform:Platform,
    public androidPermissions: AndroidPermissions) {
      console.log(this.result);
      this.show = false;
  }

  onClickStart(){
    this.star = true;
    this.startFlag = true;
    
    this.checkPermission();
  }

  onClickStop(){
    this.startFlag = false;
  }

  checkPermission()
  {
    this.androidPermissions.checkPermission(this.androidPermissions.PERMISSION.READ_SMS).then(
      success => {                
        //if permission granted
        this.ReadSMSList();
      },
      err =>{              
        this.androidPermissions.requestPermission(this.androidPermissions.PERMISSION.READ_SMS).
          then(success=>{
            this.ReadSMSList();
          },
          err=>{
            alert("cancelled");
          });
    });
          
    this.androidPermissions.requestPermissions([this.androidPermissions.PERMISSION.READ_SMS]);
        
  }

  ReadSMSList()
  {
    if(this.startFlag){
    this.platform.ready().then((readySource) => {
      this.result = [0,0,0,0,0];
      let filter = {
        box : 'inbox', // 'inbox' (default), 'sent', 'draft'
        indexFrom : 0, // start from index 0
        maxCount : 50, // count of SMS to return each time
      };
      var addressArr = [];
      if(SMS) SMS.listSMS(filter, (ListSms)=>{               
        this.messages=ListSms;
        
        this.messages.forEach(element => {
          if(addressArr.indexOf(element.address) == -1){
            addressArr.push(element.address);
            switch(element.body){
              case "1":
                this.result[0]+=1;
                break;
              case "2":
                this.result[1]+=1;
                break;
              case "3":
                this.result[2]+=1;
                break;
              case "4":
                this.result[3]+=1;
                break;
              case "5":
                this.result[4]+=1;
                break;
            }
          }          
        });
        var val = Math.max.apply(Math,this.result);
        this.index = this.result.indexOf(val);
      },
          
      Error=>{
        alert(JSON.stringify(Error));
      });
            
    });
  }
    setInterval(function(){
      if(this.startFlag){
        this.platform.ready().then((readySource) => {
          this.result = [0,0,0,0,0];
          let filter = {
            box : 'inbox', // 'inbox' (default), 'sent', 'draft'
            indexFrom : 0, // start from index 0
            maxCount : 50, // count of SMS to return each time
          };
          var addressArr = [];
          if(SMS) SMS.listSMS(filter, (ListSms)=>{               
            this.messages=ListSms;
            
            this.messages.forEach(element => {
              if(addressArr.indexOf(element.address) == -1){
                addressArr.push(element.address);
                switch(element.body){
                  case "1":
                    this.result[0]+=1;
                    break;
                  case "2":
                    this.result[1]+=1;
                    break;
                  case "3":
                    this.result[2]+=1;
                    break;
                  case "4":
                    this.result[3]+=1;
                    break;
                  case "5":
                    this.result[4]+=1;
                    break;
                }
              }          
            });
            var val = Math.max.apply(Math,this.result);
            this.index = this.result.indexOf(val);
          },
              
          Error=>{
            alert(JSON.stringify(Error));
          });
                
        });
      }
      
    },1500);
    
  }

  setFlag(){
    // this.show
  }
}
