import { ChangeDetectorRef, Component, ViewChild } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { MatPaginator, MatPaginatorIntl } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { AdminService } from 'src/admin/admin.service';
import { Course } from 'src/app/app.model';
import { AppService } from 'src/app/app.service';

@Component({
  selector: 'app-manage-courses',
  templateUrl: './manage-courses.component.html',
  styleUrls: ['./manage-courses.component.css']
})
export class ManageCoursesComponent {
  CoursesSearchDateRange = new FormGroup({
    start: new FormControl<Date | null>(null),
    end: new FormControl<Date | null>(null),
  });
  public tempData: any;
  public displayedColumns = [
    'cId',
    'courseTitle',
    'courseName',
    'description',
    'currentPrice',
    'discountPerc',
    'discountPrice',
    'duration',
    'batches'
  ];
  public CoursesDataSource: MatTableDataSource<Course>;
  public CoursesData: any;
  @ViewChild(MatSort) sort = new MatSort();
  @ViewChild(MatPaginator) paginator = new MatPaginator(
    new MatPaginatorIntl(),
    ChangeDetectorRef.prototype
  );

  constructor(
    public appService: AppService,
    public adminService: AdminService
    ) {
    this.getCoursesDetails();
    this.CoursesDataSource = new MatTableDataSource(this.CoursesData);
  }

  ngOnInit() {
    this.getCoursesDetails();
  }

  ngAfterViewInit() {
    this.CoursesDataSource.paginator = this.paginator;
    this.CoursesDataSource.sort = this.sort;
  }

  // On filtering with dates
  public getDateRangeFilteredData() {
    const fromDate = this.CoursesSearchDateRange.controls['start'].value;
    const toDate = this.CoursesSearchDateRange.controls['end'].value;
    this.tempData = this.CoursesData;
    let selectedItems: Course[] = [];
    if (fromDate && toDate) {
      this.tempData.forEach((item: Course) => {
        if (
          new Date(item.createdOn) >= new Date(fromDate) &&
          new Date(item.createdOn) <= new Date(toDate)
        ) {
          selectedItems.push(item);
        }
      });
      this.CoursesDataSource.data = selectedItems;
    }
  }

  // On clicking Show All button
  public showAll() {
    this.CoursesSearchDateRange.reset();
    this.CoursesDataSource.data = this.CoursesData;
  }

  //Search table
  public applySearchFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.CoursesDataSource.filter = filterValue.trim().toLowerCase();
  }

  //get Courses form details
  private getCoursesDetails() {
    if(localStorage.getItem('currentUser')){
      this.appService.getCourses().subscribe({
        next: (res) => {  
          this.CoursesData = res;
          this.CoursesDataSource = new MatTableDataSource(
            this.CoursesData
          );
          // this.adminService.studentsCount = res.length;
          this.CoursesDataSource.paginator = this.paginator;
          this.CoursesDataSource.sort = this.sort;
        },
        error: (err) => {
          console.log(err.message);
        },
      });
    }
  }
}
