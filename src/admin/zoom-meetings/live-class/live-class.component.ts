import { ChangeDetectorRef, Component, TemplateRef, ViewChild } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator, MatPaginatorIntl } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { AdminService } from 'src/admin/admin.service';
import { LiveClass } from 'src/app/app.model';
import { AppService } from 'src/app/app.service';

@Component({
  selector: 'app-live-class',
  templateUrl: './live-class.component.html',
  styleUrls: ['./live-class.component.css']
})
export class LiveClassComponent {
  public tabSelected: boolean = false;
  public deleteId: string = '';
    public success: boolean = false;
    public err: boolean = false;
    clicked = false;
    LiveClassSearchDateRange = new FormGroup({
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
    public LiveClassDataSource: MatTableDataSource<LiveClass>;
    public LiveClassData: any;
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
      this.getLiveClassDetails();
      this.LiveClassDataSource = new MatTableDataSource(
        this.adminService.upcomingLiveClasssList
      );
    }
  
    ngOnInit() {
      // this.getLiveClassDetails();
    }
  
    ngAfterViewInit() {
      this.LiveClassDataSource.paginator = this.paginator;
      this.LiveClassDataSource.sort = this.sort;
    }
  
    public closeModal() {
      this.dialogRef.close();
    }
  
    // On filtering with dates
    public getDateRangeFilteredData() {
      const fromDate = this.LiveClassSearchDateRange.controls['start'].value;
      const toDate = this.LiveClassSearchDateRange.controls['end'].value;
      this.tempData = this.LiveClassData;
      let selectedItems: LiveClass[] = [];
      if (fromDate && toDate) {
        this.tempData.forEach((item: LiveClass) => {
          if (
            new Date(item.date) >= new Date(fromDate) &&
            new Date(item.date) <= new Date(toDate)
          ) {
            selectedItems.push(item);
          }
        });
        this.LiveClassDataSource.data = selectedItems;
      }
    }
  
    // On clicking Show All button
    public showAll() {
      this.LiveClassSearchDateRange.reset();
      this.LiveClassDataSource.data = this.LiveClassData;
    }
  
    //get LiveClass form details
    private async getLiveClassDetails() {
      if(localStorage.getItem('currentUser')){
        await this.adminService.getTeacherDetails();
        this.LiveClassData = this.adminService.upcomingLiveClasssList;
        this.LiveClassDataSource = new MatTableDataSource(
          this.adminService.upcomingLiveClasssList
        );
        this.LiveClassDataSource.paginator = this.paginator;
        this.LiveClassDataSource.sort = this.sort;
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
