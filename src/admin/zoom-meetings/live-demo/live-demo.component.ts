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
      // 'coHostMailID',
      'date',
      'time',
      'meetingLink'
    ];
    public displayedColumnsWithObject =[
       'id',
      'student',
      'studentMailID',
      'hostMailID',
      // 'coHostMailID',
      'date',
      'time',
      'meetingLink'
    ]
    public liveDemoDataSource: any;
    public pastDemoDataSource: any;
    public InterviewData: any;
    // @ViewChild(MatSort) sort = new MatSort();
    // @ViewChild(MatPaginator) paginator = new MatPaginator(
    //   new MatPaginatorIntl(),
    //   ChangeDetectorRef.prototype
    // );

  @ViewChild('empTbSort') empTbSort = new MatSort();
  @ViewChild('empTbSortWithObject') empTbSortWithObject = new MatSort();

  @ViewChild('paginatorFirst')
  paginatorFirst!: new () => MatPaginator;
  @ViewChild('paginatorSecond')
  paginatorSecond!: MatPaginator;
    @ViewChild('successMsg') successDialog = {} as TemplateRef<any>;
    @ViewChild('deleteTeacherConfirm') deleteTeacherConfirmDialog =
      {} as TemplateRef<any>;
    dialogRef: any;
  
    constructor(
      public appService: AppService,
      public adminService: AdminService,
      public dialog: MatDialog
    ) {
      // this.getLiveDemoDetails();
      // this.liveDemoDataSource = new MatTableDataSource(
      //   this.adminService.upcomingInterviewsList
      // );
    }
  
    ngOnInit() {
      // this.getInterviewDetails();
      this.getPastDemoList();
      this.getUpComingList()
    }
  
    ngAfterViewInit() {
      // this.liveDemoDataSource.paginator = this.paginator;
      // this.liveDemoDataSource.sort = this.sort;
      this.empTbSort.disableClear = true;
      this.liveDemoDataSource.sort = this.empTbSort;
      this.liveDemoDataSource.paginator = this.paginatorFirst;

      this.empTbSort.disableClear = true;
      this.pastDemoDataSource.sort = this.empTbSortWithObject;
      this.pastDemoDataSource.paginator = this.paginatorSecond;
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
        this.liveDemoDataSource.data = selectedItems;
      }
    }
  
    // On clicking Show All button
    public showAll() {
      this.InterviewSearchDateRange.reset();
      this.liveDemoDataSource.data = this.InterviewData;
    }
  
    //get Interview form details
    // private async getLiveDemoDetails() {
    //   if(localStorage.getItem('currentUser')){
    //     this.appService.getLiveDemoMeeting().subscribe((res:any)=>{
    //       this.liveDemoDataSource = new MatTableDataSource(
    //       res
    //     );
    //     this.liveDemoDataSource.paginator = this.paginator;
    //     this.liveDemoDataSource.sort = this.sort;
    //     })
    //   }
    // }

    getPastDemoList(){
      if(localStorage.getItem('currentUser')){
        this.appService.getPastLiveDemo().subscribe((res:any)=>{
          this.pastDemoDataSource = new MatTableDataSource(res);
          this.pastDemoDataSource.paginator = this.paginatorSecond;
        this.pastDemoDataSource.sort = this.empTbSortWithObject;
        })
      }
    }

    getUpComingList(){
      if(localStorage.getItem('currentUser')){
        this.appService.getUpComingLiveDemo().subscribe((res:any)=>{
          this.liveDemoDataSource = new MatTableDataSource(res);
          this.liveDemoDataSource.paginator = this.paginatorFirst;
        this.liveDemoDataSource.sort = this.empTbSort;
        })
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
