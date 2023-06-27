import { ChangeDetectorRef, Component, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatPaginator, MatPaginatorIntl } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { AdminService } from 'src/admin/admin.service';
import { Counsellor } from 'src/app/app.model';
import { AppService } from 'src/app/app.service';

@Component({
  selector: 'app-counsellors',
  templateUrl: './counsellors.component.html',
  styleUrls: ['./counsellors.component.css']
})
export class CounsellorsComponent {
  CounsellorsSearchDateRange = new FormGroup({
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
  public CounsellorsDataSource: MatTableDataSource<Counsellor>;
  public CounsellorsData: any;
  @ViewChild(MatSort) sort = new MatSort();
  @ViewChild(MatPaginator) paginator = new MatPaginator(
    new MatPaginatorIntl(),
    ChangeDetectorRef.prototype
  );

  constructor(
    public appService: AppService,
    public adminService: AdminService
    ) {
    // this.getCounsellorsDetails();
    this.CounsellorsDataSource = new MatTableDataSource(this.CounsellorsData);
  }

  ngOnInit() {
    this.getCounsellorsDetails();
  }

  ngAfterViewInit() {
    this.CounsellorsDataSource.paginator = this.paginator;
    this.CounsellorsDataSource.sort = this.sort;
  }

  // On filtering with dates
  public getDateRangeFilteredData() {
    const fromDate = this.CounsellorsSearchDateRange.controls['start'].value;
    const toDate = this.CounsellorsSearchDateRange.controls['end'].value;
    this.tempData = this.CounsellorsData;
    let selectedItems: Counsellor[] = [];
    if (fromDate && toDate) {
      this.tempData.forEach((item: Counsellor) => {
        if (
          new Date(item.createdOn) >= new Date(fromDate) &&
          new Date(item.createdOn) <= new Date(toDate)
        ) {
          selectedItems.push(item);
        }
      });
      this.CounsellorsDataSource.data = selectedItems;
    }
  }

  // On clicking Show All button
  public showAll() {
    this.CounsellorsSearchDateRange.reset();
    this.CounsellorsDataSource.data = this.CounsellorsData;
  }

  //Search table
  public applySearchFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.CounsellorsDataSource.filter = filterValue.trim().toLowerCase();
  }

  //get Teachers form details
  private getCounsellorsDetails() {
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
    const exportData = this.CounsellorsDataSource.data.map((data) => {
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
