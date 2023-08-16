import { ChangeDetectorRef, Component, TemplateRef, ViewChild } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator, MatPaginatorIntl } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { AdminService } from 'src/admin/admin.service';
import { LiveSession } from 'src/app/app.model';
import { AppService } from 'src/app/app.service';

@Component({
  selector: 'app-live-session',
  templateUrl: './live-session.component.html',
  styleUrls: ['./live-session.component.css']
})
export class LiveSessionComponent {
  public tabSelected: boolean = false;
  public deleteId: string = '';
    public success: boolean = false;
    public err: boolean = false;
    clicked = false;
    LiveSessionSearchDateRange = new FormGroup({
      start: new FormControl<Date | null>(null),
      end: new FormControl<Date | null>(null),
    });
    public tempData: any;
    public displayedColumns = [
      'id',
      'student',
      'studentMailID',
      'hostMailID',
      'coHostMailID',
      'date',
      'time',
      'meetingLink'
    ];
    public LiveSessionDataSource: MatTableDataSource<LiveSession>;
    public LiveSessionData: any;
    @ViewChild(MatSort) sort = new MatSort();
    @ViewChild(MatPaginator) paginator = new MatPaginator(
      new MatPaginatorIntl(),
      ChangeDetectorRef.prototype
    );
    @ViewChild('successMsg') successDialog = {} as TemplateRef<any>;
    @ViewChild('deleteTeacherConfirm') deleteTeacherConfirmDialog =
      {} as TemplateRef<any>;
    dialogRef: any;
  
    constructor(
      public appService: AppService,
      public adminService: AdminService,
      public dialog: MatDialog
    ) {
      this.getLiveSessionDetails();
      this.LiveSessionDataSource = new MatTableDataSource(
        this.adminService.upcomingLiveSessionsList
      );
    }
  
    ngOnInit() {
      // this.getLiveSessionDetails();
    }
  
    ngAfterViewInit() {
      this.LiveSessionDataSource.paginator = this.paginator;
      this.LiveSessionDataSource.sort = this.sort;
    }
  
    public closeModal() {
      this.dialogRef.close();
    }
  
    // On filtering with dates
    public getDateRangeFilteredData() {
      const fromDate = this.LiveSessionSearchDateRange.controls['start'].value;
      const toDate = this.LiveSessionSearchDateRange.controls['end'].value;
      this.tempData = this.LiveSessionData;
      let selectedItems: LiveSession[] = [];
      if (fromDate && toDate) {
        this.tempData.forEach((item: LiveSession) => {
          if (
            new Date(item.date) >= new Date(fromDate) &&
            new Date(item.date) <= new Date(toDate)
          ) {
            selectedItems.push(item);
          }
        });
        this.LiveSessionDataSource.data = selectedItems;
      }
    }
  
    // On clicking Show All button
    public showAll() {
      this.LiveSessionSearchDateRange.reset();
      this.LiveSessionDataSource.data = this.LiveSessionData;
    }
  
    //get LiveSession form details
    private async getLiveSessionDetails() {
      if(localStorage.getItem('currentUser')){
        await this.adminService.getTeacherDetails();
        this.LiveSessionData = this.adminService.upcomingLiveSessionsList;
        this.LiveSessionDataSource = new MatTableDataSource(
          this.adminService.upcomingLiveSessionsList
        );
        this.LiveSessionDataSource.paginator = this.paginator;
        this.LiveSessionDataSource.sort = this.sort;
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
