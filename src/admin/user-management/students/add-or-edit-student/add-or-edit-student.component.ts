import { Component, TemplateRef, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { AdminService } from 'src/admin/admin.service';
import { addStudent, Student } from 'src/app/app.model';
import { AppService } from 'src/app/app.service';

@Component({
  selector: 'app-add-or-edit-student',
  templateUrl: './add-or-edit-student.component.html',
  styleUrls: ['./add-or-edit-student.component.css']
})
export class AddOrEditStudentComponent {
  public data: any;
  public hide: boolean = true;
  public addEditStudentForm: FormGroup;
  public success: boolean = false;
  public err: boolean = false;
  public personalDetails: boolean = true;
  public courseDetails: boolean = false;

  @ViewChild('successMsg') successDialog = {} as TemplateRef<any>;
  constructor(
    public appService: AppService,
    private fb: FormBuilder,
    private dialog: MatDialog,
    public adminService: AdminService
  ) {
    this.addEditStudentForm = this.fb.group({
      fullName: new FormControl('', [Validators.required]),
      phoneNo: new FormControl('', [Validators.required, Validators.pattern("^[0-9\-\+]{9,15}$")]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(6),
      ]),
      studentType: new FormControl('', [Validators.required]),
      currentCity: new FormControl('', [Validators.required]),
      address: new FormControl('', Validators.required),
      parentPhoneNo: new FormControl('', Validators.required),
      course: new FormControl('', Validators.required),
      subject: new FormControl('', Validators.required),
      batch: new FormControl('', Validators.required),
      timings: new FormControl('', Validators.required),
      assignedTeacher: new FormControl('', Validators.required)
    });
  }

  ngOnInit(): void {
    this.data  = {
      id:1, fullName:"Niha", email:"te@n.com", phoneNo:"90303682", password: "", studentType: "External Student", 
      batch: "1", course: "SAT", subject: "maths", timings:"10 to 11", parentPhoneNo: "6566154", currentCity: "Hyderabad", address: "test"
    }
    this.addEditStudentForm.patchValue(this.data);
  }

  public fillNext(){
    this.personalDetails = false;
    this.courseDetails = true;
  }

  onFormSubmit() {
    if (this.addEditStudentForm.valid) {
      if (this.data) {
        const editStudentData: Student = {
          id: this.data.id,
          fullName: this.addEditStudentForm.controls['fullName'].value,
          phoneNo: this.addEditStudentForm.controls['phone'].value,
          email: this.addEditStudentForm.controls['email'].value,
          createdOn: new Date(),
          studentType: this.addEditStudentForm.controls['studentType'].value,
          updatedOn: new Date(),
          password: this.addEditStudentForm.controls['password'].value,
          currentCity: this.addEditStudentForm.controls['currentCity'].value,
          address: this.addEditStudentForm.controls['address'].value,
          parentPhoneNo: ''
        };
        this.editStudent(editStudentData);
      } else {
        const addStudentData: addStudent = {
          fullName: this.addEditStudentForm.controls['fullName'].value,
          phoneNo: this.addEditStudentForm.controls['phone'].value,
          email: this.addEditStudentForm.controls['email'].value,
          studentType: this.addEditStudentForm.controls['studentType'].value,
          password: this.addEditStudentForm.controls['password'].value,
          updatedOn: new Date(),
          createdOn: new Date(),
          currentCity: this.addEditStudentForm.controls['currentCity'].value,
          address: this.addEditStudentForm.controls['address'].value,
          parentPhoneNo: ''
        };
        this.addStudent(addStudentData);
      }
    }
  }

  public addStudent(student: addStudent) {
    this.appService.addStudentDetails(student).subscribe({
      next: (res) => {
        this.success = true;
        this.err = false;
        this.successMsgDialog('Student added successfully');
      },
      error: (err) => {
        this.err = true;
        this.success = false;
        this.successMsgDialog(err.message);
      },
    });
  }

  public editStudent(student: Student) {
    this.appService.editStudent(student).subscribe({
      next: (res) => {
        this.success = true;
        this.err = false;
        this.successMsgDialog('Student updated successfully');
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
    const timeout = 750;
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
