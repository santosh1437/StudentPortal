import { Component, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Counsellor, addCounsellor } from 'src/app/app.model';
import { AppService } from 'src/app/app.service';

@Component({
  selector: 'app-add-or-edit-counsellor',
  templateUrl: './add-or-edit-counsellor.component.html',
  styleUrls: ['./add-or-edit-counsellor.component.css']
})
export class AddOrEditCounsellorComponent {
  public hide: boolean = true;
  public addEditCounsellorForm: FormGroup;
  public success: boolean = false;
  public err: boolean = false;
  @ViewChild('successMsg') successDialog = {} as TemplateRef<any>;
  constructor(
    public appService: AppService,
    private fb: FormBuilder,
    // private dialogRef: any,
    // public data: any,
    private dialog: MatDialog
  ) {
    this.addEditCounsellorForm = this.fb.group({
      firstName: new FormControl('', [Validators.required]),
      lastName: new FormControl('', [Validators.required]),
      phoneNo: new FormControl('', [Validators.required, Validators.pattern("^[0-9\-\+]{9,15}$")]),
      mailID: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(6),
      ]),
      currentCity: new FormControl('', [Validators.required]),
      address: new FormControl('', Validators.required)
    });
  }

  ngOnInit(): void {
    // this.data = {
    //   id:1, name:"", mailID:"", phoneNo:"", currentCity:"", createdOn: new Date()
    // }
    // this.addEditCounsellorForm.patchValue(this.data);
  }

  onFormSubmit() {
    if (this.addEditCounsellorForm.valid) {
      // if (this.data) {
      //   const editCounsellorData: Counsellor = {
      //     id: this.data.id,
      //     name: this.addEditCounsellorForm.controls['fullName'].value,
      //     phoneNo: this.addEditCounsellorForm.controls['phone'].value,
      //     mailID: this.addEditCounsellorForm.controls['email'].value,
      //     currentCity: this.addEditCounsellorForm.controls['adminPassword'].value,
      //     createdOn: new Date()
      //   };
      //   this.editAdmin(editCounsellorData);
      // } else {
        const addCounsellorData: addCounsellor = {
          name: this.addEditCounsellorForm.controls['fullName'].value,
          phoneNo: this.addEditCounsellorForm.controls['phone'].value,
          mailID: this.addEditCounsellorForm.controls['email'].value,
          currentCity: this.addEditCounsellorForm.controls['adminPassword'].value,
        };
        this.addAdmin(addCounsellorData);
      // }
    }
  }

  public addAdmin(counsellor: addCounsellor) {
  //   this.appService.addAdminDetails(counsellor).subscribe({
  //     next: (res) => {
  //       this.dialogRef.close(true);
  //       this.success = true;
  //       this.err = false;
  //       this.successMsgDialog('Admin added successfully');
  //     },
  //     error: (err) => {
  //       this.err = true;
  //       this.success = false;
  //       this.successMsgDialog(err.message);
  //     },
  //   });
  }

  public editAdmin(counsellor: Counsellor) {
  //   this.appService.editCounsellorDetails(counsellor).subscribe({
  //     next: (res) => {
  //       this.dialogRef.close(true);
  //       this.success = true;
  //       this.err = false;
  //       this.successMsgDialog('Admin updated successfully');
  //     },
  //     error: (err) => {
  //       this.err = true;
  //       this.success = false;
  //       this.successMsgDialog(err.message);
  //     },
  //   });
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
