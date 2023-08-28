import { ChangeDetectorRef, Component, TemplateRef, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator, MatPaginatorIntl } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { AdminService } from 'src/admin/admin.service';
import { AppService } from 'src/app/app.service';
import { AddOrEditSubcourseComponent } from './add-or-edit-subcourse/add-or-edit-subcourse.component';

@Component({
  selector: 'app-subcourse',
  templateUrl: './subcourse.component.html',
  styleUrls: ['./subcourse.component.css']
})
export class SubcourseComponent {
  public displayedColumns = [
    'id',
    'segment',
    'course',
    'subCourse',
    'teachers',
    'batch',
    'action',
    'more',
    
  ];
  // public CourseDataSource = MatTableDataSource<Course>;
  SubCourseDataSource: any;
  public CoursesData : any;
  @ViewChild(MatSort) sort = new MatSort();
  @ViewChild(MatPaginator) paginator = new MatPaginator(
    new MatPaginatorIntl(),
    ChangeDetectorRef.prototype
  );
  @ViewChild('successMsg') successDialog = {} as TemplateRef<any>;
  @ViewChild('deleteCourseConfirm') deleteAminConfirmDialog = {} as TemplateRef<any>;
  @ViewChild('displayCourseDetails') displayedSelectedCourse = {} as TemplateRef<any>;
  dialogRef: any;
  public success: boolean = false;
  public err: boolean = false;
  public deleteId: string = "0";


  constructor(
    public appService: AppService,
    public adminService: AdminService,
    public dialog: MatDialog
    ){
      this.SubCourseDataSource = new MatTableDataSource(this.CoursesData);
    }

  ngOnInit(): void{
    this.getCourseData();
  }

  ngAfterViewInit() {
    this.SubCourseDataSource.paginator = this.paginator;
    this.SubCourseDataSource.sort = this.sort;
  }

  //get course data
  getCourseData(){
    this.appService.getSubCourse().subscribe((res:any)=>{
      this.CoursesData = res;
      this.SubCourseDataSource = new MatTableDataSource(this.CoursesData);
      this.SubCourseDataSource.paginator = this.paginator;
      this.SubCourseDataSource.sort = this.sort;
    })
  }

  //Search table
  public applySearchFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.SubCourseDataSource.filter = filterValue.trim().toLowerCase();
  }

  public closeModal(){
    this.dialogRef.close();
  }
  openAddCourseModal(){
    const dialogRef = this.dialog.open(AddOrEditSubcourseComponent);
    dialogRef.afterClosed().subscribe((res) => {
      this.getCourseData();
    });
  }
  openEditCourseModal(data: any){
    const dialogRef = this.dialog.open(AddOrEditSubcourseComponent,{
      data,
    });
    dialogRef.afterClosed().subscribe((res) => {
      this.getCourseData();
    });
  }
  //delete course
  deleteCourse(){
    this.appService.deleteSubCourse(this.deleteId).subscribe({
      next: (res) => {
        console.log(res);
        this.closeModal();
        this.success = true;
        this.err = false;
        this.successMsgDialog('Course deleted Successfully');
        this.getCourseData();
      },
      error: (err) => {
        this.success = false;
        this.err = true;
        this.successMsgDialog('Something went wrong, Please try after some time!');
        this.closeModal();
      },
    });
    this.deleteId = "0";
  }
  selectedSubCourse:any
  openFormDetails(data:any){
    const dialogRef = this.dialog.open(this.displayedSelectedCourse,{
      width:'50%',
      exitAnimationDuration:'1000ms',
      enterAnimationDuration:'1000ms',
      data,
    });
    this.selectedSubCourse = data;
    console.log(data);
    dialogRef.afterClosed().subscribe((res) => {
      this.getCourseData();
    });
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

  openDeleteBatchConfirm(ID:any){
    this.deleteId = ID;
    this.dialogRef = this.dialog.open(this.deleteAminConfirmDialog , {
      width: 'auto',
    });
  }

  
}
