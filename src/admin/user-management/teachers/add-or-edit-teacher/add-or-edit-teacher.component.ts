import { Component, Inject, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { AdminService } from 'src/admin/admin.service';
import { Teachers, addTeachers } from 'src/app/app.model';
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

  @ViewChild('successMsg') successDialog = {} as TemplateRef<any>;

  constructor(
    public appService: AppService,
    public adminService: AdminService,
    public fb: FormBuilder,
    private dialog: MatDialog,
  ){
    this.addEditTeacherForm = this.fb.group({
      fullName: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      phoneNo: new FormControl('', [Validators.required, Validators.pattern("^[0-9\-\+]{9,15}$")]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)] ),
      subject: new FormControl('', [Validators.required]),
      course: new FormControl('', [Validators.required]),
      address: new FormControl(''),
      empEmail: new FormControl('', [Validators.email]),
      empId: new FormControl(),
      joinedOn: new FormControl()
    });
  }
  ngOnInit(): void {
    this.addEditTeacherForm.patchValue(this.data);
  }

  addEditTeacher(){
    if(this.addEditTeacherForm.valid){
      if(this.data){
        const editTeachersData : Teachers ={
          tID: this.data.tID,
          fullName: this.addEditTeacherForm.controls['fullName'].value,
          email: this.addEditTeacherForm.controls['email'].value,
          phoneNo: this.addEditTeacherForm.controls['phoneNo'].value,
          password: this.addEditTeacherForm.controls['password'].value,
          subject: this.addEditTeacherForm.controls['subject'].value,
          course: this.addEditTeacherForm.controls['course'].value,
          address: this.addEditTeacherForm.controls['address'].value,
          empId: '',
          empEmail: '',
          joinedOn: this.addEditTeacherForm.controls['joinedOn'].value,
          createdOn: new Date(),
          isActive: true,
        };
        this.editTeachers(editTeachersData)
      }else{
        const addTeachersData : addTeachers ={
          fullName: this.addEditTeacherForm.controls['fullName'].value,
          email: this.addEditTeacherForm.controls['email'].value,
          phoneNo: this.addEditTeacherForm.controls['phoneNo'].value,
          password: this.addEditTeacherForm.controls['password'].value,
          subject: this.addEditTeacherForm.controls['subject'].value,
          course: this.addEditTeacherForm.controls['course'].value,
          address:'',
          empId:'',
          empEmail:'',
          joinedOn: this.addEditTeacherForm.controls['joinedOn'].value,
          createdOn: new Date(),
          isActive: true
        };
        this.addTeachers(addTeachersData);
      }
    } 
  }

  public fillNext(){
    this.personalDetails = false;
    this.courseDetails = true;
  }

  public addTeachers(teacher: addTeachers){
    this.appService.addTeacher(teacher).subscribe({
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

  public editTeachers(teacher: Teachers){
    this.appService.editTeacher(teacher).subscribe({
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
        this.adminService.openSection('teachers');
      }, timeout);
    });
  }
}
