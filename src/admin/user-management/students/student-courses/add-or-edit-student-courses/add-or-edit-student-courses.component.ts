import { Component, TemplateRef, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { AdminService } from 'src/admin/admin.service';
import { AddCourseToTeacher, addCourseStudent, courseStudent } from 'src/app/app.model';
import { AppService } from 'src/app/app.service';

@Component({
  selector: 'app-add-or-edit-student-courses',
  templateUrl: './add-or-edit-student-courses.component.html',
  styleUrls: ['./add-or-edit-student-courses.component.css']
})
export class AddOrEditStudentCoursesComponent {
  public data: any;
  public addEditCourseCourseForm: FormGroup;
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
    this.addEditCourseCourseForm = this.fb.group({
      sID: new FormControl('', [Validators.required]),
      cID: new FormControl('', [Validators.required]),
      courseID: new FormControl('', [Validators.required]),
      batchID:new FormControl('', [Validators.required]),
    })
  }
  ngOnInit(): void {
    this.getStudent();
    this.getSubCourse();
    this.getCounsellor();
    this.getBatchData();
    this. addEditCourseCourseForm.patchValue(this.data);
  }

  studentData: any;
  getStudent(){
    this.appService.getStudents().subscribe((res:any)=>{
      this.studentData = res;
    })
  }
  subCourseData: any;
  getSubCourse(){
    this.appService.getSubCourse().subscribe((res:any)=>{
      this.subCourseData = res;
    })
  }

  counsellorData: any;
  getCounsellor(){
    this.appService.getCounselor().subscribe((res:any)=>{
      this.counsellorData = res;
    })
  }

  batchData: any;
  getBatchData(){
    this.appService.getBatches().subscribe((res:any)=>{
      this.batchData = res;
    })
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
      event.files.push({ data: event.files[0], fileName: this. addEditCourseCourseForm.controls['fullName'].value });

      this.appService.addImage(event.files[0])
        .subscribe((result: string) => {
          this.url = result;
      });
    }
  }

  addEditTeacherCourse(){
    if(this. addEditCourseCourseForm.valid){
      if(this.data){
        const editStudentCourseData : courseStudent ={
          sID: this.addEditCourseCourseForm.controls['sID'].value,
          cID: this. addEditCourseCourseForm.controls['cID'].value,
          courseID: this. addEditCourseCourseForm.controls['courseID'].value,
          batchID: this. addEditCourseCourseForm.controls['batchID'].value,
        };
        this.editStudentCourse(editStudentCourseData)
      }else{
        const addTeacherCourseData : addCourseStudent ={
          sID: this.addEditCourseCourseForm.controls['sID'].value,
          cID: this. addEditCourseCourseForm.controls['cID'].value,
          courseID: this. addEditCourseCourseForm.controls['courseID'].value,
          batchID: this. addEditCourseCourseForm.controls['batchID'].value,
        };
        this.addStudentCourse(addTeacherCourseData);
      }
    } 
  }

  // public fillNext(){
  //   this.personalDetails = false;
  //   this.courseDetails = true;
  // }

  public addStudentCourse(addCourse: addCourseStudent){
    alert("add");
    this.appService.addStudentCourse(addCourse).subscribe({
      next:(res) => {
        this.success = true;
        this.err = false;
      this.successMsgDialog('Course added successfully'); 
      this.adminService.openSection('studentCourseDetails');
      },
      error: (err) => {
        this.err = true;
        this.success = false;
        this.successMsgDialog(err.message);
      }
    })
  }

  public editStudentCourse(editCourse: courseStudent){
    this.appService.editStudentCourse(editCourse).subscribe({
      next: (res) => {
        console.log(res);
        this.success = true;
        this.err = false;
        this.successMsgDialog('Course updated successfully');
        this.adminService.openSection('studentCourseDetails');
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
