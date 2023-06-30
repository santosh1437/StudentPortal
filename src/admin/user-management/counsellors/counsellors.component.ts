import { ChangeDetectorRef, Component, TemplateRef, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatPaginator, MatPaginatorIntl } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { AdminService } from 'src/admin/admin.service';
import { Counsellor } from 'src/app/app.model';
import { AppService } from 'src/app/app.service';
import { AddOrEditCounsellorComponent } from './add-or-edit-counsellor/add-or-edit-counsellor.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-counsellors',
  templateUrl: './counsellors.component.html',
  styleUrls: ['./counsellors.component.css']
})
export class CounsellorsComponent {
  public deleteId: number = 0;
  public success: boolean = false;
  public err: boolean = false;
  CounsellorsSearchDateRange = new FormGroup({
    start: new FormControl<Date | null>(null),
    end: new FormControl<Date | null>(null),
  });
  public tempData: any;
  public displayedColumns = [
    'id',
    'fullName',
    'email',
    'phoneNo',
    'ctype',
    'password',
    'createdOn',
    'edit/delete'
  ];
  public CounsellorsDataSource: MatTableDataSource<Counsellor>;
  public CounsellorsData: any;
  @ViewChild(MatSort) sort = new MatSort();
  @ViewChild(MatPaginator) paginator = new MatPaginator(
    new MatPaginatorIntl(),
    ChangeDetectorRef.prototype
  );

  @ViewChild('successMsg') successDialog = {} as TemplateRef<any>;
  @ViewChild('deleteTeacherConfirm') deleteCounsellerConfirmDialog = {} as TemplateRef<any>;
  dialogRef: any;


  constructor(
    public appService: AppService,
    public adminService: AdminService,
    public dialog: MatDialog
    ) {
    // this.getCounsellorsDetails();
    this.CounsellorsDataSource = new MatTableDataSource(this.CounsellorsData);
  }

  ngOnInit() {
    this.getCounsellorsDetails();
  }

  ngAfterViewInit() {
    this.CounsellorsDataSource.paginator = this.paginator;
    this.CounsellorsDataSource.sort = this.sort;
  }

  // On click of Add Counselling button -- open Add Counselling modal
public openAddCounsellerModal() {
  const dialogRef = this.dialog.open(AddOrEditCounsellorComponent);
  dialogRef.afterClosed().subscribe((res) => {
    this.getCounsellorsDetails();
  });
}

public openEditCounsellerModal(data: any){
  const dialogRef = this.dialog.open(AddOrEditCounsellorComponent,{
    data,
  });
  dialogRef.afterClosed().subscribe((res) => {
    this.getCounsellorsDetails();
  });
}

public openDeleteCounsellerConfirm(ID: any){
  this.deleteId = ID;
  this.dialogRef = this.dialog.open(this.deleteCounsellerConfirmDialog , {
    width: 'auto',
  });
}

public deleteCounseller() {
  this.appService.deleteCounselling(this.deleteId).subscribe({
    next: (res) => {
      this.closeModal();
      this.success = true;
      this.err = false;
      this.successMsgDialog('Counseller deleted Successfully');
      this.getCounsellorsDetails();
    },
    error: (err) => {
      this.success = false;
      this.err = true;
      this.successMsgDialog('Something went wrong, Please try after some time!');
    },
  });
  this.deleteId = 0;
}

public closeModal(){
  this.dialogRef.close();
}
  // On filtering with dates
  public getDateRangeFilteredData() {
    const fromDate = this.CounsellorsSearchDateRange.controls['start'].value;
    const toDate = this.CounsellorsSearchDateRange.controls['end'].value;
    this.tempData = this.CounsellorsData;
    let selectedItems: Counsellor[] = [];
    if (fromDate && toDate) {
      this.tempData.forEach((item: Counsellor) => {
        if (
          new Date(item.createdOn) >= new Date(fromDate) &&
          new Date(item.createdOn) <= new Date(toDate)
        ) {
          selectedItems.push(item);
        }
      });
      this.CounsellorsDataSource.data = selectedItems;
    }
  }

  // On clicking Show All button
  public showAll() {
    this.CounsellorsSearchDateRange.reset();
    this.CounsellorsDataSource.data = this.CounsellorsData;
  }

  //Search table
  public applySearchFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.CounsellorsDataSource.filter = filterValue.trim().toLowerCase();
  }

  //get Teachers form details
  private getCounsellorsDetails() {
    if(localStorage.getItem('currentUser')){
      this.appService.getCounselling().subscribe({
        next: (res) => {  
          this.CounsellorsData = res;
          this.CounsellorsDataSource = new MatTableDataSource(
            this.CounsellorsData
          );
          this.CounsellorsDataSource.paginator = this.paginator;
          this.CounsellorsDataSource.sort = this.sort;
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
    const exportData = this.CounsellorsDataSource.data.map((data) => {
      return {
        id : data.id,
        fullName : data.fullName,
        email : data.email,
        phoneNo : data.phone,
        city : data.currentCity,
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
