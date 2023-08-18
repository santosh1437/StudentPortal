import { Component, Inject, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { AppService } from 'src/app/app.service';

@Component({
  selector: 'app-edit-segment',
  templateUrl: './edit-segment.component.html',
  styleUrls: ['./edit-segment.component.css']
})
export class EditSegmentComponent {
  segmentEditForm: any;
  currentSegmentId: any;
  public success: boolean = false;
  public err: boolean = false;
  @ViewChild('successMsg') successDialog = {} as TemplateRef<any>;
  selectedSegment: any;
  selectedSegmentName: any;

  constructor(
    private fb: FormBuilder,
    public appService : AppService,
    // private snackBar: MatSnackBar,
    private dialogRef: MatDialogRef<EditSegmentComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialog: MatDialog
  ){

  }
  ngOnInit(): void{
    
    this.currentSegmentId = this.data.ID;
    console.log(this.currentSegmentId);
    this.segmentEditForm = this.fb.group({
      id: this.currentSegmentId,
      segmentName : this.selectedSegment,
    })
    this.getSelectedSegment();
  }

  getSelectedSegment(){
    this.appService.getSegmentsById(this.currentSegmentId).subscribe((res:any)=>{
      if(res.id === this.currentSegmentId){
        this.selectedSegmentName = res.segmentName;
        this.segmentEditForm.patchValue({
          segmentName : this.selectedSegmentName, 
        })
      }
    })
  }

  updateSegment(){
    this.appService.updateSegments(this.segmentEditForm.value).subscribe({
      next:(res:any)=>{
        this.dialogRef.close(true);
        this.success = true;
        this.err = false;
        this.successMsgDialog('Segment Updated successfully');
      },
      error:(err)=>{
        this.err = true;
        this.success = false;
        this.successMsgDialog(err.message);
      }
    })
  }
  public closeModal(){
    this.dialogRef.close();
  }

  public successMsgDialog(msg: string) {
    this.appService.httpClientMsg = msg;
    const timeout = 750;
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
