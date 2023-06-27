import { ChangeDetectorRef, Component, ViewChild } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { MatPaginator, MatPaginatorIntl } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { AdminService } from 'src/admin/admin.service';
import { Students } from 'src/app/app.model';
import { AppService } from 'src/app/app.service';

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.css']
})
export class StudentsComponent {
  StudentsSearchDateRange = new FormGroup({
    start: new FormControl<Date | null>(null),
    end: new FormControl<Date | null>(null),
  });
  public tempData: any;
  public displayedColumns = [
    'id',
    'name',
    'mailID',
    'phoneNo',
    'studentType',
    'createdOn'
  ];
  public StudentsDataSource: MatTableDataSource<Students>;
  public StudentsData: any;
  @ViewChild(MatSort) sort = new MatSort();
  @ViewChild(MatPaginator) paginator = new MatPaginator(
    new MatPaginatorIntl(),
    ChangeDetectorRef.prototype
  );

  constructor(
    public appService: AppService,
    public adminService: AdminService
    ) {
    this.getStudentsDetails();
    this.StudentsDataSource = new MatTableDataSource(this.StudentsData);
  }

  ngOnInit() {
    this.getStudentsDetails();
  }

  ngAfterViewInit() {
    this.StudentsDataSource.paginator = this.paginator;
    this.StudentsDataSource.sort = this.sort;
  }

  // On filtering with dates
  public getDateRangeFilteredData() {
    const fromDate = this.StudentsSearchDateRange.controls['start'].value;
    const toDate = this.StudentsSearchDateRange.controls['end'].value;
    this.tempData = this.StudentsData;
    let selectedItems: Students[] = [];
    if (fromDate && toDate) {
      this.tempData.forEach((item: Students) => {
        if (
          new Date(item.createdOn) >= new Date(fromDate) &&
          new Date(item.createdOn) <= new Date(toDate)
        ) {
          selectedItems.push(item);
        }
      });
      this.StudentsDataSource.data = selectedItems;
    }
  }

  // On clicking Show All button
  public showAll() {
    this.StudentsSearchDateRange.reset();
    this.StudentsDataSource.data = this.StudentsData;
  }

  //Search table
  public applySearchFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.StudentsDataSource.filter = filterValue.trim().toLowerCase();
  }

  //get Students form details
  private getStudentsDetails() {
    if(localStorage.getItem('currentUser')){
      // this.appService.getStudentsForm().subscribe({
      //   next: (res) => {  
      //     this.StudentsData = res;
      //     this.StudentsDataSource = new MatTableDataSource(
      //       this.StudentsData
      //     );
      //     this.StudentsDataSource.paginator = this.paginator;
      //     this.StudentsDataSource.sort = this.sort;
      //   },
      //   error: (err) => {
      //     console.log(err.message);
      //   },
      // });
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
      headers: ['Id', 'Name', 'MailID', 'Phone No','studentType', 'Created On']
    };
    const exportData = this.StudentsDataSource.data.map((data) => {
      return {
        id : data.id,
        name : data.name,
        mailID : data.mailID,
        phoneNo : data.phoneNo,
        studentType: data.studentType,
        createdOn: data.createdOn
      }
    });
    // new ngxCsv(exportData, 'InternalStudentsDetailsReport', options);
  }
}
