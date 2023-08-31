import { ChangeDetectorRef, Component, TemplateRef, ViewChild } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator, MatPaginatorIntl } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { AdminService } from 'src/admin/admin.service';
import { AddCourseToTeacher } from 'src/app/app.model';
import { AppService } from 'src/app/app.service';

@Component({
  selector: 'app-payment-details',
  templateUrl: './payment-details.component.html',
  styleUrls: ['./payment-details.component.css']
})
export class PaymentDetailsComponent {
  public data: any;
  // public addEditPaymentDetailForm: FormGroup;
  public PaymentsData: any;
  public tempData: any;
  public hide: boolean = true;
  public success: boolean = false;
  public err: boolean = false;
  public personalDetails: boolean = true;
  public courseDetails: boolean = false;
  public url: string = "";
  public displayedColumns = [
    'id',
    'sid',
    'totalFee',
    'amountPaid',
    'paidOn',
    'paymentMethod',
    'paymentType',
    'dueAmount',
    'dueDate',
    'comment',
    'edit/delete'
  ];
  PaymentsSearchDateRange = new FormGroup({
    start: new FormControl<Date | null>(null),
    end: new FormControl<Date | null>(null),
  });
  public deleteId: string = '';
  public PaymentDetailDataSource: MatTableDataSource<AddCourseToTeacher>;
  public PaymentDetailsData: any;
  @ViewChild('deletePaymentDetailConfirm') deletePaymentDetailConfirm = {} as TemplateRef<any>;
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
    this.getPaymentDetailsDetails();
    this.PaymentDetailDataSource = new MatTableDataSource(
      this.adminService.PaymentDetailsList
    );
  }
  // constructor(
  //   public appService: AppService,
  //   public adminService: AdminService,
  //   public fb: FormBuilder,
  //   private dialog: MatDialog,
  // ){
  //   this.PaymentDetailDataSource = new MatTableDataSource();
  //   //Add Courses to teacher form
  //   this.addEditPaymentDetailForm = this.fb.group({
  //     segment: new FormControl('',[Validators.required]),
  //     course: new FormControl('', [Validators.required]),
  //     subCourse: new FormControl('', [Validators.required]),
  //     subject: new FormControl('', [Validators.required])
  //   })
  // }
  ngOnInit(): void {
    this.PaymentDetailDataSource = new MatTableDataSource(
      this.adminService.PaymentDetailsList
    );
    // this.addEditPaymentDetailForm.patchValue(this.data);
  }

  ngAfterViewInit() {
    this.PaymentDetailDataSource.paginator = this.paginator;
    this.PaymentDetailDataSource.sort = this.sort;
  }

  // On filtering with dates
  public getDateRangeFilteredData() {
    const fromDate = this.PaymentsSearchDateRange.controls['start'].value;
    const toDate = this.PaymentsSearchDateRange.controls['end'].value;
    this.tempData = this.PaymentsData;
    let selectedItems: any[] = [];
    if (fromDate && toDate) {
      this.tempData.forEach((item: any) => {
        if (
          new Date(item.joinedOn) >= new Date(fromDate) &&
          new Date(item.joinedOn) <= new Date(toDate)
        ) {
          selectedItems.push(item);
        }
      });
      this.PaymentDetailDataSource.data = selectedItems;
    }
  }

  // On clicking Show All button
  public showAll() {
    this.PaymentsSearchDateRange.reset();
    this.PaymentDetailDataSource.data = this.PaymentsData;
  }

  public deletePaymentDetail() {
    this.appService.deleteTeacher(this.deleteId).subscribe({
      next: (res) => {
        this.closeModal();
        this.success = true;
        this.err = false;
        this.successMsgDialog('Teacher deleted Successfully');
        this.getPaymentDetailsDetails();
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
    this.PaymentDetailDataSource.filter = filterValue.trim().toLowerCase();
  }

  openDeletePaymentDetailConfirm(ID:any){
    this.deleteId = ID;
    this.dialogRef = this.dialog.open(this.deletePaymentDetailConfirm , {
      width: 'auto',
    });
  }

  // addEditTeacher(){
  //   if(this.addEditPaymentDetailForm.valid){
  //     if(this.data){
  //       const editPaymentDetailData : AddCourseToTeacher ={
  //         tID: '',
  //         segment: this.addEditPaymentDetailForm.controls['segment'].value,
  //         course: this.addEditPaymentDetailForm.controls['course'].value,
  //         subCourse: this.addEditPaymentDetailForm.controls['subCourse'].value,
  //         subject: this.addEditPaymentDetailForm.controls['subject'].value,
  //       };
  //       this.editPaymentDetails(editPaymentDetailData)
  //     }else{
  //       const addPaymentDetailData : AddCourseToTeacher ={
  //         tID: '',
  //         segment: this.addEditPaymentDetailForm.controls['segment'].value,
  //         course: this.addEditPaymentDetailForm.controls['course'].value,
  //         subCourse: this.addEditPaymentDetailForm.controls['subCourse'].value,
  //         subject: this.addEditPaymentDetailForm.controls['subject'].value,
  //       };
  //       this.addPaymentDetails(addPaymentDetailData);
  //     }
  //   } 
  // }

  // public addPaymentDetails(courses: AddCourseToTeacher){
  //   this.appService.addPaymentDetail(courses).subscribe({
  //     next:(res) => {
  //       this.success = true;
  //       this.err = false;
  //     this.successMsgDialog('Course added to Teacher successfully'); 
  //     },
  //     error: (err) => {
  //       this.err = true;
  //       this.success = false;
  //       this.successMsgDialog(err.message);
  //     }
  //   });
  // }

  // public editPaymentDetails(courses: AddCourseToTeacher){
  //   this.appService.editPaymentDetail(courses).subscribe({
  //     next: (res) => {
  //       console.log(res);
  //       this.success = true;
  //       this.err = false;
  //       this.successMsgDialog('Course updated to Teacher successfully');
  //     },
  //     error: (err) => {
  //       this.err = true;
  //       this.success = false;
  //       this.successMsgDialog(err.message);
  //     },
  //   });
  // }

  //get Payments form details
  private async getPaymentDetailsDetails() {
    // if(localStorage.getItem('currentUser')){
    //   await this.adminService.getPaymentDetailsDetails();
    //   this.PaymentDetailsData = this.adminService.PaymentDetailsList;
    //   this.PaymentDetailDataSource = new MatTableDataSource(
    //     this.adminService.PaymentDetailsList
    //   );
    //   this.PaymentDetailDataSource.paginator = this.paginator;
    //   this.PaymentDetailDataSource.sort = this.sort;
    // }
    this.appService.getPaymentDetails().subscribe((res:any)=>{
         this.PaymentDetailDataSource = new MatTableDataSource(res);
      this.PaymentDetailDataSource.paginator = this.paginator;
      this.PaymentDetailDataSource.sort = this.sort;
    })
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
        this.adminService.openSection('Payments');
      }, timeout);
    });
  }
}
