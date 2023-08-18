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
  public educationDetails: boolean = false;
  public paymentDetails: boolean = false;
  public url: any = '';

  @ViewChild('successMsg') successDialog = {} as TemplateRef<any>;
  constructor(
    public appService: AppService,
    private fb: FormBuilder,
    private dialog: MatDialog,
    public adminService: AdminService
  ) {
    this.addEditStudentForm = this.fb.group({
      name: new FormControl('', [Validators.required]),
      dob: new FormControl('', [Validators.required]),
      phoneNo: new FormControl('', [Validators.required, Validators.pattern("^[0-9\-\+]{9,15}$")]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(6),
      ]),
      admissionDate: new FormControl('', [Validators.required]),
      studentType: new FormControl('', [Validators.required]),
      currentCity: new FormControl('', [Validators.required]),
      address: new FormControl('', Validators.required),
      parentPhoneNo: new FormControl('', [Validators.required,Validators.pattern("^[0-9\-\+]{9,15}$")]),
      parentName: new FormControl('', Validators.required),
      parentMailId: new FormControl('', [Validators.required, Validators.email]),
      counsellor: new FormControl('', [Validators.required]),
      segment: new FormControl('', [Validators.required]),
      grade: new FormControl('', [Validators.required]),
      curriculum: new FormControl('', [Validators.required]),
      schoolOrCollege: new FormControl('', [Validators.required]),
      degree: new FormControl('', [Validators.required]),
      expectedOrPassedOutYear: new FormControl('', [Validators.required])
    });
  }

  ngOnInit(): void {
    // this.data  = {
    //   id:1, fullName:"Niha", email:"te@n.com", phoneNo:"90303682", password: "", studentType: "External Student", 
    //   batch: "1", course: "SAT", subject: "maths", timings:"10 to 11", parentPhoneNo: "6566154", currentCity: "Hyderabad", address: "test"
    // }
    this.addEditStudentForm.patchValue(this.data);
  }

  public backBtn(){
    if(this.personalDetails){
      // this.personalDetails = false;
      // this.educationDetails = true;
      this.adminService.openSection('students');
    }else if(this.educationDetails){
      this.personalDetails = true;
      this.educationDetails = false;
    }
  }

  public fillNext(){
    if(this.personalDetails){
      this.personalDetails = false;
      this.educationDetails = true;
    } else if(this.educationDetails){
      this.personalDetails = false;
      this.educationDetails = false;
      this.adminService.openSection('studentCourseDetails');
      this.courseDetails = true;
    } else if(this.courseDetails) {
      this.personalDetails = false;
      this.educationDetails = false;
      this.courseDetails = false;
      this.adminService.openSection('studentPaymentDetails');
      this.paymentDetails = true;
    }
  }

  onFormSubmit() {
    if (this.addEditStudentForm.valid) {
      if (this.data) {
        const editStudentData: Student = {
          sID: this.data.sID,
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
        this.addOrEditImage();
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
        this.addOrEditImage();
        this.successMsgDialog('Student updated successfully');
      },
      error: (err) => {
        this.err = true;
        this.success = false;
        this.successMsgDialog(err.message);
      },
    });
  }

  onSelect(event:any){
    if(event.target.files[0]){
      let reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);
      reader.onload = (event: any) => {
        this.url = event.target.result;
      }
      this.adminService.currentImage = event.target.files[0];
    }
  }

  private addOrEditImage(){
    // const tempObj = {
    //   uniqueId: this.data ? this.adminService.currentEditId : this.adminService.currentAddId,
    //   imageFile: this.adminService.currentImage
    // }
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
