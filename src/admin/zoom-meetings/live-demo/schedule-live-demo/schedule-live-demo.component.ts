import { Component, TemplateRef, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { AdminService } from 'src/admin/admin.service';
import { AddCourseToTeacher } from 'src/app/app.model';
import { AppService } from 'src/app/app.service';
import emailjs from '@emailjs/browser';

@Component({
  selector: 'app-schedule-live-demo',
  templateUrl: './schedule-live-demo.component.html',
  styleUrls: ['./schedule-live-demo.component.css']
})
export class ScheduleLiveDemoComponent {
  public data: any;
  public scheduleLiveDemoForm: FormGroup;
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
    })
  }
  ngOnInit(): void {
    this. scheduleLiveDemoForm.patchValue(this.data);
    this.getTeacherList();
    this.getLiveDemoList();
  }

  getTeacherList(){
    this.appService.getTeacher().subscribe((res:any)=>{
      this.teacherList = res;
    })
  }

  getLiveDemoList(){
    this.appService.getLiveDemoMeeting().subscribe((res:any)=>{
      this.liveDemoData = res;
      for(let data of this.liveDemoData){
        this.getJitsiUrl = data.jitsiUrl;
        console.log(this.getJitsiUrl);
        this.selectedJitsiUrl = this.getJitsiUrl;
        console.log(this.selectedJitsiUrl);
      }
    })
  }

  

  public scheduleLiveDemo(){
    // if(this.scheduleInterviewForm.valid){
    //   if(this.data){
    //     const editTeacherCourseData : AddCourseToTeacher ={
    //       tID: this.scheduleInterviewForm.controls['tID'].value,
    //       subject: this. scheduleInterviewForm.controls['subject'].value,
    //       course: this. scheduleInterviewForm.controls['course'].value,
    //       segment: this. scheduleInterviewForm.controls['segment'].value,
    //       subCourse: this. scheduleInterviewForm.controls['subCourse'].value,
    //     };
    //     this.editTeacherCourse(editTeacherCourseData)
    //   }else{
    //     const addTeacherCourseData : AddCourseToTeacher ={
    //       tID: this.scheduleInterviewForm.controls['tID'].value,
    //       subject: this. scheduleInterviewForm.controls['subject'].value,
    //       course: this. scheduleInterviewForm.controls['course'].value,
    //       segment: this. scheduleInterviewForm.controls['segment'].value,
    //       subCourse: this. scheduleInterviewForm.controls['subCourse'].value,
    //     };
    //     this.addTeacherCourse(addTeacherCourseData);
    //   }
    // }
    this.appService.addLiveDemoMeeting(this.scheduleLiveDemoForm.value).subscribe({
      next:(res)=>{
        console.log(res);
        this.success = true;
        this.err = false;
        this.successMsgDialog('Live Demo Added successfully');
        this.sendEmail();
      },
      error:(err)=>{
        this.success = false;
        this.err =  true;
        this.successMsgDialog(err.message);
      }
    })
  }

 async sendEmail(){
    emailjs.init('gEHM9lKBM_59tGXls');
    let response  = await emailjs.send("service_8sbjv1c","template_7o9i6tf",{
      from_name: "EdutechEx",
      name: this.scheduleLiveDemoForm.value.name,
      topic : this.scheduleLiveDemoForm.value.topic,
      duration: this.scheduleLiveDemoForm.value.duration,
      jitsiLink: this.selectedJitsiUrl,
      reply_to: "office@edutechex.com",
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
