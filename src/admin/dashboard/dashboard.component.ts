import { ChangeDetectorRef, Component, TemplateRef, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator, MatPaginatorIntl } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Admin } from 'src/app/app.model';
import { AppService } from 'src/app/app.service';
import { AdminService } from '../admin.service';
import { AddOrEditAdminComponent } from './add-or-edit-admin/add-or-edit-admin.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  @ViewChild(MatSort) sort = new MatSort();
  @ViewChild(MatPaginator) paginator = new MatPaginator(
    new MatPaginatorIntl(),
    ChangeDetectorRef.prototype
  );
  @ViewChild('successMsg') successDialog = {} as TemplateRef<any>;
  @ViewChild('deleteAdminConfirm') deleteAminConfirmDialog = {} as TemplateRef<any>;
  dialogRef: any;
  public adminDataSource: MatTableDataSource<Admin>;
  public deleteId: number = 0;
  public success: boolean = false;
  public err: boolean = false;
  public adminData: any;
  public displayedColumns: any;
  public hide: boolean = true;

  constructor(
    public appService: AppService,
    public adminService: AdminService,
    public dialog: MatDialog
  ) {
    this.getAdminDetails();
    this.adminDataSource = new MatTableDataSource(this.adminData);
  }

  ngOnInit(){
    this.adminService.getTeacherDetails();
    this.adminService.getCounsellorDetails();
    this.adminService.getStudentDetails();
  }

  /*Get and delete operations Admin*/
  private getAdminDetails() {
    this.appService.getAdminDetails().subscribe({
      next: (res) => {
        // Setting up table columns and data based on type of user
        if (this.adminService.currentUser.adminType == "Super Admin") {
          this.displayedColumns = ['id', 'fullName', 'phoneNo', 'userName', 'password', 'edit/delete'];
          this.adminData = res;
          this.adminDataSource = new MatTableDataSource(this.adminData);
        } else {
          this.displayedColumns = ['id', 'fullName', 'phoneNo', 'userName', 'password'];
          this.adminData = [this.adminService.currentUser];
          this.adminDataSource = new MatTableDataSource(this.adminData);
        }
        this.adminDataSource.paginator = this.paginator;
        this.adminDataSource.sort = this.sort;
      },
      error: (error) => {
        console.log(error.error.message);
      },
    });
  }

  public deleteAdmin() {
    this.appService.deleteAdminDetails(this.deleteId).subscribe({
      next: (res) => {
        this.closeModal();
        this.success = true;
        this.err = false;
        this.successMsgDialog('Admin deleted Successfully');
        this.getAdminDetails();
      },
      error: (err) => {
        this.success = false;
        this.err = true;
        this.successMsgDialog('Something went wrong, Please try after some time!');
      },
    });
    this.deleteId = 0;
  }
  /*End of get and delete operations Admin*/

  // Search Admin table
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.adminDataSource.filter = filterValue.trim().toLowerCase();
  }

  // On click of Add Admin button -- open Add Admin modal
  public openAddAdminModal() {
    const dialogRef = this.dialog.open(AddOrEditAdminComponent ,{
      width:'30%',
      exitAnimationDuration:'1000ms',
      enterAnimationDuration:'1000ms',
    });
    dialogRef.afterClosed().subscribe((res) => {
      this.getAdminDetails();
      
    });
  }

  // On click of Edit Admin button -- open Edit Admin modal
  public openEditModal(data: any) {
    const dialogRef = this.dialog.open(AddOrEditAdminComponent, {
      width: '30%',
      exitAnimationDuration: '1000ms',
      enterAnimationDuration: '1000ms',
      data,
    });
    dialogRef.afterClosed().subscribe((res) => {
      this.getAdminDetails();
    });
  }

  //Open Delete Confirmation Modal
  public openDeleteAdminConfirm(id: any) {
    this.deleteId = id;
    this.dialogRef = this.dialog.open(this.deleteAminConfirmDialog, {
      width: 'auto',
    });
  }

  public closeModal() {
    this.dialogRef.close();
  }

  //Success or error msg dialog after form submissions or performing some actions
  public successMsgDialog(msg: string) {
    this.appService.httpClientMsg = msg;
    const timeout = 1000;
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
