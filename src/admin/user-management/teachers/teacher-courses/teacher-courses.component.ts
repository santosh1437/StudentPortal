import { ChangeDetectorRef, Component, TemplateRef, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator, MatPaginatorIntl } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { SharedService } from 'src/admin/Service/sharedService/shared.service';
import { AdminService } from 'src/admin/admin.service';
import { AddCourseToTeacher } from 'src/app/app.model';
import { AppService } from 'src/app/app.service';

@Component({
  selector: 'app-teacher-courses',
  templateUrl: './teacher-courses.component.html',
  styleUrls: ['./teacher-courses.component.css']
})
export class TeacherCoursesComponent {
  public data: any;
  // public addEditTeacherCourseForm: FormGroup;
  public hide: boolean = true;
  public success: boolean = false;
  public err: boolean = false;
  public personalDetails: boolean = true;
  public courseDetails: boolean = false;
  public url: string = "";
  public displayedColumns = [
    'id',
    'teacher',
    'course',
    'edit/delete'
  ];
  public deleteId: any = '';
  public TeacherCourseDataSource: MatTableDataSource<AddCourseToTeacher>;
  public TeacherCoursesData: any;
  @ViewChild('deleteTeacherCourseConfirm') deleteTeacherCourseConfirm = {} as TemplateRef<any>;
  @ViewChild('successMsg') successDialog = {} as TemplateRef<any>;
  dialogRef: any;
  @ViewChild(MatSort) sort = new MatSort();
  @ViewChild(MatPaginator) paginator = new MatPaginator(
    new MatPaginatorIntl(),
    ChangeDetectorRef.prototype
  );

  constructor(
    public appService: AppService,
    public adminService: AdminService,
    public dialog: MatDialog,
    public sharedService : SharedService,
  ) {
    this.getTeacherCoursesDetails();
    this.TeacherCourseDataSource = new MatTableDataSource(
      this.adminService.teacherCoursesList
    );
  }
  // constructor(
  //   public appService: AppService,
  //   public adminService: AdminService,
  //   public fb: FormBuilder,
  //   private dialog: MatDialog,
  // ){
  //   this.TeacherCourseDataSource = new MatTableDataSource();
  //   //Add Courses to teacher form
  //   this.addEditTeacherCourseForm = this.fb.group({
  //     segment: new FormControl('',[Validators.required]),
  //     course: new FormControl('', [Validators.required]),
  //     subCourse: new FormControl('', [Validators.required]),
  //     subject: new FormControl('', [Validators.required])
  //   })
  // }
  ngOnInit(): void {
    this.TeacherCourseDataSource = new MatTableDataSource(
      this.adminService.teacherCoursesList
    );
    // this.addEditTeacherCourseForm.patchValue(this.data);
  }

  ngAfterViewInit() {
    this.TeacherCourseDataSource.paginator = this.paginator;
    this.TeacherCourseDataSource.sort = this.sort;
  }

  openAddTeacherCourseForm(){
    this.sharedService.openAddTeacherCourseForm();
    this.adminService.openSection('addEditTeacherCourses');
    sessionStorage.clear();
  }

  openEditTeacherCourseForm(techerCourse: any){
    this.sharedService.openEditTeacherCourseForm(techerCourse);
    this.adminService.openSection('addEditTeacherCourses');
    sessionStorage.setItem('setTeacherCourse', JSON.stringify(techerCourse));
  }
  
  public deleteTeacherCourse() {
    this.appService.deleteTeacherCourse(this.deleteId).subscribe({
      next: (res) => {
        console.log(res);
        this.closeModal();
        this.success = true;
        this.err = false;
        this.successMsgDialog('Teacher deleted Successfully');
        this.getTeacherCoursesDetails();
      },
      error: (err) => {
        this.closeModal();
        this.success = false;
        this.err = true;
        this.successMsgDialog(
          'Something went wrong, Please try after some time!'
        );
        this.getTeacherCoursesDetails();
      },
    });
    this.deleteId = '';
  }

  public closeModal() {
    this.dialogRef.close();
  }

  //Search table
  public applySearchFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.TeacherCourseDataSource.filter = filterValue.trim().toLowerCase();
  }

  openDeleteTeacherCourseConfirm(ID: any) {
    this.deleteId = ID;
    this.dialogRef = this.dialog.open(this.deleteTeacherCourseConfirm, {
      width: 'auto',
    });
  }

  // addEditTeacher(){
  //   if(this.addEditTeacherCourseForm.valid){
  //     if(this.data){
  //       const editTeacherCourseData : AddCourseToTeacher ={
  //         tID: '',
  //         segment: this.addEditTeacherCourseForm.controls['segment'].value,
  //         course: this.addEditTeacherCourseForm.controls['course'].value,
  //         subCourse: this.addEditTeacherCourseForm.controls['subCourse'].value,
  //         subject: this.addEditTeacherCourseForm.controls['subject'].value,
  //       };
  //       this.editTeacherCourses(editTeacherCourseData)
  //     }else{
  //       const addTeacherCourseData : AddCourseToTeacher ={
  //         tID: '',
  //         segment: this.addEditTeacherCourseForm.controls['segment'].value,
  //         course: this.addEditTeacherCourseForm.controls['course'].value,
  //         subCourse: this.addEditTeacherCourseForm.controls['subCourse'].value,
  //         subject: this.addEditTeacherCourseForm.controls['subject'].value,
  //       };
  //       this.addTeacherCourses(addTeacherCourseData);
  //     }
  //   } 
  // }

  public addTeacherCourses(courses: AddCourseToTeacher) {
    this.appService.addTeacherCourse(courses).subscribe({
      next: (res) => {
        this.success = true;
        this.err = false;
        this.successMsgDialog('Course added to Teacher successfully');
      },
      error: (err) => {
        this.err = true;
        this.success = false;
        this.successMsgDialog(err.message);
      }
    });
  }

  // public editTeacherCourses(courses: AddCourseToTeacher) {
  //   this.appService.editTeacherCourse(courses).subscribe({
  //     next: (res) => {
  //       console.log(res);
  //       this.success = true;
  //       this.err = false;
  //       this.successMsgDialog('Course updated to Teacher successfully');
  //     },
  //     error: (err) => {
  //       this.err = true;
  //       this.success = false;
  //       this.successMsgDialog(err.message);
  //     },
  //   });
  // }

  //get Teachers form details
  private async getTeacherCoursesDetails() {
    if (localStorage.getItem('currentUser')) {
      this.appService.getTeacherCourse().subscribe({
        next: (res) => {
          this.TeacherCourseDataSource = new MatTableDataSource(res);
          this.TeacherCourseDataSource.paginator = this.paginator;
          this.TeacherCourseDataSource.sort = this.sort;
        },
        error: (err)=>{
          console.log(err.message);
        }
      })

    }
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
        this.adminService.openSection('teacherCourses');
      }, timeout);
    });
  }
}
