import { ChangeDetectorRef, Component, TemplateRef, ViewChild } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator, MatPaginatorIntl } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { SharedService } from 'src/admin/Service/sharedService/shared.service';
import { AdminService } from 'src/admin/admin.service';
import { Student } from 'src/app/app.model';
import { AppService } from 'src/app/app.service';

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.css']
})
export class StudentsComponent {
  public deleteId: string = '';
  public success: boolean = false;
  public err: boolean = false;
  StudentsSearchDateRange = new FormGroup({
    start: new FormControl<Date | null>(null),
    end: new FormControl<Date | null>(null),
  });
  public tempData: any;
  public displayedColumns = [
    'id',
    'name',
    'segment',
    'email',
    'phoneNo',
    'studentType',
    // 'paymentStatus',
    // 'dueDate',
    'edit/delete'
  ];
  public StudentsDataSource: MatTableDataSource<Student>;
  public StudentsData: any;
  @ViewChild(MatSort) sort = new MatSort();
  @ViewChild(MatPaginator) paginator = new MatPaginator(
    new MatPaginatorIntl(),
    ChangeDetectorRef.prototype
  );
  @ViewChild('deleteTeacherConfirm') deleteStudentConfirmDialog =
    {} as TemplateRef<any>;
  dialogRef: any;
  @ViewChild('successMsg') successDialog = {} as TemplateRef<any>;

  constructor(
    public appService: AppService,
    public adminService: AdminService,
    public dialog: MatDialog,
    public sharedService : SharedService,
  ) {
    this.getStudentsDetails();
    this.StudentsDataSource = new MatTableDataSource(this.StudentsData);
  }

  ngOnInit() {
    this.getStudentsDetails();
  }

  ngAfterViewInit() {
    this.StudentsDataSource.paginator = this.paginator;
    this.StudentsDataSource.sort = this.sort;
  }

  openAddStudentForm(){
    this.sharedService.openAddStudentForm();
    this.adminService.openSection('addStudents');
    sessionStorage.clear();
  }

  openEditStudentForm(studentData:any){
    this.sharedService.openEditStudentForm(studentData);
    this.adminService.openSection('addStudents');
    sessionStorage.setItem('setStudentData',JSON.stringify(studentData));
  }

  // On filtering with dates
  public getDateRangeFilteredData() {
    const fromDate = this.StudentsSearchDateRange.controls['start'].value;
    const toDate = this.StudentsSearchDateRange.controls['end'].value;
    this.tempData = this.StudentsData;
    let selectedItems: Student[] = [];
    if (fromDate && toDate) {
      // this.tempData.forEach((item: Student) => {
      //   if (
      //     new Date(item.createdOn) >= new Date(fromDate) &&
      //     new Date(item.createdOn) <= new Date(toDate)
      //   ) {
      //     selectedItems.push(item);
      //   }
      // });
      // this.StudentsDataSource.data = selectedItems;
    }
  }

  public closeModal() {
    this.dialogRef.close();
  }

  // On clicking Show All button
  public showAll() {
    this.StudentsSearchDateRange.reset();
    this.StudentsDataSource.data = this.StudentsData;
  }

  //Search table
  public applySearchFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.StudentsDataSource.filter = filterValue.trim().toLowerCase();
  }

  //get Students form details
  private async getStudentsDetails() {
    // if(localStorage.getItem('currentUser')){
    //   await this.adminService.getStudentDetails();
    //   this.StudentsDataSource = new MatTableDataSource(
    //     this.StudentsData
    //   );
    //   this.StudentsDataSource.paginator = this.paginator;
    //   this.StudentsDataSource.sort = this.sort;
    // }
    this.appService.getStudents().subscribe((res: any) => {
      this.StudentsDataSource = new MatTableDataSource(res);
      this.StudentsDataSource.paginator = this.paginator;
      this.StudentsDataSource.sort = this.sort;
    })
  }

  // Delete Student
  public deleteTeacher() {
    this.appService.deleteTeacher(this.deleteId).subscribe({
      next: (res) => {
        this.closeModal();
        this.success = true;
        this.err = false;
        this.successMsgDialog('Teacher deleted Successfully');
        this.getStudentsDetails();
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

  openDeleteStudentConfirm(id: any) {
    this.deleteId = id;
    this.dialogRef = this.dialog.open(this.deleteStudentConfirmDialog, {
      width: 'auto',
    });
  }

  //On clicking Export button, exporting to excel
  ExportTOExcel() {
    var options = {
      fieldSeparator: ',',
      quoteStrings: '"',
      decimalseparator: '.',
      showLabels: true,
      useBom: true,
      headers: ['Id', 'Name', 'MailID', 'Phone No', 'studentType', 'Created On']
    };
    const exportData = this.StudentsDataSource.data.map((data) => {
      return {
        id: data.sID,
        fullName: data.name,
        email: data.email,
        phoneNo: data.phoneNo,
        studentType: data.studentType,
        // createdOn: data.createdOn
      }
    });
    // new ngxCsv(exportData, 'InternalStudentsDetailsReport', options);
  }

  //Success or error msg dialog after form submissions or performing some actions
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
