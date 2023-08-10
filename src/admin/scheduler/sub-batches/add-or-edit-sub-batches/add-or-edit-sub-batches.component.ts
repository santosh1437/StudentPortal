import { Component, TemplateRef, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { AdminService } from 'src/admin/admin.service';
import { SubBatch, addSubBatch } from 'src/app/app.model';
import { AppService } from 'src/app/app.service';

@Component({
  selector: 'app-add-or-edit-sub-batches',
  templateUrl: './add-or-edit-sub-batches.component.html',
  styleUrls: ['./add-or-edit-sub-batches.component.css']
})
export class AddOrEditSubBatchesComponent {
  public data: any;
  public hide: boolean = true;
  public addEditSubBatchForm: FormGroup;
  public success: boolean = false;
  public err: boolean = false;
  public personalDetails: boolean = true;
  public courseDetails: boolean = false;

  @ViewChild('successMsg') successDialog = {} as TemplateRef<any>;
  constructor(
    public appService: AppService,
    private fb: FormBuilder,
    private dialog: MatDialog,
    public adminService: AdminService
  ) {
    this.addEditSubBatchForm = this.fb.group({
      batchID: new FormControl('', [Validators.required]),
      subject: new FormControl('', [Validators.required]),
      teacher: new FormControl('', Validators.required),
      days: new FormControl('', [Validators.required]),
      startDate: new FormControl('', [Validators.required]),
      notes: new FormControl('')
    });
  }

  ngOnInit(): void {
    // this.data  = {
    //   id:1, bId: "1", course: "SAT", subCourse: "SAT", timings:"10 to 11", startDate: "22/07/2023", currentCity: "Hyderabad", address: "test"
    // }
    this.addEditSubBatchForm.patchValue(this.data);
  }

  public fillNext(){
    this.personalDetails = false;
    this.courseDetails = true;
  }

  onFormSubmit() {
    if (this.addEditSubBatchForm.valid) {
      if (this.data) {
        const editSubBatchData: SubBatch = {
          sbId: this.data.id,
          segment: this.addEditSubBatchForm.controls['segment'].value,
          course: this.addEditSubBatchForm.controls['course'].value,
          subCourse: this.addEditSubBatchForm.controls['subCourse'].value,
          counselor: this.addEditSubBatchForm.controls['counselor'].value,
          startDate: this.addEditSubBatchForm.controls['startDate'].value,
          days: this.addEditSubBatchForm.controls['days'].value,
          timings: this.addEditSubBatchForm.controls['timings'].value,
          notes: this.addEditSubBatchForm.controls['notes'].value,
          teacher: this.addEditSubBatchForm.controls['teacher'].value
        };
        this.editSubBatch(editSubBatchData);
      } else {
        const addSubBatchData: addSubBatch = {
          segment: this.addEditSubBatchForm.controls['segment'].value,
          course: this.addEditSubBatchForm.controls['course'].value,
          subCourse: this.addEditSubBatchForm.controls['subCourse'].value,
          counselor: this.addEditSubBatchForm.controls['counselor'].value,
          startDate: this.addEditSubBatchForm.controls['startDate'].value,
          days: this.addEditSubBatchForm.controls['days'].value,
          timings: this.addEditSubBatchForm.controls['timings'].value,
          notes: this.addEditSubBatchForm.controls['notes'].value,
          teacher: this.addEditSubBatchForm.controls['teacher'].value
        };
        this.addSubBatch(addSubBatchData);
      }
    }
  }

  public addSubBatch(subBatch: addSubBatch) {
    this.appService.addSubBatch(subBatch).subscribe({
      next: (res) => {
        this.success = true;
        this.err = false;
        this.successMsgDialog('SubBatch added successfully');
      },
      error: (err) => {
        this.err = true;
        this.success = false;
        this.successMsgDialog(err.message);
      },
    });
  }

  public editSubBatch(student: SubBatch) {
    this.appService.editSubBatch(student).subscribe({
      next: (res) => {
        this.success = true;
        this.err = false;
        this.successMsgDialog('Sub Batch updated successfully');
      },
      error: (err) => {
        this.err = true;
        this.success = false;
        this.successMsgDialog(err.message);
      },
    });
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
