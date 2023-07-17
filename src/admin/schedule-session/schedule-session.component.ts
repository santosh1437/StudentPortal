import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { ZoomMtg } from '@zoomus/websdk';

ZoomMtg.preLoadWasm();
ZoomMtg.prepareWebSDK();

@Component({
  selector: 'app-schedule-session',
  templateUrl: './schedule-session.component.html',
  styleUrls: ['./schedule-session.component.css']
})
export class ScheduleSessionComponent {
//   signatureEndpoint = ''
//   apiKey = ''
//   meetingNumber = ''
//   role = 0
//   leaveUrl = 'http://localhost:4200'
//   userName = 'Angular'
//   userEmail = ''
//   passWord = ''

//   constructor(
//     private httpClient: HttpClient
//   ){}
//   getSignature() {

//     this.httpClient.post(this.signatureEndpoint, {
//        meetingNumber: this.meetingNumber,
//        role: this.role
//     }).toPromise().then((data: any) => {
//        if(data.signature) {
//           console.log(data.signature)
//           this.startMeeting(data.signature)
//        } else {
//           console.log(data)
//        }
//     }).catch((error) => {
//        console.log(error)
//     })
//  }

//  startMeeting(signature: any) {

//   ZoomMtg.init({
//      leaveUrl: this.leaveUrl,
//      isSupportAV: true,
//      success: (success: any) => {
//         console.log(success)

//         ZoomMtg.join({
//            signature: signature,
//            meetingNumber: this.meetingNumber,
//            userName: this.userName,
//           //  apiKey: this.apiKey,
//            userEmail: this.userEmail,
//            passWord: this.passWord,
//            success: (success: any) => {
//               console.log(success)
//            },
//            error: (error: any) => {
//               console.log(error)
//            }
//         })
//      },
//      error: (error: any) => {
//         console.log(error)
//      }
//   })

// }
}
