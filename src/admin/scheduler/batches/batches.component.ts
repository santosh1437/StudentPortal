import { ChangeDetectorRef, Component, TemplateRef, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatPaginator, MatPaginatorIntl } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { AdminService } from 'src/admin/admin.service';
import { Batch } from 'src/app/app.model';
import { AppService } from 'src/app/app.service';
import { MatDialog } from '@angular/material/dialog';
import { catchError, finalize } from 'rxjs';
import { SharedService } from 'src/admin/Service/sharedService/shared.service';

@Component({
  selector: 'app-batches',
  templateUrl: './batches.component.html',
  styleUrls: ['./batches.component.css']
})
export class BatchesComponent {
  public deleteId: string = "0";
  public success: boolean = false;
  public err: boolean = false;
  clicked = false;
  BatchesSearchDateRange = new FormGroup({
    start: new FormControl<Date | null>(null),
    end: new FormControl<Date | null>(null),
  });
  public tempData: any;
  public displayedColumns = [
    'id',
    'bId',
    'subcourseID',
    'btype',
    'tId',
    'cId',
    'days',
    'timings',
    'startDate',
    'durationOfCourse',
    'edit/delete',
  ];
  public BatchesDataSource: MatTableDataSource<Batch>;
  public BatchesData: any;
  getSelectedBatch: any;
  @ViewChild(MatSort) sort = new MatSort();
  @ViewChild(MatPaginator) paginator = new MatPaginator(
    new MatPaginatorIntl(),
    ChangeDetectorRef.prototype
  );
  @ViewChild('successMsg') successDialog = {} as TemplateRef<any>;
  @ViewChild('deleteBatchConfirm') deleteAminConfirmDialog = {} as TemplateRef<any>;
  dialogRef: any;

  constructor(
    public appService: AppService,
    public adminService: AdminService,
    public dialog: MatDialog,
    public sharedService : SharedService,
    ) {
    this.getBatchesDetails();
    this.BatchesDataSource = new MatTableDataSource(this.BatchesData);
  }

  ngOnInit() {
    // this.getBatchesDetails();
  }

  ngAfterViewInit() {
    this.BatchesDataSource.paginator = this.paginator;
    this.BatchesDataSource.sort = this.sort;
  }

  public openAddBatchForm(){
    this.sharedService.openAddBatchForm();
    this.adminService.openSection('addOrEditBatches');
    sessionStorage.clear();
  }

  public openEditBatchForm(batch : any){
    this.sharedService.openEditBatchForm(batch);
    this.adminService.openSection('addOrEditBatches');
    this.getSelectedBatch = sessionStorage.setItem('setBatchData',JSON.stringify(batch));
  }

  public deleteBatch() {
    this.appService.deleteBatch(this.deleteId).subscribe({
      next: (res) => {
        this.closeModal();
        this.success = true;
        this.err = false;
        this.successMsgDialog('Batch deleted Successfully');
        this.getBatchesDetails();
      },
      error: (err) => {
        this.success = false;
        this.err = true;
        this.successMsgDialog('Something went wrong, Please try after some time!');
      },
    });
    this.deleteId = "0";
  }

  openDeleteBatchConfirm(ID:any){
    this.deleteId = ID;
    this.dialogRef = this.dialog.open(this.deleteAminConfirmDialog , {
      width: 'auto',
    });
  }

  onItemChange(element:any){
    this.appService.editBatch( element.id).pipe(
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
    const fromDate = this.BatchesSearchDateRange.controls['start'].value;
    const toDate = this.BatchesSearchDateRange.controls['end'].value;
    this.tempData = this.BatchesData;
    let selectedItems: Batch[] = [];
    if (fromDate && toDate) {
      this.tempData.forEach((item: Batch) => {
        if (
          new Date(item.startDate) >= new Date(fromDate) &&
          new Date(item.startDate) <= new Date(toDate)
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
  private async getBatchesDetails() {
    // if(localStorage.getItem('currentUser')){
    //   await this.adminService.getBatchDetails();
    //   this.BatchesData = this.adminService.batchesList;
    //   this.BatchesDataSource = new MatTableDataSource(
    //     this.BatchesData
    //   );
    //   this.BatchesDataSource.paginator = this.paginator;
    //   this.BatchesDataSource.sort = this.sort;
    // }
    this.appService.getBatches().subscribe((res:any)=>{
      console.log(res);
         this.BatchesDataSource = new MatTableDataSource(res);
      this.BatchesDataSource.paginator = this.paginator;
      this.BatchesDataSource.sort = this.sort;
    })
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
  //   const exportData = this.BatchesDataSource.data.map((data) => {
  //     return {
  //       id : data.id,
  //       fullName : data.fullName,
  //       email : data.email,
  //       phoneNo : data.phoneNo,
  //       subject : data.subject,
  //       createdOn: data.createdOn
  //     }
  //   });
  //   // new ngxCsv(exportData, 'BatchesDetailsReport', options);
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
