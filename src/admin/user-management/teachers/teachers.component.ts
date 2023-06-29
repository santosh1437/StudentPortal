import { ChangeDetectorRef, Component, TemplateRef, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatPaginator, MatPaginatorIntl } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { AdminService } from 'src/admin/admin.service';
import { Teachers } from 'src/app/app.model';
import { AppService } from 'src/app/app.service';
import { AddOrEditTeacherComponent } from './add-or-edit-teacher/add-or-edit-teacher.component';
import { MatDialog } from '@angular/material/dialog';
import { catchError, finalize } from 'rxjs';

@Component({
  selector: 'app-teachers',
  templateUrl: './teachers.component.html',
  styleUrls: ['./teachers.component.css'],
})
export class TeachersComponent {
  public deleteId: number = 0;
  public success: boolean = false;
  public err: boolean = false;
  clicked = false;
  TeachersSearchDateRange = new FormGroup({
    start: new FormControl<Date | null>(null),
    end: new FormControl<Date | null>(null),
  });
  public tempData: any;
  public displayedColumns = [
    'id',
    'fullName',
    'email',
    'phoneNo',
    'password',
    'course',
    'subject',
    'status',
    'createdOn',
    'edit/delete',
  ];
  public TeachersDataSource: MatTableDataSource<Teachers>;
  public TeachersData: any;
  @ViewChild(MatSort) sort = new MatSort();
  @ViewChild(MatPaginator) paginator = new MatPaginator(
    new MatPaginatorIntl(),
    ChangeDetectorRef.prototype
  );
  @ViewChild('successMsg') successDialog = {} as TemplateRef<any>;
  @ViewChild('deleteTeacherConfirm') deleteAminConfirmDialog = {} as TemplateRef<any>;
  dialogRef: any;

  constructor(
    public appService: AppService,
    public adminService: AdminService,
    public dialog: MatDialog
    ) {
    this.getTeachersDetails();
    this.TeachersDataSource = new MatTableDataSource(this.TeachersData);
  }

  ngOnInit() {
    this.getTeachersDetails();
  }

  ngAfterViewInit() {
    this.TeachersDataSource.paginator = this.paginator;
    this.TeachersDataSource.sort = this.sort;
  }

  // On click of Add Admin button -- open Add Admin modal
public openAddTeacherModal() {
  const dialogRef = this.dialog.open(AddOrEditTeacherComponent);
  dialogRef.afterClosed().subscribe((res) => {
    this.getTeachersDetails();
  });
}

  // On click of Edit Teacher button -- open Edit Teacher modal
public openEditModal(data: any) {
  const dialogRef = this.dialog.open(AddOrEditTeacherComponent, {
    data,
  });
  dialogRef.afterClosed().subscribe((res) => {
    this.getTeachersDetails();
  });
}

public deleteTeacher() {
  this.appService.deleteTeacher(this.deleteId).subscribe({
    next: (res) => {
      this.closeModal();
      this.success = true;
      this.err = false;
      this.successMsgDialog('Teacher deleted Successfully');
      this.getTeachersDetails();
    },
    error: (err) => {
      this.success = false;
      this.err = true;
      this.successMsgDialog('Something went wrong, Please try after some time!');
    },
  });
  this.deleteId = 0;
}

  openDeleteTeacherConfirm(ID:any){
    this.deleteId = ID;
  this.dialogRef = this.dialog.open(this.deleteAminConfirmDialog , {
    width: 'auto',
  });
  }

  onItemChange(element:any){
    this.appService.editTeachers( element.id).pipe(
      catchError((e) => {
        element.isActive = !element.isActive;
        return e;
      }),
      finalize(() => {
        this.clicked = false;
      })
    )
    .subscribe(data => {
    });
  }

  public closeModal(){
    this.dialogRef.close();
  }

  // On filtering with dates
  public getDateRangeFilteredData() {
    const fromDate = this.TeachersSearchDateRange.controls['start'].value;
    const toDate = this.TeachersSearchDateRange.controls['end'].value;
    this.tempData = this.TeachersData;
    let selectedItems: Teachers[] = [];
    if (fromDate && toDate) {
      this.tempData.forEach((item: Teachers) => {
        if (
          new Date(item.createdOn) >= new Date(fromDate) &&
          new Date(item.createdOn) <= new Date(toDate)
        ) {
          selectedItems.push(item);
        }
      });
      this.TeachersDataSource.data = selectedItems;
    }
  }

  // On clicking Show All button
  public showAll() {
    this.TeachersSearchDateRange.reset();
    this.TeachersDataSource.data = this.TeachersData;
  }

  //Search table
  public applySearchFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.TeachersDataSource.filter = filterValue.trim().toLowerCase();
  }

  //get Teachers form details
  private getTeachersDetails() {
    if(localStorage.getItem('currentUser')){
      this.appService.getTeacher().subscribe({
        next: (res) => {  
          this.TeachersData = res;
          this.TeachersDataSource = new MatTableDataSource(
            this.TeachersData
          );
          this.TeachersDataSource.paginator = this.paginator;
          this.TeachersDataSource.sort = this.sort;
        },
        error: (err) => {
          console.log(err.message);
        },
      });
    }
  }

  //On clicking Export button, exporting to excel
  ExportTOExcel(){
    var options = { 
      fieldSeparator: ',',
      quoteStrings: '"',
      decimalseparator: '.',
      showLabels: true,
      useBom: true,
      headers: ['Id', 'Name', 'MailID', 'Phone No', 'Current City', 'Created On']
    };
    const exportData = this.TeachersDataSource.data.map((data) => {
      return {
        id : data.id,
        fullName : data.fullName,
        email : data.email,
        phoneNo : data.phoneNo,
        subject : data.subject,
        createdOn: data.createdOn
      }
    });
    // new ngxCsv(exportData, 'TeachersDetailsReport', options);
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
