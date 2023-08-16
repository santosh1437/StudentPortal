import { ChangeDetectorRef, Component, TemplateRef, ViewChild } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator, MatPaginatorIntl } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { AdminService } from 'src/admin/admin.service';
import { Interview } from 'src/app/app.model';
import { AppService } from 'src/app/app.service';

@Component({
  selector: 'app-live-demo',
  templateUrl: './live-demo.component.html',
  styleUrls: ['./live-demo.component.css']
})
export class LiveDemoComponent {
  public tabSelected: boolean = false;
  public deleteId: string = '';
    public success: boolean = false;
    public err: boolean = false;
    clicked = false;
    InterviewSearchDateRange = new FormGroup({
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
    public InterviewDataSource: MatTableDataSource<Interview>;
    public InterviewData: any;
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
      this.getInterviewDetails();
      this.InterviewDataSource = new MatTableDataSource(
        this.adminService.upcomingInterviewsList
      );
    }
  
    ngOnInit() {
      // this.getInterviewDetails();
    }
  
    ngAfterViewInit() {
      this.InterviewDataSource.paginator = this.paginator;
      this.InterviewDataSource.sort = this.sort;
    }
  
    public closeModal() {
      this.dialogRef.close();
    }
  
    // On filtering with dates
    public getDateRangeFilteredData() {
      const fromDate = this.InterviewSearchDateRange.controls['start'].value;
      const toDate = this.InterviewSearchDateRange.controls['end'].value;
      this.tempData = this.InterviewData;
      let selectedItems: Interview[] = [];
      if (fromDate && toDate) {
        this.tempData.forEach((item: Interview) => {
          if (
            new Date(item.date) >= new Date(fromDate) &&
            new Date(item.date) <= new Date(toDate)
          ) {
            selectedItems.push(item);
          }
        });
        this.InterviewDataSource.data = selectedItems;
      }
    }
  
    // On clicking Show All button
    public showAll() {
      this.InterviewSearchDateRange.reset();
      this.InterviewDataSource.data = this.InterviewData;
    }
  
    //get Interview form details
    private async getInterviewDetails() {
      if(localStorage.getItem('currentUser')){
        await this.adminService.getTeacherDetails();
        this.InterviewData = this.adminService.upcomingInterviewsList;
        this.InterviewDataSource = new MatTableDataSource(
          this.adminService.upcomingInterviewsList
        );
        this.InterviewDataSource.paginator = this.paginator;
        this.InterviewDataSource.sort = this.sort;
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
