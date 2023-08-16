import { Component, TemplateRef, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { AdminService } from 'src/admin/admin.service';
import { AddCourseToTeacher, Interview } from 'src/app/app.model';
import { AppService } from 'src/app/app.service';

@Component({
  selector: 'app-schedule-interview',
  templateUrl: './schedule-interview.component.html',
  styleUrls: ['./schedule-interview.component.css']
})
export class ScheduleInterviewComponent {
  public data: any;
  public scheduleInterviewForm: FormGroup;
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
    this.scheduleInterviewForm = this.fb.group({
      date: new FormControl('',[Validators.required]),
      time: new FormControl('', [Validators.required]),
      zoomAccount: new FormControl('', [Validators.required]),
      candidate: new FormControl('', [Validators.required]),
      host: new FormControl('', [Validators.required]),
      coHost: new FormControl('', [Validators.required])
    })
  }
  ngOnInit(): void {
    this. scheduleInterviewForm.patchValue(this.data);
  }

  public scheduleInterview(){
    if(this.scheduleInterviewForm.valid){
      const interview: Interview = {
        hostMail: this.scheduleInterviewForm.controls['hostMail'].value,
        coHostMail: this.scheduleInterviewForm.controls['coHostMail'].value,
        date: this.scheduleInterviewForm.controls['date'].value,
        time: this.scheduleInterviewForm.controls['time'].value,
        zoomAccount: this.scheduleInterviewForm.controls['zoomAccount'].value,
        candidateName: this.scheduleInterviewForm.controls['candidateName'].value,
        candidateMail: this.scheduleInterviewForm.controls['candidateMail'].value,
        meetingLink: '',
        meetingID: ''
      };
      this.appService.addInterview(interview).subscribe({
        next: (res) => {
          this.success = true;
          this.err = false;
          this.successMsgDialog('Saving interview added successfully');
        },
        error: (err) => {
          this.success = false;
          this.err = true;
          this.successMsgDialog('Saving interview details to database failed');
        }
      })
    }
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
