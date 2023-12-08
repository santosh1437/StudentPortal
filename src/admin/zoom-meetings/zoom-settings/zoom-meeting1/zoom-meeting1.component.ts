import { Component, OnInit } from '@angular/core';
import { ZoomMtg } from '@zoomus/websdk';
import * as CryptoJS from 'crypto-js';

@Component({
  selector: 'app-zoom-meeting1',
  templateUrl: './zoom-meeting1.component.html',
  styleUrls: ['./zoom-meeting1.component.css']
})
export class ZoomMeeting1Component implements OnInit {
ngOnInit(): void {
  
}
  async ngAfterContentInit():Promise<any>{
    const {ZoomMtg} = await import('@zoomus/websdk');

    ZoomMtg.setZoomJSLib('https://source.zoom.us/lib', '/av');
    ZoomMtg.preLoadWasm();
    ZoomMtg.prepareWebSDK();

    let payload = {
      meetingNumber:'95929744993',
      passWord:'8Q2mTr',
      sdkKey:'i0xqlH1BQn2NQ3oRd9gCeQ',
      sdkSecret:'jVa7Ma4ZyQU6epWINwWnsDDOJ77IS8i7',
      userName:'Test Metting',
      userEmail:'',
      role:'0',
      leaveUrl:'http://localhost:4200',

    };

    ZoomMtg.generateSDKSignature({
      meetingNumber:payload.meetingNumber,
      role:payload.role,
      sdkKey:payload.sdkKey,
      sdkSecret:payload.sdkSecret,
      success:function(signature:any){
        console.log(signature);
        // debugger
         ZoomMtg.init({
          leaveUrl:payload.leaveUrl,
          success:function(data:any){
            ZoomMtg.join({
              meetingNumber:payload.meetingNumber,
              passWord:payload.passWord,
              sdkKey:payload.sdkKey,
              userName:payload.userName,
              userEmail:payload.userEmail,
              signature:signature.result,
              tk:'',
              success:function(data:any){
                console.log(data);
                console.log(signature)
              },
              error:function(error:any){
                console.log('Error join --->',error);
                console.log(signature)
              }
            })
          },
          error:function(error:any){
            console.log('error iniy--->',error);
          }
        })
      },
      error:function(error:any){
        console.log(error);
      }

    })
  }
  
}
