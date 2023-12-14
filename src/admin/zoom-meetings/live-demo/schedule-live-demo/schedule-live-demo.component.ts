import { Component, TemplateRef, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { AdminService } from 'src/admin/admin.service';
import { AddCourseToTeacher } from 'src/app/app.model';
import { AppService } from 'src/app/app.service';
import emailjs, { EmailJSResponseStatus } from '@emailjs/browser';

@Component({
  selector: 'app-schedule-live-demo',
  templateUrl: './schedule-live-demo.component.html',
  styleUrls: ['./schedule-live-demo.component.css']
})
export class ScheduleLiveDemoComponent {
  public data: any;
  public scheduleLiveDemoForm:any = FormGroup;
  public success: boolean = false;
  public err: boolean = false;
  public TeacherCourseDataSource: MatTableDataSource<AddCourseToTeacher>;
  public StudentsData: any;
  public teacherList: any;
  public liveDemoData : any;
  @ViewChild('deleteTeacherConfirm') deleteAminConfirmDialog = {} as TemplateRef<any>;
  @ViewChild('successMsg') successDialog = {} as TemplateRef<any>;
  dialogRef: any;
  getJitsiUrl: any;
  selectedJitsiUrl: any;
  getSelectedMeetingUrl: any;
  selectedDemoId: any;
  getJitsiLiveUrl: any;
  selectedliveDemoID: any;

  constructor(
    public appService: AppService,
    public adminService: AdminService,
    public fb: FormBuilder,
    private dialog: MatDialog,
  ){
    this.TeacherCourseDataSource = new MatTableDataSource();
    //Add Courses to teacher form
    this.scheduleLiveDemoForm = this.fb.group({
      // topic: new FormControl('',[Validators.required]),
      // date: new FormControl('',[Validators.required]),
      // duration: new FormControl('', [Validators.required]),
      // // zoomAccount: new FormControl('', [Validators.required]),
      // candidate: new FormControl('', [Validators.required]),
      // name : new FormControl('', [Validators.required]),
      // tID: new FormControl('', [Validators.required]),
      // course:'',
      // coHost: new FormControl('', [Validators.required])

      topic : '',
      todayDate:'',
      duration:'',
      candidate:'',
      name:'',
      tID:'',
      course:'',
    });

    emailjs.init('gEHM9lKBM_59tGXls');
  }
  ngOnInit(): void {
    this.scheduleLiveDemoForm.patchValue(this.data);
    this.getTeacherList();
    this.LiveDemoList();
  }
  
  postData() {
    const selectedDate = this.scheduleLiveDemoForm.get('todayDate').value;

    // Add one day to the selected date
    const additionalDate = new Date(selectedDate);
    additionalDate.setDate(selectedDate.getDate() + 1);

    // Update the form control value with the additional date
    this.scheduleLiveDemoForm.get('todayDate').setValue(additionalDate);
  }

  getTeacherList(){
    this.appService.getTeacher().subscribe((res:any)=>{
      this.teacherList = res;
    })
  }

  LiveDemoList(){
    this.appService.getLiveDemoMeeting().subscribe((res:any)=>{
      console.log(res);
      for(let data of res){
        this.getJitsiLiveUrl = data.jitsiUrl;
        this.selectedDemoId = data.demoId;
        console.log(this.selectedDemoId);
        if(this.getSelectedMeetingUrl === this.selectedDemoId){
          this.selectedJitsiUrl = this.getJitsiLiveUrl;
        console.log(this.selectedJitsiUrl);
        }
      }
    })
  }

  

  public scheduleLiveDemo(){
    // this.getSelectedMeetingUrl = [];
    console.log(this.scheduleLiveDemoForm.value);
    this.postData();
    this.appService.addLiveDemoMeeting(this.scheduleLiveDemoForm.value).subscribe({
      next:(res)=>{
        console.log(res);
        this.LiveDemoList();
        this.getSelectedMeetingUrl = res.id;
        console.log(this.getSelectedMeetingUrl);
        this.success = true;
        this.err = false;
        this.successMsgDialog('Live Demo Added successfully');
        setTimeout(()=>{
          this.sendEmail();
        },5000)
        
      },
      error:(err)=>{
        this.success = false;
        this.err =  true;
        this.successMsgDialog(err.message);
      }
    })
  }

 async sendEmail(){
    emailjs.send("service_8sbjv1c","template_vb8cwdf",{
      from_name: "EdutechEx",
      name: this.scheduleLiveDemoForm.value.name,
      topic: this.scheduleLiveDemoForm.value.topic,
      todayDate: this.scheduleLiveDemoForm.value.todayDate,
      duration: this.scheduleLiveDemoForm.value.duration,
      jitsiUrl: this.selectedJitsiUrl,
      senderName: 'www.edutechex.com',
      candidate: this.scheduleLiveDemoForm.value.candidate,
      });
  }

  public successMsgDialog(msg: string) {
    this.appService.httpClientMsg = msg;
    const timeout = 2000;
    const dialogRef = this.dialog.open(this.successDialog, {
      width: 'auto',
    });
    dialogRef.afterOpened().subscribe((_) => {
      setTimeout(() => {
        dialogRef.close();
        this.adminService.openSection('liveDemo');
      }, timeout);
    });
  }
}
