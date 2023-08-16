import { ChangeDetectorRef, Component, ViewChild } from '@angular/core';
import { MatPaginator, MatPaginatorIntl } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { AdminService } from 'src/admin/admin.service';
import { SessionSchedule } from 'src/app/app.model';
import { AppService } from 'src/app/app.service';

@Component({
  selector: 'app-session-scheduler',
  templateUrl: './session-scheduler.component.html',
  styleUrls: ['./session-scheduler.component.css']
})
export class SessionSchedulerComponent {
  @ViewChild(MatSort) sort = new MatSort();
  @ViewChild(MatPaginator) paginator = new MatPaginator(
    new MatPaginatorIntl(),
    ChangeDetectorRef.prototype
  );
  public sessionDataSource: MatTableDataSource<SessionSchedule>;
  public adminData: any;
  public displayedColumns = [
    'id',
    'deadlineDate',
    'startDate',
    'name',
    'segment',
    'course',
    'subCourse',
    'counsellor',
    'sessionsPerWeek',
    'totalSessions',
    'sessionsRemaining',
    'sessionsTaken',
  ];

  constructor(
    public appService: AppService,
    public adminService: AdminService,
  ) {
    this.getSessionScheduleDetails();
    this.sessionDataSource = new MatTableDataSource(this.adminData);
  }

  ngOnInit(){}

  /*Get Session Schedule*/
  private getSessionScheduleDetails() {
    // this.appService.getSessionScheduleDetails().subscribe({
    //   next: (res) => {
    //     // Setting up table columns and data based on type of user
    //     if (this.adminService.currentUser.adminType == "Super SessionSchedule") {
    //       this.adminData = res;
    //       this.sessionDataSource = new MatTableDataSource(this.adminData);
    //     } else {
    //       this.adminData = [this.adminService.currentUser];
    //       this.sessionDataSource = new MatTableDataSource(this.adminData);
    //     }
    //     this.sessionDataSource.paginator = this.paginator;
    //     this.sessionDataSource.sort = this.sort;
    //   },
    //   error: (error) => {
    //     console.log(error.error.message);
    //   },
    // });
  } 

  // Search SessionSchedule table
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.sessionDataSource.filter = filterValue.trim().toLowerCase();
  }
}
