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
  selectedBatch: any;
  datas: any;

  // options: string[] = ['Option 1', 'Option 2', 'Option 3', 'Option 4'];
  // selectedOptionsControl = new FormControl<string[]>([]);

  // isOptionSelected(option: string): boolean {
  //   return this.selectedOptionsControl.value?.includes(option) || false;
  // }

  @ViewChild('successMsg') successDialog = {} as TemplateRef<any>;
  constructor(
    public appService: AppService,
    private fb: FormBuilder,
    private dialog: MatDialog,
    public adminService: AdminService
  ) {
    this.addEditBatchForm = this.fb.group({
      batchType: new FormControl('', [Validators.required]),
      subCourseID: new FormControl('', [Validators.required]),
      tID: new FormControl('', Validators.required),
      cID: new FormControl('', [Validators.required]),
      timings: new FormControl('', Validators.required),
      duration: new FormControl('', [Validators.required]),
      startDate: new FormControl('', [Validators.required]),
      daysList: new FormControl('', Validators.required),
      notes: '',
    });
  }

  ngOnInit(): void {
    // this.data  = {
    //   id:1, bId: "1", course: "SAT", subCourse: "SAT", timings:"10 to 11", startDate: "22/07/2023", currentCity: "Hyderabad", address: "test"
    // }
    this.getBachData();
    this.getSubCourseData();
    this.getTeacherData();
    this.getCounsellorData();
    this.addEditBatchForm.patchValue(this.data);
  }

  getBachData(){
    this.selectedBatch = sessionStorage.getItem('setBatchData');
    this.datas = JSON.parse(this.selectedBatch);
    this.data = this.datas;
  }

  subCourseData: any;
  getSubCourseData(){
    this.appService.getSubCourse().subscribe((res:any)=>{
      this.subCourseData = res;
    })
  }

  teacherData: any;
  getTeacherData(){
    this.appService.getTeacher().subscribe((res:any)=>{
      this.teacherData = res;
    })
  }

  counsellorData: any;
  getCounsellorData(){
    this.appService.getCounselor().subscribe((res:any)=>{
      this.counsellorData = res;
    })
  }

  public fillNext(){
    this.personalDetails = false;
    this.courseDetails = true;
  }


  onFormSubmit() {
    if (this.addEditBatchForm.valid) {
      if (this.data) {
        const editBatchData: Batch = {
          id: this.data.id,
          bId: this.data.id,
          batchType: this.addEditBatchForm.controls['batchType'].value,
          subCourseID: this.addEditBatchForm.controls['subCourseID'].value,
          tID: this.addEditBatchForm.controls['tID'].value,
          cID: this.addEditBatchForm.controls['cID'].value,
          timings: this.addEditBatchForm.controls['timings'].value,
          duration: this.addEditBatchForm.controls['duration'].value,
          startDate: this.addEditBatchForm.controls['startDate'].value,
          daysList: this.addEditBatchForm.controls['daysList'].value,
          notes: this.addEditBatchForm.controls['notes'].value
        };
        this.editBatch(editBatchData);
      } else {
        const addBatchData: addBatch = {
          batchType: this.addEditBatchForm.controls['batchType'].value,
          subCourseID: this.addEditBatchForm.controls['subCourseID'].value,
          tID: this.addEditBatchForm.controls['tID'].value,
          cID: this.addEditBatchForm.controls['cID'].value,
          timings: this.addEditBatchForm.controls['timings'].value,
          duration: this.addEditBatchForm.controls['duration'].value,
          startDate: this.addEditBatchForm.controls['startDate'].value,
          daysList: this.addEditBatchForm.controls['daysList'].value,
          notes: this.addEditBatchForm.controls['notes'].value
        };
        this.addBatch(addBatchData);
      }
    }
  }

  public addBatch(batch: addBatch) {
    this.appService.addBatch(batch).subscribe({
      next: (res) => {
        console.log(res);
        this.success = true;
        this.err = false;
        this.adminService.openSection('batches');
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
        this.adminService.openSection('batches');
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
