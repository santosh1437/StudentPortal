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
  selectedSubBatch: any;
  datas: any;

  @ViewChild('successMsg') successDialog = {} as TemplateRef<any>;
  allBatchData: any;
  constructor(
    public appService: AppService,
    private fb: FormBuilder,
    private dialog: MatDialog,
    public adminService: AdminService
  ) {
    this.addEditSubBatchForm = this.fb.group({
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
    this.getSubBatchData();
    this.getSubCourseData();
    this.getTeacherData();
    this.getCounsellorData();
    this.addEditSubBatchForm.patchValue(this.data);
    this.getBatchData();
  }

  getSubBatchData(){
    this.selectedSubBatch = sessionStorage.getItem('setSubBatch');
    this.datas = JSON.parse(this.selectedSubBatch);
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

  getBatchData(){
    this.appService.getBatches().subscribe((res:any)=>{
      this.allBatchData = res;
    })
  }

  onFormSubmit() {
    if (this.addEditSubBatchForm.valid) {
      if (this.data) {
        const editSubBatchData: SubBatch = {
          id: this.data.id,
          bId: this.data.id,
          batchType: this.addEditSubBatchForm.controls['batchType'].value,
          subCourseID: this.addEditSubBatchForm.controls['subCourseID'].value,
          tID: this.addEditSubBatchForm.controls['tID'].value,
          cID: this.addEditSubBatchForm.controls['cID'].value,
          timings: this.addEditSubBatchForm.controls['timings'].value,
          duration: this.addEditSubBatchForm.controls['duration'].value,
          startDate: this.addEditSubBatchForm.controls['startDate'].value,
          daysList: this.addEditSubBatchForm.controls['daysList'].value,
          notes: this.addEditSubBatchForm.controls['notes'].value
        };
        this.editSubBatch(editSubBatchData);
      } else {
        const addSubBatchData: addSubBatch = {
          batchType: this.addEditSubBatchForm.controls['batchType'].value,
          subCourseID: this.addEditSubBatchForm.controls['subCourseID'].value,
          tID: this.addEditSubBatchForm.controls['tID'].value,
          cID: this.addEditSubBatchForm.controls['cID'].value,
          timings: this.addEditSubBatchForm.controls['timings'].value,
          duration: this.addEditSubBatchForm.controls['duration'].value,
          startDate: this.addEditSubBatchForm.controls['startDate'].value,
          daysList: this.addEditSubBatchForm.controls['daysList'].value,
          notes: this.addEditSubBatchForm.controls['notes'].value
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
        this.adminService.openSection('subBatches');
      }, timeout);
    });
  }
}
