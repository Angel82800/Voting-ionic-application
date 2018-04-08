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

  constructor(public navCtrl: NavController,
    public platform:Platform,
    public androidPermissions: AndroidPermissions) {
      console.log(this.result);
  }

  onClickStart(){
    this.star = true;
    this.result = [0,0,0,0,0];
    this.checkPermission();
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
      
    this.platform.ready().then((readySource) => {
        
      let filter = {
        box : 'inbox', // 'inbox' (default), 'sent', 'draft'
        indexFrom : 0, // start from index 0
        maxCount : 50, // count of SMS to return each time
      };
        
      if(SMS) SMS.listSMS(filter, (ListSms)=>{               
        this.messages=ListSms;
        this.messages.forEach(element => {
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
        });
        var val = Math.max.apply(Math,this.result);
        this.index = this.result.indexOf(val);
      },
          
      Error=>{
        alert(JSON.stringify(Error));
      });
            
    });
  }
}
