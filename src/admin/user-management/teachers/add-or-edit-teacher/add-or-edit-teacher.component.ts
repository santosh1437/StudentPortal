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
  public addEditTeacherCourseForm: FormGroup;
  public hide: boolean = true;
  public success: boolean = false;
  public err: boolean = false;
  public personalDetails: boolean = true;
  public courseDetails: boolean = false;
  public url: string = "";
  public displayedColumns = [
    'id',
    'segment',
    'course',
    'subCourse',
    'subject',
    'edit/delete'
  ];
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
    // Adding all details of teacher
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
    //Add Courses to teacher form
    this.addEditTeacherCourseForm = this.fb.group({
      segment: new FormControl('',[Validators.required]),
      course: new FormControl('', [Validators.required]),
      subCourse: new FormControl('', [Validators.required]),
      subject: new FormControl('', [Validators.required])
    })
  }
  ngOnInit(): void {
    this.addEditTeacherForm.patchValue(this.data);
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
      event.files.push({ data: event.files[0], fileName: this.addEditTeacherForm.controls['fullName'].value });

      this.appService.addImage(event.files[0])
        .subscribe((result: string) => {
          this.url = result;
      });
    }
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
          empId: this.addEditTeacherForm.controls['empId'].value,
          empEmail: this.addEditTeacherForm.controls['empEmail'].value,
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
          address: this.addEditTeacherForm.controls['address'].value,
          empId: this.addEditTeacherForm.controls['empId'].value,
          empEmail: this.addEditTeacherForm.controls['empEmail'].value,
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
