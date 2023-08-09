import { ChangeDetectorRef, Component, TemplateRef, ViewChild } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator, MatPaginatorIntl } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { catchError, finalize } from 'rxjs';
import { AdminService } from 'src/admin/admin.service';
import { SubBatch } from 'src/app/app.model';
import { AppService } from 'src/app/app.service';

@Component({
  selector: 'app-sub-batches',
  templateUrl: './sub-batches.component.html',
  styleUrls: ['./sub-batches.component.css']
})
export class SubBatchesComponent {
  public deleteId: string = "0";
  public success: boolean = false;
  public err: boolean = false;
  clicked = false;
  subBatchesSearchDateRange = new FormGroup({
    start: new FormControl<Date | null>(null),
    end: new FormControl<Date | null>(null),
  });
  public tempData: any;
  public displayedColumns = [
    'sbId',
    'segment',
    'course',
    'subCourse',
    'teacher',
    'days',
    'timings',
    'startDate',
    'noOfStudents',
    'counsellor',
    'edit/delete',
  ];
  public subBatchesDataSource: MatTableDataSource<SubBatch>;
  public subBatchesData: any;
  @ViewChild(MatSort) sort = new MatSort();
  @ViewChild(MatPaginator) paginator = new MatPaginator(
    new MatPaginatorIntl(),
    ChangeDetectorRef.prototype
  );
  @ViewChild('successMsg') successDialog = {} as TemplateRef<any>;
  @ViewChild('deleteSubBatchConfirm') deleteAminConfirmDialog = {} as TemplateRef<any>;
  dialogRef: any;

  constructor(
    public appService: AppService,
    public adminService: AdminService,
    public dialog: MatDialog
    ) {
    this.getSubBatchesDetails();
    this.subBatchesDataSource = new MatTableDataSource(this.subBatchesData);
  }

  ngOnInit() {
    // this.getSubBatchesDetails();
  }

  ngAfterViewInit() {
    this.subBatchesDataSource.paginator = this.paginator;
    this.subBatchesDataSource.sort = this.sort;
  }

  public deleteSubBatch() {
    this.appService.deleteSubBatch(this.deleteId).subscribe({
      next: (res) => {
        this.closeModal();
        this.success = true;
        this.err = false;
        this.successMsgDialog('SubBatch deleted Successfully');
        this.getSubBatchesDetails();
      },
      error: (err) => {
        this.success = false;
        this.err = true;
        this.successMsgDialog('Something went wrong, Please try after some time!');
      },
    });
    this.deleteId = "0";
  }

  openDeleteSubBatchConfirm(ID:any){
    this.deleteId = ID;
  this.dialogRef = this.dialog.open(this.deleteAminConfirmDialog , {
    width: 'auto',
  });
  }

  onItemChange(element:any){
    this.appService.editSubBatch( element.id).pipe(
      catchError((e) => {
        element.isActive = !element.isActive;
        return e;
      }),
      finalize(() => {
        this.clicked = false;
      })
    )
    .subscribe(data => {
    });
  }

  public closeModal(){
    this.dialogRef.close();
  }

  // On filtering with dates
  public getDateRangeFilteredData() {
    const fromDate = this.subBatchesSearchDateRange.controls['start'].value;
    const toDate = this.subBatchesSearchDateRange.controls['end'].value;
    this.tempData = this.subBatchesData;
    let selectedItems: SubBatch[] = [];
    if (fromDate && toDate) {
      this.tempData.forEach((item: SubBatch) => {
        if (
          new Date(item.startDate) >= new Date(fromDate) &&
          new Date(item.startDate) <= new Date(toDate)
        ) {
          selectedItems.push(item);
        }
      });
      this.subBatchesDataSource.data = selectedItems;
    }
  }

  // On clicking Show All button
  public showAll() {
    this.subBatchesSearchDateRange.reset();
    this.subBatchesDataSource.data = this.subBatchesData;
  }

  //Search table
  public applySearchFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.subBatchesDataSource.filter = filterValue.trim().toLowerCase();
  }

  //get SubBatches form details
  private async getSubBatchesDetails() {
    if(localStorage.getItem('currentUser')){
      await this.adminService.getSubBatchDetails();
      this.subBatchesData = this.adminService.subBatchesList;
      this.subBatchesDataSource = new MatTableDataSource(
        this.subBatchesData
      );
      this.subBatchesDataSource.paginator = this.paginator;
      this.subBatchesDataSource.sort = this.sort;
    }
  }

  //On clicking Export button, exporting to excel
  // ExportTOExcel(){
  //   var options = { 
  //     fieldSeparator: ',',
  //     quoteStrings: '"',
  //     decimalseparator: '.',
  //     showLabels: true,
  //     useBom: true,
  //     headers: ['Id', 'Name', 'MailID', 'Phone No', 'Current City', 'Created On']
  //   };
  //   const exportData = this.subBatchesDataSource.data.map((data) => {
  //     return {
  //       id : data.id,
  //       fullName : data.fullName,
  //       email : data.email,
  //       phoneNo : data.phoneNo,
  //       subject : data.subject,
  //       createdOn: data.createdOn
  //     }
  //   });
  //   // new ngxCsv(exportData, 'SubBatchesDetailsReport', options);
  // }

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
