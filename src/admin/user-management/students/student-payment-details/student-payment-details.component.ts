import { ChangeDetectorRef, Component, TemplateRef, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator, MatPaginatorIntl } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { AdminService } from 'src/admin/admin.service';
import { AddCourseToTeacher, AddOrEditPaymentToStudent } from 'src/app/app.model';
import { AppService } from 'src/app/app.service';

@Component({
  selector: 'app-student-payment-details',
  templateUrl: './student-payment-details.component.html',
  styleUrls: ['./student-payment-details.component.css']
})
export class StudentPaymentDetailsComponent {
  public data: any;
  // public addEditStudentPaymentCourseForm: FormGroup;
  public hide: boolean = true;
  public success: boolean = false;
  public err: boolean = false;
  public personalDetails: boolean = true;
  public courseDetails: boolean = false;
  public url: string = "";
  public displayedColumns = [
    'id',
    'totalFee',
    'amountPaid',
    'paidOn',
    'paymentMethod',
    'paymentType',
    'dueAmount',
    'dueDate',
    'edit/delete'
  ];
  public deleteId: string = '';
  public StudentPaymentDataSource: MatTableDataSource<AddOrEditPaymentToStudent>;
  public StudentPaymentCoursesData: any;
  @ViewChild('deleteStudentPaymentCourseConfirm') deleteStudentPaymentCourseConfirm = {} as TemplateRef<any>;
  @ViewChild('successMsg') successDialog = {} as TemplateRef<any>;
  dialogRef: any;
  @ViewChild(MatSort) sort = new MatSort();
  @ViewChild(MatPaginator) paginator = new MatPaginator(
    new MatPaginatorIntl(),
    ChangeDetectorRef.prototype
  );

  constructor(
    public appService: AppService,
    public adminService: AdminService,
    public dialog: MatDialog
  ) {
    this.getStudentPaymentCoursesDetails();
    this.StudentPaymentDataSource = new MatTableDataSource(
      this.adminService.studentPaymentsList
    );
  }
  // constructor(
  //   public appService: AppService,
  //   public adminService: AdminService,
  //   public fb: FormBuilder,
  //   private dialog: MatDialog,
  // ){
  //   this.StudentPaymentCourseDataSource = new MatTableDataSource();
  //   //Add Courses to teacher form
  //   this.addEditStudentPaymentCourseForm = this.fb.group({
  //     segment: new FormControl('',[Validators.required]),
  //     course: new FormControl('', [Validators.required]),
  //     subCourse: new FormControl('', [Validators.required]),
  //     subject: new FormControl('', [Validators.required])
  //   })
  // }
  ngOnInit(): void {
    this.StudentPaymentDataSource = new MatTableDataSource(
      this.adminService.studentPaymentsList
    );
    // this.addEditStudentPaymentCourseForm.patchValue(this.data);
  }

  ngAfterViewInit() {
    this.StudentPaymentDataSource.paginator = this.paginator;
    this.StudentPaymentDataSource.sort = this.sort;
  }

  public deleteStudentPaymentCourse() {
    this.appService.deleteTeacherCourse(this.deleteId).subscribe({
      next: (res) => {
        this.closeModal();
        this.success = true;
        this.err = false;
        this.successMsgDialog('StudentPayment deleted Successfully');
        this.getStudentPaymentCoursesDetails();
      },
      error: (err) => {
        this.closeModal();
        this.success = false;
        this.err = true;
        this.successMsgDialog(
          'Something went wrong, Please try after some time!'
        );
      },
    });
    this.deleteId = '';
  }

  public closeModal() {
    this.dialogRef.close();
  }

  //Search table
  public applySearchFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.StudentPaymentDataSource.filter = filterValue.trim().toLowerCase();
  }

  openDeleteStudentPaymentCourseConfirm(ID:any){
    this.deleteId = ID;
    this.dialogRef = this.dialog.open(this.deleteStudentPaymentCourseConfirm , {
      width: 'auto',
    });
  }

  // addEditStudentPayment(){
  //   if(this.addEditStudentPaymentCourseForm.valid){
  //     if(this.data){
  //       const editStudentPaymentCourseData : AddCourseToStudentPayment ={
  //         tID: '',
  //         segment: this.addEditStudentPaymentCourseForm.controls['segment'].value,
  //         course: this.addEditStudentPaymentCourseForm.controls['course'].value,
  //         subCourse: this.addEditStudentPaymentCourseForm.controls['subCourse'].value,
  //         subject: this.addEditStudentPaymentCourseForm.controls['subject'].value,
  //       };
  //       this.editStudentPaymentCourses(editStudentPaymentCourseData)
  //     }else{
  //       const addStudentPaymentCourseData : AddCourseToStudentPayment ={
  //         tID: '',
  //         segment: this.addEditStudentPaymentCourseForm.controls['segment'].value,
  //         course: this.addEditStudentPaymentCourseForm.controls['course'].value,
  //         subCourse: this.addEditStudentPaymentCourseForm.controls['subCourse'].value,
  //         subject: this.addEditStudentPaymentCourseForm.controls['subject'].value,
  //       };
  //       this.addStudentPaymentCourses(addStudentPaymentCourseData);
  //     }
  //   } 
  // }

  public addStudentPaymentCourses(courses: AddCourseToTeacher){
    this.appService.addTeacherCourse(courses).subscribe({
      next:(res) => {
        this.success = true;
        this.err = false;
      this.successMsgDialog('Course added to StudentPayment successfully'); 
      },
      error: (err) => {
        this.err = true;
        this.success = false;
        this.successMsgDialog(err.message);
      }
    });
  }

  public editStudentPaymentCourses(courses: AddCourseToTeacher){
    this.appService.editTeacherCourse(courses).subscribe({
      next: (res) => {
        console.log(res);
        this.success = true;
        this.err = false;
        this.successMsgDialog('Payment updated to Student successfully');
      },
      error: (err) => {
        this.err = true;
        this.success = false;
        this.successMsgDialog(err.message);
      },
    });
  }

  //get StudentPayments form details
  private async getStudentPaymentCoursesDetails() {
    if(localStorage.getItem('currentUser')){
      await this.adminService.getTeacherCoursesDetails();
      // this.StudentPaymentCoursesData = this.adminService.teacherCoursesList;
      // this.StudentPaymentDataSource = new MatTableDataSource(
      //   this.adminService.teacherCoursesList
      // );
      // this.StudentPaymentDataSource.paginator = this.paginator;
      // this.StudentPaymentDataSource.sort = this.sort;
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
        this.adminService.openSection('teachers');
      }, timeout);
    });
  }
}
