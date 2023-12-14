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
  public scheduleCounsellingForm:any =  FormGroup;
  public success: boolean = false;
  public err: boolean = false;
  public TeacherCourseDataSource: MatTableDataSource<AddCourseToTeacher>;
  public StudentsData: any;
  public segmentList: any;
  public counsellorList: any;
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
      date: new FormControl('', [Validators.required]),
      duration: new FormControl('', [Validators.required]),
      studentMail: new FormControl('', [Validators.required]),
      studentName: new FormControl('', [Validators.required]),
      cID: '',
      sRcID: new FormControl('', [Validators.required]),
      segment: new FormControl('', [Validators.required]),
      grade: new FormControl('', [Validators.required]),
      curriculum: new FormControl('', [Validators.required]),
      qualification:'',
    })
  }
  ngOnInit(): void {
    this.scheduleCounsellingForm.patchValue(this.data);
    this.getSegmentList();
    this.getCounsellorList();
  }

  postData() {
    const selectedDate = this.scheduleCounsellingForm.get('date').value;

    // Add one day to the selected date
    const additionalDate = new Date(selectedDate);
    additionalDate.setDate(selectedDate.getDate() + 1);

    // Update the form control value with the additional date
    this.scheduleCounsellingForm.get('date').setValue(additionalDate);
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

  public scheduleCounselling(){
    this.postData();
    this.appService.addCounsellingSessionMeeting(this.scheduleCounsellingForm.value).subscribe({
      next:(res)=>{
        this.success = true;
        this.err = false;
        this.successMsgDialog("Counselling Session added successfully");
      },
      error:(err)=>{
        this.success = false;
        this.err = true;
        this.successMsgDialog(err.message);
      }
    })

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
