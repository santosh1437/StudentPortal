import { ChangeDetectorRef, Component, TemplateRef, ViewChild } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator, MatPaginatorIntl } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { AdminService } from 'src/admin/admin.service';
import { Counselling } from 'src/app/app.model';
import { AppService } from 'src/app/app.service';

@Component({
  selector: 'app-counseling-session',
  templateUrl: './counseling-session.component.html',
  styleUrls: ['./counseling-session.component.css']
})
export class CounselingSessionComponent {
  public tabSelected: boolean = false;
  public deleteId: string = '';
    public success: boolean = false;
    public err: boolean = false;
    clicked = false;
    CounsellingSearchDateRange = new FormGroup({
      start: new FormControl<Date | null>(null),
      end: new FormControl<Date | null>(null),
    });
    public tempData: any;
    public displayedColumns = [
      'id',
      'student',
      'studentMailID',
      'parentMailID',
      'srCounsellorMailID',
      'coHostMailID',
      'date',
      'time',
      'meetingLink'
    ];
    public CounsellingDataSource: MatTableDataSource<Counselling>;
    public CounsellingData: any;
    @ViewChild(MatSort) sort = new MatSort();
    @ViewChild(MatPaginator) paginator = new MatPaginator(
      new MatPaginatorIntl(),
      ChangeDetectorRef.prototype
    );
    @ViewChild('successMsg') successDialog = {} as TemplateRef<any>;
    // @ViewChild('deleteTeacherConfirm') deleteTeacherConfirmDialog =
    //   {} as TemplateRef<any>;
    dialogRef: any;
  
    constructor(
      public appService: AppService,
      public adminService: AdminService,
      public dialog: MatDialog
    ) {
      this.getCounsellingDetails();
      this.CounsellingDataSource = new MatTableDataSource(
        this.adminService.upcomingCounsellingList
      );
    }
  
    ngOnInit() {
      // this.getCounsellingDetails();
    }
  
    ngAfterViewInit() {
      this.CounsellingDataSource.paginator = this.paginator;
      this.CounsellingDataSource.sort = this.sort;
    }
  
    public closeModal() {
      this.dialogRef.close();
    }
  
    // On filtering with dates
    public getDateRangeFilteredData() {
      const fromDate = this.CounsellingSearchDateRange.controls['start'].value;
      const toDate = this.CounsellingSearchDateRange.controls['end'].value;
      this.tempData = this.CounsellingData;
      let selectedItems: Counselling[] = [];
      if (fromDate && toDate) {
        this.tempData.forEach((item: Counselling) => {
          if (
            new Date(item.date) >= new Date(fromDate) &&
            new Date(item.date) <= new Date(toDate)
          ) {
            selectedItems.push(item);
          }
        });
        this.CounsellingDataSource.data = selectedItems;
      }
    }
  
    // On clicking Show All button
    public showAll() {
      this.CounsellingSearchDateRange.reset();
      this.CounsellingDataSource.data = this.CounsellingData;
    }
  
    //get Counselling form details
    private async getCounsellingDetails() {
      if(localStorage.getItem('currentUser')){
        await this.adminService.getTeacherDetails();
        this.CounsellingData = this.adminService.upcomingCounsellingList;
        this.CounsellingDataSource = new MatTableDataSource(
          this.adminService.upcomingCounsellingList
        );
        this.CounsellingDataSource.paginator = this.paginator;
        this.CounsellingDataSource.sort = this.sort;
      }
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
