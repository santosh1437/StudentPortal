import { Component, Inject, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { AdminService } from 'src/admin/admin.service';
import { AddCourse, Course } from 'src/app/app.model';
import { AppService } from 'src/app/app.service';

@Component({
  selector: 'app-add-or-edit-course',
  templateUrl: './add-or-edit-course.component.html',
  styleUrls: ['./add-or-edit-course.component.css']
})
export class AddOrEditCourseComponent {
  public addEditCourseForm:any = FormGroup;
  public data: any;
  public success:boolean = false;
  public err:boolean = false;
  // dialogRef: any;
  
@ViewChild('successMsg') successDialog = {} as TemplateRef<any>
  constructor(
    public appService: AppService,
    private fb: FormBuilder,
    private dialog: MatDialog,
    public adminService: AdminService,
    private dialogRef: MatDialogRef<AddOrEditCourseComponent>,
    @Inject(MAT_DIALOG_DATA) public datas: any,
  ){
    this.addEditCourseForm = this.fb.group({
      courseID: new FormControl('',[Validators.required]),
      segment: new FormControl('',[Validators.required]),
      course: new FormControl('',[Validators.required]),
      subCourse: '',
      duration: new FormControl('',[Validators.required]),
      description: new FormControl('',[Validators.required]),
      currentPrice: new FormControl('',[Validators.required]),
      discountPrice: new FormControl('',[Validators.required]),
      discountPercentage: new FormControl('',[Validators.required]),

    });
    // this.data = this.adminService.editCourseObj;
    
  }

  ngOnInit(): void{
    this.addEditCourseForm.patchValue(this.datas);
  //  console.log(this.data);
  this.getAllSegmentList();
  }

  allSegmentData: any;
  getAllSegmentList(){
    this.appService.getSegments().subscribe((res:any)=>{
      this.allSegmentData = res;
    })
  }

  onFormSubmit(){
    if(this.addEditCourseForm.valid){
      if(this.datas){
        const EditCourse: Course ={
          id : this.datas.id,
          courseID : this.addEditCourseForm.controls['courseID'].value,
          segment : this.addEditCourseForm.controls['segment'].value,
          course : this.addEditCourseForm.controls['course'].value,
          subCourse : this.addEditCourseForm.controls['subCourse'].value,
          duration : this.addEditCourseForm.controls['duration'].value,
          description : this.addEditCourseForm.controls['description'].value,
          currentPrice : this.addEditCourseForm.controls['currentPrice'].value,
          discountPrice : this.addEditCourseForm.controls['discountPrice'].value,
          discountPercentage : this.addEditCourseForm.controls['discountPercentage'].value,
        };
        this.editCourseData(EditCourse);
      }else{
        const AddCourse: AddCourse ={
          id : '',
          courseID : this.addEditCourseForm.controls['courseID'].value,
          segment : this.addEditCourseForm.controls['segment'].value,
          course : this.addEditCourseForm.controls['course'].value,
          subCourse : this.addEditCourseForm.controls['subCourse'].value,
          duration : this.addEditCourseForm.controls['duration'].value,
          description : this.addEditCourseForm.controls['description'].value,
          currentPrice : this.addEditCourseForm.controls['currentPrice'].value,
          discountPrice : this.addEditCourseForm.controls['discountPrice'].value,
          discountPercentage : this.addEditCourseForm.controls['discountPercentage'].value,
        };
        this.addCourseData(AddCourse);
      }
    }
  }

  public addCourseData(course : AddCourse){
    this.appService.addCourse(course).subscribe({
      next:(res)=>{
        this.success = true;
        this.err = false;
        this.dialogRef.close(true);
        this.adminService.openSection('manageCourses');
        this.successMsgDialog('Courses Added Successfully');
      },
      error:(err) =>{
        this.success = false;
        this.err = true;
        this.successMsgDialog(err.message);
      }
    })
  }
  public editCourseData(course : Course){
    this.appService.editCourse(course).subscribe({
      next:(res)=>{
        console.log(res);
        this.success = true;
        this.err = false;
        this.dialogRef.close(true);
        this.adminService.openSection('manageCourses');
        this.successMsgDialog('Courses Updated Successfully');
      },
      error:(err) =>{
        this.success = false;
        this.err = true;
        this.adminService.openSection('manageCourses');
        this.successMsgDialog(err.message);
      }
    })
  }

  public closeModal(){
    this.dialogRef.close();
  }
  public successMsgDialog(msg: string) {
    this.appService.httpClientMsg = msg;
    const timeout = 3000;
    const dialogRef = this.dialog.open(this.successDialog, {
      width: 'auto',
    });
    dialogRef.afterOpened().subscribe((_) => {
      setTimeout(() => {
        dialogRef.close();
      }, timeout);
    });
  }

}
