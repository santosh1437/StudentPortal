import { Component, TemplateRef, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { AdminService } from 'src/admin/admin.service';
import { AddCourseToTeacher } from 'src/app/app.model';
import { AppService } from 'src/app/app.service';

@Component({
  selector: 'app-add-or-edit-payment-details',
  templateUrl: './add-or-edit-payment-details.component.html',
  styleUrls: ['./add-or-edit-payment-details.component.css']
})
export class AddOrEditPaymentDetailsComponent {
  public data: any;
  public addEditTeacherCourseForm: FormGroup;
  public hide: boolean = true;
  public success: boolean = false;
  public err: boolean = false;
  public personalDetails: boolean = true;
  public courseDetails: boolean = false;
  public url: string = "";
  public deleteId: number = 0;
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
    this.addEditTeacherCourseForm = this.fb.group({
      segment: new FormControl('',[Validators.required]),
      course: new FormControl('', [Validators.required]),
      subCourse: new FormControl('', [Validators.required]),
      subject: new FormControl('', [Validators.required])
    })
  }
  ngOnInit(): void {
    this. addEditTeacherCourseForm.patchValue(this.data);
  }

  openDeleteTeacherCourseConfirm(ID:any){
    this.deleteId = ID;
    this.dialogRef = this.dialog.open(this.deleteAminConfirmDialog , {
      width: 'auto',
    });
  }

  onSelect(event:any){
    if(event.target.files[0]){
      let reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);
      reader.onload = (event: any) => {
        this.url = event.target.result;
      }
      event.files.push({ data: event.files[0], fileName: this. addEditTeacherCourseForm.controls['fullName'].value });

      this.appService.addImage(event.files[0])
        .subscribe((result: string) => {
          this.url = result;
      });
    }
  }

  addEditTeacherCourse(){
    if(this. addEditTeacherCourseForm.valid){
      if(this.data){
        const editTeacherCourseData : AddCourseToTeacher ={
          tID: this.addEditTeacherCourseForm.controls['tID'].value,
          subject: this. addEditTeacherCourseForm.controls['subject'].value,
          course: this. addEditTeacherCourseForm.controls['course'].value,
          segment: this. addEditTeacherCourseForm.controls['segment'].value,
          subCourse: this. addEditTeacherCourseForm.controls['subCourse'].value,
        };
        this.editTeacherCourse(editTeacherCourseData)
      }else{
        const addTeacherCourseData : AddCourseToTeacher ={
          tID: this.addEditTeacherCourseForm.controls['tID'].value,
          subject: this. addEditTeacherCourseForm.controls['subject'].value,
          course: this. addEditTeacherCourseForm.controls['course'].value,
          segment: this. addEditTeacherCourseForm.controls['segment'].value,
          subCourse: this. addEditTeacherCourseForm.controls['subCourse'].value,
        };
        this.addTeacherCourse(addTeacherCourseData);
      }
    } 
  }

  public fillNext(){
    this.personalDetails = false;
    this.courseDetails = true;
  }

  public addTeacherCourse(teacher: AddCourseToTeacher){
    this.appService.addTeacherCourse(teacher).subscribe({
      next:(res) => {
        this.success = true;
        this.err = false;
      this.successMsgDialog('Teacher added successfully'); 
      },
      error: (err) => {
        this.err = true;
        this.success = false;
        this.successMsgDialog(err.message);
      }
    })
  }

  public editTeacherCourse(teacher: AddCourseToTeacher){
    this.appService.editTeacherCourse(teacher).subscribe({
      next: (res) => {
        console.log(res);
        this.success = true;
        this.err = false;
        this.successMsgDialog('Teacher updated successfully');
      },
      error: (err) => {
        this.err = true;
        this.success = false;
        this.successMsgDialog(err.message);
      },
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
        this.adminService.openSection('students');
      }, timeout);
    });
  }
}
