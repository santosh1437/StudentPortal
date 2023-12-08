import { Component, TemplateRef, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { AdminService } from 'src/admin/admin.service';
import { AddCourseToTeacher, addPayment, payment } from 'src/app/app.model';
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
  public studentList: any;
  paymentData: any;
  datas : any;
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
      
      totalFee: new FormControl('', [Validators.required]),
      amountPaid: new FormControl('', [Validators.required]),
      paidOn: new FormControl('', [Validators.required]),
      paymentMethod: new FormControl('', [Validators.required]),
      paymentType: new FormControl('', [Validators.required]),
      dueDate: new FormControl('', [Validators.required]),
      dueAmount: new FormControl('', [Validators.required]),
      comment: '',
      sID: this.selectedSID,
    })
  }
  selectedSID: any;
  ngOnInit(): void {
    this.getSelectedPayment();
    this. addEditTeacherCourseForm.patchValue(this.data);
    this.selectedSID = localStorage.getItem('StudentID');
    console.log(this.selectedSID);
    this.getStudentData();
  }

  getSelectedPayment(){
    this.paymentData = sessionStorage.getItem('setPayment');
    this.datas = JSON.parse(this.paymentData);
    this.data = this.datas;
  }

  getStudentData(){
    this.appService.getStudents().subscribe((res:any)=>{
      this.studentList = res;
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
        const editPayemtData : payment ={
          id: this.data.id,
          sID: this. addEditTeacherCourseForm.controls['sID'].value,
          totalFee: this. addEditTeacherCourseForm.controls['totalFee'].value,
          amountPaid: this. addEditTeacherCourseForm.controls['amountPaid'].value,
          paidOn: this. addEditTeacherCourseForm.controls['paidOn'].value,
          paymentMethod: this. addEditTeacherCourseForm.controls['paymentMethod'].value,
          paymentType: this. addEditTeacherCourseForm.controls['paymentType'].value,
          dueDate: this. addEditTeacherCourseForm.controls['dueDate'].value,
          dueAmount: this. addEditTeacherCourseForm.controls['dueAmount'].value,
          comment: this. addEditTeacherCourseForm.controls['comment'].value,
        };
        this.editTeacherCourse(editPayemtData)
      }else{
        const addPaymentData : addPayment ={
          sID: this.selectedSID,
          totalFee: this. addEditTeacherCourseForm.controls['totalFee'].value,
          amountPaid: this. addEditTeacherCourseForm.controls['amountPaid'].value,
          paidOn: this. addEditTeacherCourseForm.controls['paidOn'].value,
          paymentMethod: this. addEditTeacherCourseForm.controls['paymentMethod'].value,
          paymentType: this. addEditTeacherCourseForm.controls['paymentType'].value,
          dueDate: this. addEditTeacherCourseForm.controls['dueDate'].value,
          dueAmount: this. addEditTeacherCourseForm.controls['dueAmount'].value,
          comment: this. addEditTeacherCourseForm.controls['comment'].value,
        };
        this.addTeacherCourse(addPaymentData);
      }
    } 
  }

  public fillNext(){
    this.personalDetails = false;
    this.courseDetails = true;
  }

  public addTeacherCourse(payment: addPayment){
    this.appService.addPaymentDetails(payment).subscribe({
      next:(res) => {
        this.success = true;
        this.err = false;
      this.successMsgDialog('payment added successfully'); 
      
      },
      error: (err) => {
        this.err = true;
        this.success = false;
        this.successMsgDialog(err.message);
      }
    })
  }

  public editTeacherCourse(payments: payment){
    this.appService.editPayment(payments).subscribe({
      next: (res) => {
        console.log(res);
        this.success = true;
        this.err = false;
        this.successMsgDialog('payment updated successfully');
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
        this.adminService.openSection('studentPaymentDetails');
      }, timeout);
    });
  }
}
