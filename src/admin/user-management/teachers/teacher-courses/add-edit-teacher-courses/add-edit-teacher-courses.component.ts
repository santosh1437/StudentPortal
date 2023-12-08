import { Component, TemplateRef, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { AdminService } from 'src/admin/admin.service';
import { AddCourseToTeacher, EditCourseToTeacher } from 'src/app/app.model';
import { AppService } from 'src/app/app.service';

@Component({
  selector: 'app-add-edit-teacher-courses',
  templateUrl: './add-edit-teacher-courses.component.html',
  styleUrls: ['./add-edit-teacher-courses.component.css']
})
export class AddEditTeacherCoursesComponent {
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
  public allTeacherList: any;
  public allSubCourseList: any;
  public getTeacherCourse: any;
  datas: any;
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
      tID: new FormControl('',[Validators.required]),
      courseID: new FormControl('', [Validators.required]),
    })
  }
  ngOnInit(): void {
    this.getTeacherCourseData();
    this. addEditTeacherCourseForm.patchValue(this.data);
    this.getTeacherData();
    this.getSubCourseData();
    
  }

  openDeleteTeacherCourseConfirm(ID:any){
    this.deleteId = ID;
    this.dialogRef = this.dialog.open(this.deleteAminConfirmDialog , {
      width: 'auto',
    });
  }

  getTeacherData(){
    this.appService.getTeacher().subscribe((res:any)=>{
      this.allTeacherList = res;
    })
  }

  getSubCourseData(){
    this.appService.getSubCourse().subscribe((res:any)=>{
      this.allSubCourseList = res;
    })
  }

  getTeacherCourseData(){
    this.getTeacherCourse = sessionStorage.getItem('setTeacherCourse');
    this.datas = JSON.parse(this.getTeacherCourse)
    this.data = this.datas;
    console.log(this.data);
  }

  // onSelect(event:any){
  //   if(event.target.files[0]){
  //     let reader = new FileReader();
  //     reader.readAsDataURL(event.target.files[0]);
  //     reader.onload = (event: any) => {
  //       this.url = event.target.result;
  //     }
  //     event.files.push({ data: event.files[0], fileName: this. addEditTeacherCourseForm.controls['fullName'].value });

  //     this.appService.addImage(event.files[0])
  //       .subscribe((result: string) => {
  //         this.url = result;
  //     });
  //   }
  // }

  addEditTeacherCourse(){
    if(this.addEditTeacherCourseForm.valid){
      if(this.data){
        const editTeacherCourseData : EditCourseToTeacher ={
          id: this.data.id,
          tID: this.addEditTeacherCourseForm.controls['tID'].value,
          courseID: this. addEditTeacherCourseForm.controls['courseID'].value,
        };
        this.editTeacherCourse(editTeacherCourseData)
      }else{
        const addTeacherCourseData : AddCourseToTeacher ={
          tID: this.addEditTeacherCourseForm.controls['tID'].value,
          courseID: this. addEditTeacherCourseForm.controls['courseID'].value,
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
      this.successMsgDialog('Teacher course added successfully'); 
      this.adminService.openSection('teacherCourses');
      },
      error: (err) => {
        this.err = true;
        this.success = false;
        this.successMsgDialog(err.message);
      }
    })
  }

  public editTeacherCourse(teacher: EditCourseToTeacher){
    debugger
    this.appService.editTeacherCourse(teacher).subscribe({
      next: (res) => {
        console.log(res);
        this.success = true;
        this.err = false;
        this.successMsgDialog('Teacher course updated successfully');
        this.adminService.openSection('teacherCourses');
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
        this.adminService.openSection('teacherCourses');
      }, timeout);
    });
  }
}
