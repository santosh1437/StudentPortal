import { Component, Inject, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { AdminService } from 'src/admin/admin.service';
import { AddCourseToTeacher, Teachers, addTeachers } from 'src/app/app.model';
import { AppService } from 'src/app/app.service';

@Component({
  selector: 'app-add-or-edit-teacher',
  templateUrl: './add-or-edit-teacher.component.html',
  styleUrls: ['./add-or-edit-teacher.component.css']
})
export class AddOrEditTeacherComponent {
  public data: any;
  public addEditTeacherForm: FormGroup;
  public hide: boolean = true;
  public success: boolean = false;
  public err: boolean = false;
  public personalDetails: boolean = true;
  public courseDetails: boolean = false;
  public url: string = "";
  public TeacherCourseDataSource: MatTableDataSource<AddCourseToTeacher>;
  public currentTId: string = "";
  @ViewChild('successMsg') successDialog = {} as TemplateRef<any>;
  dialogRef: any;

  constructor(
    public appService: AppService,
    public adminService: AdminService,
    public fb: FormBuilder,
    private dialog: MatDialog,
  ){
    this.TeacherCourseDataSource = new MatTableDataSource();
    // Adding all details of teacher
    this.addEditTeacherForm = this.fb.group({
      fullName: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      phone: new FormControl('', [Validators.required, Validators.pattern("^[0-9\-\+]{9,15}$")]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)] ),
      address: new FormControl(''),
      empEmail: new FormControl('', [Validators.email]),
      empId: new FormControl(''),
      currentCity: new FormControl(''),
      joinedOn: new FormControl('',[Validators.required]),
      courseAssign: '',
    });
  }
  ngOnInit(): void {
    this.data = this.adminService.editCounselorObj;
    this.addEditTeacherForm.patchValue(this.data);
    if(this.data){
      this.adminService.getImageByID(this.data.tID);
    }
    this.getSubCourse();
  }

  onSelect(event:any){
    if(event.target.files[0]){
      let reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);
      reader.onload = (event: any) => {
        this.adminService.url = event.target.result;
      }
      this.adminService.currentImage = event.target.files[0];
    }
  }

  addEditTeacher(){
    if(this.addEditTeacherForm.valid){
      if(this.data){
        const editTeachersData : Teachers ={
          tID: this.data.tID,
          fullName: this.addEditTeacherForm.controls['fullName'].value,
          email: this.addEditTeacherForm.controls['email'].value,
          phone: this.addEditTeacherForm.controls['phone'].value,
          password: this.addEditTeacherForm.controls['password'].value,
          address: this.addEditTeacherForm.controls['address'].value,
          empId: this.addEditTeacherForm.controls['empId'].value,
          empEmail: this.addEditTeacherForm.controls['empEmail'].value,
          joinedOn: this.addEditTeacherForm.controls['joinedOn'].value,
          isActive: true,
          currentCity: this.addEditTeacherForm.controls['currentCity'].value,
          courseAssign: this.addEditTeacherForm.controls['courseAssign'].value
        };
        this.editTeachers(editTeachersData)
      }else{
        const addTeachersData : addTeachers ={
          fullName: this.addEditTeacherForm.controls['fullName'].value,
          email: this.addEditTeacherForm.controls['email'].value,
          phone: this.addEditTeacherForm.controls['phone'].value,
          password: this.addEditTeacherForm.controls['password'].value,
          address: this.addEditTeacherForm.controls['address'].value,
          empId: this.addEditTeacherForm.controls['empId'].value,
          empEmail: this.addEditTeacherForm.controls['empEmail'].value,
          joinedOn: this.addEditTeacherForm.controls['joinedOn'].value,
          isActive: true,
          currentCity: this.addEditTeacherForm.controls['currentCity'].value,
          courseAssign: this.addEditTeacherForm.controls['courseAssign'].value
        };
        this.addTeachers(addTeachersData);
      }
    } 
  }

  subCourseData: any;
  getSubCourse(){
    this.appService.getSubCourse().subscribe((res:any)=>{
      this.subCourseData = res;
    })
  }


  public fillNext(){
    if(this.addEditTeacherForm.valid){
      this.personalDetails = false;
      this.courseDetails = true;
    }
    if(!this.currentTId){
      this.addEditTeacher();
    }
  }

  public addTeachers(teacher: addTeachers){
    this.appService.addTeacher(teacher).subscribe({
      next:(res) => {
        console.log(res);
        this.currentTId = res.tID;
        this.success = true;
        this.err = false;
        this.successMsgDialog('Teacher added successfully'); 
        this.adminService.openSection('teachers')
      },
      error: (err) => {
        this.err = true;
        this.success = false;
        this.successMsgDialog(err.message);
      }
    });
  }

  public editTeachers(teacher: Teachers){
    this.appService.editTeacher(teacher).subscribe({
      next: (res) => {
        console.log(res);
        this.success = true;
        this.err = false;
        this.successMsgDialog('Teacher Details Saved');
      },
      error: (err) => {
        this.err = true;
        this.success = false;
        this.successMsgDialog(err.message);
      },
    });
  }

  public addOrEditImage(){
    const formData : any = new FormData();
      formData.append('imagefile',  this.adminService.currentImage);
      formData.append('uniqueId',this.data ? this.adminService.currentEditId : this.adminService.currentAddId)
    if(this.data){
      this.appService.editImage(formData).subscribe( {
          next: (res) => {
            console.log(res);
            this.success = true;
            this.err = false;
            this.successMsgDialog('Teacher Image updated successfully');
          },
          error: (err) => {
            this.err = true;
            this.success = false;
            this.successMsgDialog(err.message);
          }
      });
    } else{
      this.appService.addImage(formData).subscribe({
          next: (res) => {
            console.log(res);
            this.success = true;
            this.err = false;
            this.successMsgDialog('Teacher Image added successfully');
          },
          error: (err) => {
            this.err = true;
            this.success = false;
            this.successMsgDialog(err.message);
          },
      });
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
        // this.adminService.openSection('teachers');
      }, timeout);
    });
  }
}
