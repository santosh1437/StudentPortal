import { Component, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { AdminService } from 'src/admin/admin.service';
import { AppService } from 'src/app/app.service';

@Component({
  selector: 'app-add-or-edit-teacher',
  templateUrl: './add-or-edit-teacher.component.html',
  styleUrls: ['./add-or-edit-teacher.component.css']
})
export class AddOrEditTeacherComponent {
  public data = false;
  public addEditTeacherForm: FormGroup;
  public hide: boolean = true;
  public success: boolean = false;
  public err: boolean = false;

  @ViewChild('successMsg') successDialog = {} as TemplateRef<any>;

  constructor(
    public appService: AppService,
    public adminService: AdminService,
    public fb: FormBuilder,
    private dialog: MatDialog
  ){
    this.addEditTeacherForm = this.fb.group({
      fullName: new FormControl('', [Validators.required]),
      // lastName: new FormControl('', [Validators.required]),
      doj: new FormControl('', [Validators.required]),
      phoneNo: new FormControl('', [Validators.required, Validators.pattern("^[0-9\-\+]{9,15}$")]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)] ),
      subject: new FormControl('', [Validators.required]),
      course: new FormControl('', [Validators.required]),
      // isActive: new FormControl('', Validators.required)
    });
  }

  addeditTeacher(){
    this.appService.adTeacher(this.addEditTeacherForm.value).subscribe((res:any)=>{
      this.success = true;
      this.successMsgDialog('Teacher added successfully'); 
    })
    
  }

  public successMsgDialog(msg: string) {
    this.appService.httpClientMsg = msg;
    const timeout = 2000;
    const dialogRef = this.dialog.open(this.successDialog, {
      width: 'auto',
    });
    dialogRef.afterOpened().subscribe((_) => {
      setTimeout(() => {
        dialogRef.close();
        this.adminService.openSection('teachers');
      }, timeout);
    });
  }
}
