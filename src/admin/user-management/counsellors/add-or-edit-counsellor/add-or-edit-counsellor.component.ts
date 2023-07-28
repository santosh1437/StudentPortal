import { Component, Inject, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { AdminService } from 'src/admin/admin.service';
import { Counsellor, addCounsellor } from 'src/app/app.model';
import { AppService } from 'src/app/app.service';

@Component({
  selector: 'app-add-or-edit-counsellor',
  templateUrl: './add-or-edit-counsellor.component.html',
  styleUrls: ['./add-or-edit-counsellor.component.css']
})
export class AddOrEditCounsellorComponent {
  public data: any;
  public hide: boolean = true;
  public addEditCounsellorForm: FormGroup;
  public success: boolean = false;
  public err: boolean = false;
  @ViewChild('successMsg') successDialog = {} as TemplateRef<any>;
  constructor(
    public appService: AppService,
    private fb: FormBuilder,
    private dialog: MatDialog,
    public adminService: AdminService
  ) {
    this.addEditCounsellorForm = this.fb.group({
      fullName: new FormControl('', [Validators.required]),
      phone: new FormControl('', [Validators.required, Validators.pattern("^[0-9\-\+]{9,15}$")]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(6),
      ]),
      counsellorType: new FormControl('', [Validators.required]),
      address: new FormControl('', Validators.required),
      empEmail: new FormControl('', []),
      empId: new FormControl('',[]),
      joinedOn: new FormControl('',[])
    });
  }

  ngOnInit(): void {
    // this.data = {
    //   id:1, name:"", mailID:"", phoneNo:"", currentCity:"", createdOn: new Date()
    // }
    this.addEditCounsellorForm.patchValue(this.data);
  }

  addEditCousellingDetails() {
    if (this.addEditCounsellorForm.valid) {
      if (this.data) {
        const editCounsellorData: Counsellor = {
          id: this.data.id,
          fullName: this.addEditCounsellorForm.controls['fullName'].value,
          phone: this.addEditCounsellorForm.controls['phone'].value,
          email: this.addEditCounsellorForm.controls['email'].value,
          password: this.addEditCounsellorForm.controls['password'].value,
          isActive: true,
          counsellorType: this.addEditCounsellorForm.controls['counsellorType'].value,
          address: '',
          empId: '',
          empEmail: '',
          joinedOn: new Date(),
          createdOn: new Date()
        };
        this.editAdmin(editCounsellorData);
      } else {
        const addCounsellorData: addCounsellor = {
          fullName: this.addEditCounsellorForm.controls['fullName'].value,
          phone: this.addEditCounsellorForm.controls['phone'].value,
          email: this.addEditCounsellorForm.controls['email'].value,
          // currentCity: '',
          password: this.addEditCounsellorForm.controls['password'].value,
          isActive: true,
          counsellorType: this.addEditCounsellorForm.controls['counsellorType'].value,
          address: '',
          empId: '',
          empEmail: '',
          joinedOn: new Date(),
          createdOn: new Date(),
        };
        this.addCounsellor(addCounsellorData);
      }
    }
  }

  public addCounsellor(counsellor: addCounsellor) {
    this.appService.addCounselor(counsellor).subscribe({
      next: (res) => {
        console.log(res);
        this.success = true;
        this.err = false;
        this.successMsgDialog('Counselor added successfully');
      },
      error: (err) => {
        this.err = true;
        this.success = false;
        this.successMsgDialog(err.message);
      },
    });
  }

  public editAdmin(counsellor: Counsellor) {
    this.appService.editCounselor(counsellor).subscribe({
      next: (res) => {
        this.success = true;
        this.err = false;
        this.successMsgDialog('Counselor updated successfully');
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
