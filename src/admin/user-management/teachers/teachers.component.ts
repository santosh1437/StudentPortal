import {
  ChangeDetectorRef,
  Component,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatPaginator, MatPaginatorIntl } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { AdminService } from 'src/admin/admin.service';
import { AddCourseToTeacher, Teachers } from 'src/app/app.model';
import { AppService } from 'src/app/app.service';
import { MatDialog } from '@angular/material/dialog';
import { catchError, finalize } from 'rxjs';
import { SharedService } from 'src/admin/Service/sharedService/shared.service';

@Component({
  selector: 'app-teachers',
  templateUrl: './teachers.component.html',
  styleUrls: ['./teachers.component.css'],
})
export class TeachersComponent {
  public deleteId: string = '';
  public success: boolean = false;
  public err: boolean = false;
  selectedTeacher: any;
  clicked = false;
  TeachersSearchDateRange = new FormGroup({
    start: new FormControl<Date | null>(null),
    end: new FormControl<Date | null>(null),
  });
  public tempData: any;
  public displayedColumns = [
    'tID',
    'fullName',
    'email',
    'phone',
    'password',
    'joinedOn',
    'empEmail',
    'empId',
    'edit/delete',
  ];
  public TeachersDataSource: MatTableDataSource<Teachers>;
  public TeachersData: any;
  @ViewChild(MatSort) sort = new MatSort();
  @ViewChild(MatPaginator) paginator = new MatPaginator(
    new MatPaginatorIntl(),
    ChangeDetectorRef.prototype
  );
  @ViewChild('successMsg') successDialog = {} as TemplateRef<any>;
  @ViewChild('deleteTeacherConfirm') deleteTeacherConfirmDialog =
    {} as TemplateRef<any>;
  dialogRef: any;

  constructor(
    public appService: AppService,
    public adminService: AdminService,
    public dialog: MatDialog,
    public sharedService: SharedService,
  ) {
    // this.getTeachersDetails();
    this.TeachersDataSource = new MatTableDataSource(
      this.adminService.teachersList
    );
  }

  ngOnInit() {
    this.getTeachersDetails();
  }

  ngAfterViewInit() {
    this.TeachersDataSource.paginator = this.paginator;
    this.TeachersDataSource.sort = this.sort;
   
  }

  openAddTeacherForm() {
    this.sharedService.openAddTeacherForm();
    this.adminService.openSection('addTeachers');
    sessionStorage.clear();
    this.adminService.url = null;
  }
  openEditTeacherForm(teacherData: any) {
    this.sharedService.openEditTeacherForm(teacherData);
    this.adminService.openSection('addTeachers');
    this.selectedTeacher = sessionStorage.setItem('setTeacher', JSON.stringify(teacherData));
  }

  public deleteTeacher() {
    this.appService.deleteTeacher(this.deleteId).subscribe({
      next: (res) => {
        this.closeModal();
        this.success = true;
        this.err = false;
        this.successMsgDialog('Teacher deleted Successfully');
        this.getTeachersDetails();
        this.adminService.openSection('teachers')
      },
      error: (err) => {
        this.closeModal();
        this.success = false;
        this.err = true;
        this.successMsgDialog(
          'Something went wrong, Please try after some time!'
        );
      },
    });
    this.deleteId = '';
  }

  openDeleteTeacherConfirm(id: any) {
    this.deleteId = id;
    this.dialogRef = this.dialog.open(this.deleteTeacherConfirmDialog, {
      width: 'auto',
    });
  }

  onItemChange(element: any) {
    this.appService
      .editTeacher(element.id)
      .pipe(
        catchError((e) => {
          element.isActive = !element.isActive;
          return e;
        }),
        finalize(() => {
          this.clicked = false;
        })
      )
      .subscribe((data) => { });
  }

  public closeModal() {
    this.dialogRef.close();
  }

  // On filtering with dates
  public getDateRangeFilteredData() {
    const fromDate = this.TeachersSearchDateRange.controls['start'].value;
    const toDate = this.TeachersSearchDateRange.controls['end'].value;
    this.tempData = this.TeachersData;
    let selectedItems: Teachers[] = [];
    if (fromDate && toDate) {
      this.tempData.forEach((item: Teachers) => {
        if (
          new Date(item.joinedOn) >= new Date(fromDate) &&
          new Date(item.joinedOn) <= new Date(toDate)
        ) {
          selectedItems.push(item);
        }
      });
      this.TeachersDataSource.data = selectedItems;
    }
  }

  // On clicking Show All button
  public showAll() {
    this.TeachersSearchDateRange.reset();
    this.TeachersDataSource.data = this.TeachersData;
  }

  //Search table
  public applySearchFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.TeachersDataSource.filter = filterValue.trim().toLowerCase();
  }

  //get Teachers form details
  private async getTeachersDetails() {
    if (localStorage.getItem('currentUser')) {
      this.appService.getTeacher().subscribe({
        next: (res) => {
          this.TeachersDataSource = new MatTableDataSource(res),
            this.TeachersDataSource.paginator = this.paginator;
          this.TeachersDataSource.sort = this.sort;
        },
        error: (err) => {
          console.log(err.message);
        }
      })

    }
  }

  //On clicking Export button, exporting to excel
  ExportTOExcel() {
    var options = {
      fieldSeparator: ',',
      quoteStrings: '"',
      decimalseparator: '.',
      showLabels: true,
      useBom: true,
      headers: ['Id', 'Name', 'MailID', 'Phone No']
    };
    const exportData = this.TeachersDataSource.data.map((data) => {
      return {
        id: data.tID,
        fullName: data.fullName,
        email: data.email,
        phoneNo: data.phone,
      }
    });
    // new ngxCsv(exportData, 'TeachersDetailsReport', options);
  }

  //Success or error msg dialog after form submissions or performing some actions
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
