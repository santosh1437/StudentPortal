import { AfterViewInit, ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { VideoRecordingService } from './video-recording.service';

type RecordingState = 'NONE' | 'RECORDING' | 'RECORDED';

declare var JitsiMeetExternalAPI: any;

@Component({
  selector: 'app-zoom-meetings',
  templateUrl: './zoom-meetings.component.html',
  styleUrls: ['./zoom-meetings.component.css']
})
export class ZoomMeetingsComponent implements OnInit, AfterViewInit {

    @ViewChild('videoElement') videoElement: any;
    title = 'record-rtc-screen-demo';
    videoBlobUrl: any = null;
    video: any;
    state: RecordingState = 'NONE';
  
    constructor(
      private videoRecordingService: VideoRecordingService,
      private ref: ChangeDetectorRef,
      private sanitizer: DomSanitizer
    ) {
      this.videoRecordingService.getMediaStream().subscribe((data) => {
        this.video.srcObject = data;
        this.ref.detectChanges();
      });
      this.videoRecordingService.getBlob().subscribe((data) => {
        this.videoBlobUrl = this.sanitizer.bypassSecurityTrustUrl(data);
        this.video.srcObject = null;
        this.ref.detectChanges();
      });
    }
    ngOnInit(): void {
        
    }
  
    ngAfterViewInit(): void {
      //Called after ngAfterContentInit when the component's view has been initialized. Applies to components only.
      //Add 'implements AfterViewInit' to the class.
      this.video = this.videoElement.nativeElement;
    }
  
    startRecording() {
      this.videoRecordingService.startRecording();
      this.state = 'RECORDING';
    }
  
    stopRecording() {
      this.videoRecordingService.stopRecording();
      this.state = 'RECORDED';
    }
  
    downloadRecording() {
      this.videoRecordingService.downloadRecording();
    }
  
    clearRecording() {
      this.videoRecordingService.clearRecording();
      this.video.srcObject = null;
      this.videoBlobUrl = null;
      this.state = 'NONE';
    }
  
}
