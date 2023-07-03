import { ChangeDetectorRef, Component, ViewChild } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { MatPaginator, MatPaginatorIntl } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { AdminService } from 'src/admin/admin.service';
import { Batch } from 'src/app/app.model';
import { AppService } from 'src/app/app.service';

@Component({
  selector: 'app-manage-batches',
  templateUrl: './manage-batches.component.html',
  styleUrls: ['./manage-batches.component.css']
})
export class ManageBatchesComponent {
  BatchesSearchDateRange = new FormGroup({
    start: new FormControl<Date | null>(null),
    end: new FormControl<Date | null>(null),
  });
  public tempData: any;
  public displayedColumns = [
    'cId',
    'courseName',
    'noOfStudents',
    'duration',
    'startedOn',
    'timings'
  ];
  public BatchesDataSource: MatTableDataSource<Batch>;
  public BatchesData: any;
  @ViewChild(MatSort) sort = new MatSort();
  @ViewChild(MatPaginator) paginator = new MatPaginator(
    new MatPaginatorIntl(),
    ChangeDetectorRef.prototype
  );

  constructor(
    public appService: AppService,
    public adminService: AdminService
    ) {
    this.getBatchesDetails();
    this.BatchesDataSource = new MatTableDataSource(this.BatchesData);
  }

  ngOnInit() {
    this.getBatchesDetails();
  }

  ngAfterViewInit() {
    this.BatchesDataSource.paginator = this.paginator;
    this.BatchesDataSource.sort = this.sort;
  }

  // On filtering with dates
  public getDateRangeFilteredData() {
    const fromDate = this.BatchesSearchDateRange.controls['start'].value;
    const toDate = this.BatchesSearchDateRange.controls['end'].value;
    this.tempData = this.BatchesData;
    let selectedItems: Batch[] = [];
    if (fromDate && toDate) {
      this.tempData.forEach((item: Batch) => {
        if (
          new Date(item.createdOn) >= new Date(fromDate) &&
          new Date(item.createdOn) <= new Date(toDate)
        ) {
          selectedItems.push(item);
        }
      });
      this.BatchesDataSource.data = selectedItems;
    }
  }

  // On clicking Show All button
  public showAll() {
    this.BatchesSearchDateRange.reset();
    this.BatchesDataSource.data = this.BatchesData;
  }

  //Search table
  public applySearchFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.BatchesDataSource.filter = filterValue.trim().toLowerCase();
  }

  //get Batches form details
  private getBatchesDetails() {
    if(localStorage.getItem('currentUser')){
      this.appService.getBatches().subscribe({
        next: (res) => {  
          this.BatchesData = res;
          this.BatchesDataSource = new MatTableDataSource(
            this.BatchesData
          );
          // this.adminService.studentsCount = res.length;
          this.BatchesDataSource.paginator = this.paginator;
          this.BatchesDataSource.sort = this.sort;
        },
        error: (err) => {
          console.log(err.message);
        },
      });
    }
  }
}
