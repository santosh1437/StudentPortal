import { ChangeDetectorRef, Component, ViewChild } from '@angular/core';
import { MatPaginator, MatPaginatorIntl } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { AdminService } from 'src/admin/admin.service';
import { ClassSchedule } from 'src/app/app.model';
import { AppService } from 'src/app/app.service';

@Component({
  selector: 'app-class-scheduler',
  templateUrl: './class-scheduler.component.html',
  styleUrls: ['./class-scheduler.component.css']
})
export class ClassSchedulerComponent {
  @ViewChild(MatSort) sort = new MatSort();
  @ViewChild(MatPaginator) paginator = new MatPaginator(
    new MatPaginatorIntl(),
    ChangeDetectorRef.prototype
  );
  public classDataSource: MatTableDataSource<ClassSchedule>;
  public adminData: any;
  public displayedColumns = [
    'id',
    'admissionDate',
    'name',
    'preferredTimings',
    'batchAllocationStatus',
    'allottedTimings',
    'assignBatch',
  ];

  constructor(
    public appService: AppService,
    public adminService: AdminService,
  ) {
    this.getClassScheduleDetails();
    this.classDataSource = new MatTableDataSource(this.adminData);
  }

  ngOnInit(){}

  /*Get Class Schedule*/
  private getClassScheduleDetails() {
    // this.appService.getClassScheduleDetails().subscribe({
    //   next: (res) => {
    //     // Setting up table columns and data based on type of user
    //     if (this.adminService.currentUser.adminType == "Super ClassSchedule") {
    //       this.adminData = res;
    //       this.classDataSource = new MatTableDataSource(this.adminData);
    //     } else {
    //       this.adminData = [this.adminService.currentUser];
    //       this.classDataSource = new MatTableDataSource(this.adminData);
    //     }
    //     this.classDataSource.paginator = this.paginator;
    //     this.classDataSource.sort = this.sort;
    //   },
    //   error: (error) => {
    //     console.log(error.error.message);
    //   },
    // });
  } 

  // Search ClassSchedule table
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.classDataSource.filter = filterValue.trim().toLowerCase();
  }
}
