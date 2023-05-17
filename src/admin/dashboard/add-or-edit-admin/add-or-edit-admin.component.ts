import { Component, Inject, TemplateRef, ViewChild } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogRef,
} from '@angular/material/dialog';
import { Admin, addAdmin } from 'src/app/app.model';
import { AppService } from 'src/app/app.service';

@Component({
  selector: 'app-add-or-edit-admin',
  templateUrl: './add-or-edit-admin.component.html',
  styleUrls: ['./add-or-edit-admin.component.css'],
})
export class AddOrEditAdminComponent {
  public hide: boolean = true;
  public addEditAdminForm: FormGroup;
  public success: boolean = false;
  public err: boolean = false;
  @ViewChild('successMsg') successDialog = {} as TemplateRef<any>;
  constructor(
    public appService: AppService,
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<AddOrEditAdminComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialog: MatDialog
  ) {
    this.addEditAdminForm = this.fb.group({
      fullName: new FormControl('', [Validators.required]),
      phone: new FormControl('', [Validators.required, Validators.pattern("^[0-9\-\+]{9,15}$")]),
      email: new FormControl('', [Validators.required, Validators.email]),
      adminPassword: new FormControl('', [
        Validators.required,
        Validators.minLength(6),
      ]),
    });
  }

  ngOnInit(): void {
    this.addEditAdminForm.patchValue(this.data);
  }

  onFormSubmit() {
    if (this.addEditAdminForm.valid) {
      if (this.data) {
        const editAdminData: Admin = {
          id: this.data.id,
          fullName: this.addEditAdminForm.controls['fullName'].value,
          phone: this.addEditAdminForm.controls['phone'].value,
          email: this.addEditAdminForm.controls['email'].value,
          adminPassword: this.addEditAdminForm.controls['adminPassword'].value,
          adminType: this.data.adminType 
        };
        this.editAdmin(editAdminData);
      } else {
        const addAdminData: addAdmin = {
          fullName: this.addEditAdminForm.controls['fullName'].value,
          phone: this.addEditAdminForm.controls['phone'].value,
          email: this.addEditAdminForm.controls['email'].value,
          adminPassword: this.addEditAdminForm.controls['adminPassword'].value,
        };
        this.addAdmin(addAdminData);
      }
    }
  }

  public addAdmin(admin: addAdmin) {
    this.appService.addAdminDetails(admin).subscribe({
      next: (res) => {
        this.dialogRef.close(true);
        this.success = true;
        this.err = false;
        this.successMsgDialog('Admin added successfully');
      },
      error: (err) => {
        this.err = true;
        this.success = false;
        this.successMsgDialog(err.message);
      },
    });
  }

  public editAdmin(admin: Admin) {
    this.appService.editAdminDetails(admin).subscribe({
      next: (res) => {
        this.dialogRef.close(true);
        this.success = true;
        this.err = false;
        this.successMsgDialog('Admin updated successfully');
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
