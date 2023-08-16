import { Component, TemplateRef, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { AdminService } from 'src/admin/admin.service';
import { AddCourseToTeacher } from 'src/app/app.model';
import { AppService } from 'src/app/app.service';

@Component({
  selector: 'app-schedule-counselling-session',
  templateUrl: './schedule-counselling-session.component.html',
  styleUrls: ['./schedule-counselling-session.component.css']
})
export class ScheduleCounsellingSessionComponent {
  public data: any;
  public scheduleCounsellingForm: FormGroup;
  public success: boolean = false;
  public err: boolean = false;
  public TeacherCourseDataSource: MatTableDataSource<AddCourseToTeacher>;
  public StudentsData: any;
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
      date: new FormControl('',[Validators.required]),
      time: new FormControl('', [Validators.required]),
      zoomAccount: new FormControl('', [Validators.required]),
      studentMailID: new FormControl('', [Validators.required]),
      parentMailID: new FormControl('', [Validators.required]),
      hostMailID: new FormControl('', [Validators.required]),
      coHostMailID: new FormControl('', [Validators.required]),
      name: new FormControl('', [Validators.required]),
      counsellor: new FormControl('', [Validators.required]),
      srCounsellor: new FormControl('', [Validators.required]),
      segment: new FormControl('', [Validators.required]),
      grade: new FormControl('', [Validators.required]),
      curriculum: new FormControl('', [Validators.required]),
    })
  }
  ngOnInit(): void {
    this. scheduleCounsellingForm.patchValue(this.data);
  }

  public scheduleCounselling(){
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
        this.adminService.openSection('teachers');
      }, timeout);
    });
  }
}
