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
  public url: string = "";

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
      joinedOn: new FormControl('',[]),
      currentCity: new FormControl('')
    });
  }

  ngOnInit(): void {
    this.data = this.adminService.editCounselorObj;
    this.addEditCounsellorForm.patchValue(this.data);
  }

  onSelect(event:any){
    if(event.target.files[0]){
      let reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);
      reader.onload = (event: any) => {
        this.url = event.target.result;
      }
      event.files.push({ data: event.files[0], fileName: this.addEditCounsellorForm.controls['fullName'].value });

      this.appService.addImage(event.files[0])
        .subscribe((result: string) => {
          this.url = result;
      });
    }
  }
  addEditCousellingDetails() {
    if (this.addEditCounsellorForm.valid) {
      if (this.data) {
        const editCounsellorData: Counsellor = {
          cID: this.data.cID,
          fullName: this.addEditCounsellorForm.controls['fullName'].value,
          phone: this.addEditCounsellorForm.controls['phone'].value,
          email: this.addEditCounsellorForm.controls['email'].value,
          currentCity: '',
          password: this.addEditCounsellorForm.controls['password'].value,
          isActive: true,
          counsellorType: this.addEditCounsellorForm.controls['counsellorType'].value,
          address: this.addEditCounsellorForm.controls['address'].value,
          empId: this.addEditCounsellorForm.controls['empId'].value,
          empEmail: this.addEditCounsellorForm.controls['empEmail'].value,
          joinedOn: this.addEditCounsellorForm.controls['joinedOn'].value,
          createdOn: new Date()
        };
        this.editCounsellor(editCounsellorData);
      } else {
        const addCounsellorData: addCounsellor = {
          fullName: this.addEditCounsellorForm.controls['fullName'].value,
          phone: this.addEditCounsellorForm.controls['phone'].value,
          email: this.addEditCounsellorForm.controls['email'].value,
          currentCity: '',
          password: this.addEditCounsellorForm.controls['password'].value,
          isActive: true,
          counsellorType: this.addEditCounsellorForm.controls['counsellorType'].value,
          address: this.addEditCounsellorForm.controls['address'].value,
          empId: this.addEditCounsellorForm.controls['empId'].value,
          empEmail: this.addEditCounsellorForm.controls['empEmail'].value,
          joinedOn: this.addEditCounsellorForm.controls['joinedOn'].value,
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

  public editCounsellor(counsellor: Counsellor) {
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
    const timeout = 2500;
    const dialogRef = this.dialog.open(this.successDialog, {
      width: 'auto',
    });
    dialogRef.afterOpened().subscribe((_) => {
      setTimeout(() => {
        dialogRef.close();
        this.adminService.openSection('counsellors');
      }, timeout);
    });
  }
}
