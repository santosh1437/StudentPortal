import { Component, TemplateRef, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { AdminService } from 'src/admin/admin.service';
import { addBatch, Batch } from 'src/app/app.model';
import { AppService } from 'src/app/app.service';

@Component({
  selector: 'app-add-or-edit-batch',
  templateUrl: './add-or-edit-batch.component.html',
  styleUrls: ['./add-or-edit-batch.component.css']
})
export class AddOrEditBatchComponent {
  public data: any;
  public hide: boolean = true;
  public addEditBatchForm: FormGroup;
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
    this.addEditBatchForm = this.fb.group({
      batchType: new FormControl('', [Validators.required]),
      segment: new FormControl('', [Validators.required]),
      course: new FormControl('', Validators.required),
      subCourse: new FormControl('', [Validators.required, Validators.email]),
      days: new FormControl('', Validators.required),
      timings: new FormControl('', Validators.required),
      counsellor: new FormControl('', Validators.required),
      durationOfCourse: new FormControl('', [Validators.required]),
      startDate: new FormControl('', [Validators.required]),
      notes: new FormControl('')
    });
  }

  ngOnInit(): void {
    // this.data  = {
    //   id:1, bId: "1", course: "SAT", subCourse: "SAT", timings:"10 to 11", startDate: "22/07/2023", currentCity: "Hyderabad", address: "test"
    // }
    this.addEditBatchForm.patchValue(this.data);
  }

  public fillNext(){
    this.personalDetails = false;
    this.courseDetails = true;
  }

  onFormSubmit() {
    if (this.addEditBatchForm.valid) {
      if (this.data) {
        const editBatchData: Batch = {
          bId: this.data.id,
          segment: this.addEditBatchForm.controls['segment'].value,
          course: this.addEditBatchForm.controls['course'].value,
          subCourse: this.addEditBatchForm.controls['subCourse'].value,
          counsellor: this.addEditBatchForm.controls['counsellor'].value,
          startDate: this.addEditBatchForm.controls['startDate'].value,
          days: this.addEditBatchForm.controls['days'].value,
          timings: this.addEditBatchForm.controls['timings'].value,
          durationOfCourse: this.addEditBatchForm.controls['durationOfCourse'].value,
          notes: this.addEditBatchForm.controls['notes'].value
        };
        this.editBatch(editBatchData);
      } else {
        const addBatchData: addBatch = {
          segment: this.addEditBatchForm.controls['segment'].value,
          course: this.addEditBatchForm.controls['course'].value,
          subCourse: this.addEditBatchForm.controls['subCourse'].value,
          counsellor: this.addEditBatchForm.controls['counsellor'].value,
          startDate: this.addEditBatchForm.controls['startDate'].value,
          days: this.addEditBatchForm.controls['days'].value,
          timings: this.addEditBatchForm.controls['timings'].value,
          durationOfCourse: this.addEditBatchForm.controls['durationOfCourse'].value,
          notes: this.addEditBatchForm.controls['notes'].value,
        };
        this.addBatch(addBatchData);
      }
    }
  }

  public addBatch(batch: addBatch) {
    this.appService.addBatch(batch).subscribe({
      next: (res) => {
        this.success = true;
        this.err = false;
        this.successMsgDialog('Batch added successfully');
      },
      error: (err) => {
        this.err = true;
        this.success = false;
        this.successMsgDialog(err.message);
      },
    });
  }

  public editBatch(student: Batch) {
    this.appService.editBatch(student).subscribe({
      next: (res) => {
        this.success = true;
        this.err = false;
        this.successMsgDialog('Batch updated successfully');
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
