import { Component, Inject, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { AdminService } from 'src/admin/admin.service';
import { AddSubCourse, subCourse } from 'src/app/app.model';
import { AppService } from 'src/app/app.service';

@Component({
  selector: 'app-add-or-edit-subcourse',
  templateUrl: './add-or-edit-subcourse.component.html',
  styleUrls: ['./add-or-edit-subcourse.component.css']
})
export class AddOrEditSubcourseComponent {
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
    private dialogRef: MatDialogRef<AddOrEditSubcourseComponent>,
    @Inject(MAT_DIALOG_DATA) public datas: any,
  ){
    this.addEditCourseForm = this.fb.group({
      subCourseID: new FormControl('',[Validators.required]),
      segment: new FormControl('',[Validators.required]),
      course: new FormControl('',[Validators.required]),
      subCourse: '',
      duration: new FormControl('',[Validators.required]),
      description: '',
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
  this.getAllCourseList();
  }

  selectedCourse: any;
  diplayedCourse: any;
  onSelect(val: any, init?: any){
    // alert("clicked");
    console.log(val);
    if(val){
      this.diplayedCourse = [];
      this.allSegmentData.map((res:any)=>{
        // alert("click");
        console.log(res);
        if(res.segmentName == val){
          this.allCourseData.map((resp:any)=>{
            if(res.segmentName == resp.segment){
              this.selectedCourse = this.allCourseData;
              this.diplayedCourse.push(resp);
              if (init){
                this.onSelectSub(this.selectedCourse);
                this.diplayedCourse = this.selectedCourse;
              }
            }
          })
        }
      })
    }
  }
  onSelectSub(val2: any){

  }

  allSegmentData: any;
  getAllSegmentList(){
    this.appService.getSegments().subscribe((res:any)=>{
      this.allSegmentData = res;
    })
  }

  allCourseData: any;
  getAllCourseList(){
    this.appService.getCourses().subscribe((res:any)=>{
      this.allCourseData = res;
    })
  }

  

  onFormSubmit(){
    if(this.addEditCourseForm.valid){
      if(this.datas){
        const EditCourse: subCourse ={
          id : this.datas.id,
          subCourseID : this.addEditCourseForm.controls['subCourseID'].value,
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
        const AddCourse: AddSubCourse ={
          id : '',
          subCourseID : this.addEditCourseForm.controls['subCourseID'].value,
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

  public addCourseData(course : AddSubCourse){
    this.appService.addSubCourse(course).subscribe({
      next:(res)=>{
        this.success = true;
        this.err = false;
        this.dialogRef.close(true);
        this.adminService.openSection('subCourse');
        this.successMsgDialog('Courses Added Successfully');
      },
      error:(err) =>{
        this.success = false;
        this.err = true;
        this.successMsgDialog(err.message);
      }
    })
  }
  public editCourseData(course : subCourse){
    this.appService.editSubCourse(course).subscribe({
      next:(res)=>{
        console.log(res);
        this.success = true;
        this.err = false;
        this.dialogRef.close(true);
        this.adminService.openSection('subCourse');
        this.successMsgDialog('Courses Updated Successfully');
      },
      error:(err) =>{
        this.success = false;
        this.err = true;
        this.adminService.openSection('subCourse');
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
