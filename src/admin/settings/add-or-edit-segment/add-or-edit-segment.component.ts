import { ChangeDetectorRef, Component, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator, MatPaginatorIntl } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { AdminService } from 'src/admin/admin.service';
import { AddSegment } from 'src/app/app.model';
import { AppService } from 'src/app/app.service';
import { EditSegmentComponent } from '../edit-segment/edit-segment.component';

@Component({
  selector: 'app-add-or-edit-segment',
  templateUrl: './add-or-edit-segment.component.html',
  styleUrls: ['./add-or-edit-segment.component.css']
})
export class AddOrEditSegmentComponent {

  public  displayedColumns: string[] = ['position', 'name', 'action'];
  public segmentDataSource: MatTableDataSource<AddSegment>;
  @ViewChild(MatSort) sort = new MatSort();
  @ViewChild(MatPaginator) paginator = new MatPaginator(
    new MatPaginatorIntl(),
    ChangeDetectorRef.prototype
  );
  @ViewChild('successMsg') successDialog = {} as TemplateRef<any>;
  @ViewChild('deleteSegmentConfirm') deleteSegmentConfirmDialog = {} as TemplateRef<any>;
  public segmentData : any;
  public segmentForm: any;
  segmentsData: any;
  deleteId: any;
  dialogRef: any;
  public success: boolean = false;
  public err: boolean = false;

  constructor(
    public appService : AppService,
    public adminService : AdminService,
    public fb: FormBuilder,
    public dialog: MatDialog,
  ){
    this.segmentDataSource = new MatTableDataSource(this.segmentData)
  }

  ngOnInit(): void{
    this.segmentForm = this.fb.group({
      segmentName: ['',[Validators.required]]
    })
    this.getSegmentDetails();
  }

  //Add Segment
 public AddSegment(){
  if(this.segmentForm.valid){
    this.appService.addSegments(this.segmentForm.value).subscribe({
      next:(res:any)=>{
        console.log(res);
        this.getSegmentDetails();
        this.segmentForm.reset();
      },
      error:(err)=>{

      }
    })
  }
  }

  // get Segment form details
  public getSegmentDetails(){
    this.appService.getSegments().subscribe((res:any)=>{
      this.segmentsData = res;

      this.segmentDataSource = new MatTableDataSource(this.segmentsData);
      this.segmentDataSource.paginator = this.paginator;
      this.segmentDataSource.sort = this.sort;
    })
  }

  //Edit Segment
  editSegment(id:any){
    const dialogRef = this.dialog.open(EditSegmentComponent,{
      width:'30%',
      exitAnimationDuration:'1000ms',
      enterAnimationDuration:'1000ms',
      data:{
        ID:id
      }
    })
    dialogRef.afterClosed().subscribe(result => {  
      this.getSegmentDetails();
    });
  }

  //delete segment
  openDeleteSegmentConfirm(id:any){
    this.deleteId = id;
    this.dialogRef = this.dialog.open(this.deleteSegmentConfirmDialog, {
      width: 'auto',
    });
  }

  public closeModal() {
    this.dialogRef.close();
  }

  deleteSegment(){
    this.appService.deleteSegments(this.deleteId).subscribe({
      next: (res) => {
        this.closeModal();
        this.success = true;
        this.err = false;
        this.successMsgDialog('Segment deleted Successfully');
        this.getSegmentDetails();
      },
      error: (err) => {
        this.success = false;
        this.err = true;
        this.successMsgDialog('Something went wrong, Please try after some time!');
        this.closeModal();
      },
    });
    this.deleteId = 0;
  }

  //Success or error msg dialog after form submissions or performing some actions
  public successMsgDialog(msg: string) {
    this.appService.httpClientMsg = msg;
    const timeout = 1000;
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
