import { Component, TemplateRef, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { AdminService } from 'src/admin/admin.service';
import { AddCourseToTeacher } from 'src/app/app.model';
import { AppService } from 'src/app/app.service';
import emailjs, { EmailJSResponseStatus } from '@emailjs/browser';

@Component({
  selector: 'app-schedule-counselling-session',
  templateUrl: './schedule-counselling-session.component.html',
  styleUrls: ['./schedule-counselling-session.component.css']
})
export class ScheduleCounsellingSessionComponent {
  public data: any;
  public scheduleCounsellingForm:any =  FormGroup;
  public success: boolean = false;
  public err: boolean = false;
  public TeacherCourseDataSource: MatTableDataSource<AddCourseToTeacher>;
  public StudentsData: any;
  public segmentList: any;
  public counsellorList: any;
  selectedId: any;
  selectedMeetingId: any;
  selectedJitsiUrl: any;
  SelectedJitsiUrlMeeting: any;
  @ViewChild('deleteTeacherConfirm') deleteAminConfirmDialog = {} as TemplateRef<any>;
  @ViewChild('successMsg') successDialog = {} as TemplateRef<any>;
  dialogRef: any;

  constructor(
    public appService: AppService,
    public adminService: AdminService,
    public fb: FormBuilder,
    private dialog: MatDialog,
  ){
    this.TeacherCourseDataSource = new MatTableDataSource();
    //Add Courses to teacher form
    this.scheduleCounsellingForm = this.fb.group({
      topic: new FormControl('', [Validators.required]),
      todayDate: new FormControl('', [Validators.required]),
      duration: new FormControl('', [Validators.required]),
      candidate: new FormControl('', [Validators.required]),
      name: new FormControl('', [Validators.required]),
      cID: '',
      sRcID: new FormControl('', [Validators.required]),
      segment: new FormControl('', [Validators.required]),
      grade: new FormControl('', [Validators.required]),
      curriculum: new FormControl('', [Validators.required]),
      qualification:'',
    });

    emailjs.init('gEHM9lKBM_59tGXls');
  }
  ngOnInit(): void {
    this.scheduleCounsellingForm.patchValue(this.data);
    this.getSegmentList();
    this.getCounsellorList();
    this.getCounsellingSessionList();
  }

  postData() {
    const selectedDate = this.scheduleCounsellingForm.get('todayDate').value;

    // Add one day to the selected date
    const additionalDate = new Date(selectedDate);
    additionalDate.setDate(selectedDate.getDate() + 1);

    // Update the form control value with the additional date
    this.scheduleCounsellingForm.get('todayDate').setValue(additionalDate);
  }

  getSegmentList(){
    this.appService.getSegments().subscribe((res:any)=>{
      this.segmentList = res;
    })
  }

  getCounsellorList(){
    this.appService.getCounselor().subscribe((res:any)=>{
      this.counsellorList = res;
    })
  }

  getCounsellingSessionList(){
    this.appService.getCounsellingSessionMeeting().subscribe((res:any)=>{
      for(let data of res){
        console.log(data);
        this.SelectedJitsiUrlMeeting = data.jitsiUrl;
        this.selectedId = data.id;
        if(this.selectedMeetingId === this.selectedId){
          this.selectedJitsiUrl = this.SelectedJitsiUrlMeeting;
          console.log(this.selectedJitsiUrl);
        }
      }
    })
  }

  public scheduleCounselling(){
    this.postData();
    this.appService.addCounsellingSessionMeeting(this.scheduleCounsellingForm.value).subscribe({
      next:(res)=>{
        this.getCounsellingSessionList();
        this.selectedMeetingId = res.id;
        console.log(this.selectedMeetingId);
        this.success = true;
        this.err = false;
        this.successMsgDialog("Counselling Session added successfully");
        setTimeout(()=>{
          this.sendEmail();
        },5000)
      },
      error:(err)=>{
        this.success = false;
        this.err = true;
        this.successMsgDialog(err.message);
      }
    })

  }

  async sendEmail(){
    emailjs.send("service_8sbjv1c","template_vb8cwdf",{
      from_name: "EdutechEx",
      name: this.scheduleCounsellingForm.value.name,
      topic: this.scheduleCounsellingForm.value.topic,
      todayDate: this.scheduleCounsellingForm.value.todayDate,
      duration: this.scheduleCounsellingForm.value.duration,
      jitsiUrl: this.selectedJitsiUrl,
      senderName: 'www.edutechex.com',
      candidate: this.scheduleCounsellingForm.value.candidate,
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
        this.adminService.openSection('counselingSession');
      }, timeout);
    });
  }
}
