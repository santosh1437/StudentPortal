import { ChangeDetectorRef, Component, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatPaginator, MatPaginatorIntl } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { AdminService } from 'src/admin/admin.service';
import { Teachers } from 'src/app/app.model';
import { AppService } from 'src/app/app.service';

@Component({
  selector: 'app-teachers',
  templateUrl: './teachers.component.html',
  styleUrls: ['./teachers.component.css']
})
export class TeachersComponent {
  TeachersSearchDateRange = new FormGroup({
    start: new FormControl<Date | null>(null),
    end: new FormControl<Date | null>(null),
  });
  public tempData: any;
  public displayedColumns = [
    'id',
    'fullName',
    'email',
    'phoneNo',
    'city',
    'password',
    'createdOn'
  ];
  public TeachersDataSource: MatTableDataSource<Teachers>;
  public TeachersData: any;
  @ViewChild(MatSort) sort = new MatSort();
  @ViewChild(MatPaginator) paginator = new MatPaginator(
    new MatPaginatorIntl(),
    ChangeDetectorRef.prototype
  );

  constructor(
    public appService: AppService,
    public adminService: AdminService
    ) {
    this.getTeachersDetails();
    this.TeachersDataSource = new MatTableDataSource(this.TeachersData);
  }

  ngOnInit() {
    this.getTeachersDetails();
  }

  ngAfterViewInit() {
    this.TeachersDataSource.paginator = this.paginator;
    this.TeachersDataSource.sort = this.sort;
  }

  // On filtering with dates
  public getDateRangeFilteredData() {
    const fromDate = this.TeachersSearchDateRange.controls['start'].value;
    const toDate = this.TeachersSearchDateRange.controls['end'].value;
    this.tempData = this.TeachersData;
    let selectedItems: Teachers[] = [];
    if (fromDate && toDate) {
      this.tempData.forEach((item: Teachers) => {
        if (
          new Date(item.createdOn) >= new Date(fromDate) &&
          new Date(item.createdOn) <= new Date(toDate)
        ) {
          selectedItems.push(item);
        }
      });
      this.TeachersDataSource.data = selectedItems;
    }
  }

  // On clicking Show All button
  public showAll() {
    this.TeachersSearchDateRange.reset();
    this.TeachersDataSource.data = this.TeachersData;
  }

  //Search table
  public applySearchFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.TeachersDataSource.filter = filterValue.trim().toLowerCase();
  }

  //get Teachers form details
  private getTeachersDetails() {
    if(localStorage.getItem('currentUser')){
      // this.appService.getTeachersForm().subscribe({
      //   next: (res) => {  
      //     this.TeachersData = res;
      //     this.TeachersDataSource = new MatTableDataSource(
      //       this.TeachersData
      //     );
      //     this.TeachersDataSource.paginator = this.paginator;
      //     this.TeachersDataSource.sort = this.sort;
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
      headers: ['Id', 'Name', 'MailID', 'Phone No', 'Current City', 'Created On']
    };
    const exportData = this.TeachersDataSource.data.map((data) => {
      return {
        id : data.id,
        fullName : data.name,
        email : data.mailID,
        phoneNo : data.phoneNo,
        city : data.currentCity,
        createdOn: data.createdOn
      }
    });
    // new ngxCsv(exportData, 'TeachersDetailsReport', options);
  }
}
