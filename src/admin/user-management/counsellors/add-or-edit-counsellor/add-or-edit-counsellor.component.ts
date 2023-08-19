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
    if(this.data){
      this.adminService.getImageByID(this.data.cID);
    }
  }

  onSelect(event:any){
    if(event.target.files[0]){
      let reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);
      reader.onload = (event: any) => {
        this.adminService.url = event.target.result;
      }
      this.adminService.currentImage = event.target.files[0];
    }
  }

  private addOrEditImage(){
    const formData : any = new FormData();
      formData.append('imagefile',  this.adminService.currentImage);
      formData.append('uniqueId',this.data ? this.adminService.currentEditId : this.adminService.currentAddId)
    if(this.data){
      this.appService.editImage(formData).subscribe( {
          next: (res) => {
            console.log(res);
            this.success = true;
            this.err = false;
            this.adminService.openSection('counsellors')
            this.successMsgDialog('Counselor Image updated successfully');
          },
          error: (err) => {
            this.err = true;
            this.success = false;
            this.successMsgDialog(err.message);
          }
      });
    } else{
      this.appService.addImage(formData).subscribe({
          next: (res) => {
            console.log(res);
            this.success = true;
            this.err = false;
            this.adminService.openSection('counsellors')
            this.successMsgDialog('Counselor Image added successfully');
          },
          error: (err) => {
            this.err = true;
            this.success = false;
            this.successMsgDialog(err.message);
          },
      });
    }
  }

  public addEditCousellingDetails() {
    if (this.addEditCounsellorForm.valid) {
      if (this.data) {
        const editCounsellorData: Counsellor = {
<<<<<<< HEAD
          cID: this.data.cID,
=======
          id: this.data.id,
          cID: '',
>>>>>>> 8ec39b4c703e5e1e5863adf7497104bf7d72a7fd
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

  private addCounsellor(counsellor: addCounsellor) {
    this.appService.addCounselor(counsellor).subscribe({
      next: (res) => {
        this.adminService.currentAddId = res.cID;
        console.log(res);
        this.success = true;
        this.err = false;
        this.addOrEditImage();
        this.successMsgDialog('Counselor added successfully');
      },
      error: (err) => {
        this.err = true;
        this.success = false;
        this.successMsgDialog(err.message);
      }
    });
  }

  private editCounsellor(counsellor: Counsellor) {
    this.appService.editCounselor(counsellor).subscribe({
      next: (res) => {
        this.success = true;
        this.err = false;
        this.addOrEditImage();
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
