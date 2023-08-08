import { Injectable } from '@angular/core';
import { AddCourseToTeacher, Batch, Counsellor, Course, Student, Teachers, Subject } from 'src/app/app.model';
import { AppService } from 'src/app/app.service';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  // To open particular sections boolean values
  public dashboard: boolean = false;
  public settings: boolean = false;
  public students: boolean = false;
  public addStudents: boolean = false;
  public teachers: boolean = false;
  public addTeachers: boolean = false;
  public teacherCourses: boolean = false;
  public addEditTeacherCourses: boolean = false;
  public counsellors: boolean = false;
  public addEditCounsellors: boolean = false;
  public userManagement: boolean = false;
  public manageCourses: boolean = false;
  public batches :boolean = false;
  public addOrEditBatches: boolean = false;
  public manageSubBatches: boolean = false;
  public classSchedule: boolean = false;
  public sessionSchedule: boolean = false;
  public scheduler: boolean = false;
  public zoomMeetings: boolean = false;

  //Lists
  public teachersList: Teachers[] = [];
  public counselorsList: Counsellor[] = [];
  public studentsList: Student[] = [];
  public batchesList: Batch[] = [];
  public subBatchesList: any = [];
  public teacherCoursesList: AddCourseToTeacher[] = [];
  public coursesList: Course[] = [];
  public subjectsList: Subject[] = [];
  public segmentsList: any[] = [];

  //Other required fields
  public signOut: boolean = false;
  public currentUser: any;
  public counsellorsCount: number = 0;
  public teachersCount: number = 0;
  public studentsCount: number = 0;
  public editCounselorObj: any = null;
  public editTeacherObj: any = null;
  public currentAddImage: any = null;
  public currentEditImage: any = null;

  constructor(private appService: AppService) { }

  // To open section selected (Ex: To open dashboard, zoom meetings etc... on sidenav)
  public openSection(sectionName: string) {
    this.dashboard = false;
    this.teachers = false;
    this.students = false;
    this.counsellors = false;
    this.addTeachers = false;
    this.addStudents = false;
    this.addEditCounsellors = false;
    this.batches = false;
    this.addOrEditBatches = false;
    this.manageSubBatches = false;
    this.classSchedule = false;
    this.sessionSchedule = false;
    this.manageCourses = false;
    this.zoomMeetings = false;
    this.teacherCourses = false;
    this.addEditTeacherCourses = false;

    switch (sectionName) {
      case 'dashboard':
        this.dashboard = true;
        break;
      case 'userManagement':
        case 'students':
        this.students = true;
        break;
      case 'addStudents':
        this.addStudents = true;
        break;
      case 'teachers':
        this.teachers = true;
        break;
      case 'addTeachers':
        this.addTeachers = true;
        break;
      case 'counsellors':
        this.counsellors = true;
        break;
      case 'addEditCounsellors':
        this.addEditCounsellors = true;
        break;
      case 'settings':
        case 'manageCourses':
        this.manageCourses = true;
        break;
      case 'scheduler':
        case 'batches':
        this.batches = true;
        break;
      case 'addOrEditBatches':
        this.addOrEditBatches = true;
        break;
      case 'manageSubBatches':
        this.manageSubBatches = true;
        break;
      case 'classSchedule':
        this.classSchedule = true;
        break;
      case 'sessionSchedule':
        this.sessionSchedule = true;
        break;
      case 'zoomMeetings':
        this.zoomMeetings = true;
        break;
      case 'teacherCourses':
        this.teacherCourses = true;
        break;
      case 'addEditTeacherCourses':
        this.addEditTeacherCourses = true;
        break;
    }
  }

  public getTeacherDetails() {
    if(localStorage.getItem('currentUser')){
      this.appService.getTeacher().subscribe({
        next: (res) => {  
          this.teachersList = res;
          this.teachersCount = res.length;
        },
        error: (err) => {
          console.log(err.message);
        },
      });
    }
  }

  public getCounsellorDetails() {
    if (localStorage.getItem('currentUser')) {
      this.appService.getCounselor().subscribe({
        next: (res) => {
          this.counselorsList = res;
          this.counsellorsCount = res.length;
        },
        error: (err) => {
          console.log(err.message);
        },
      });
    }
  }

  public getStudentDetails() {
    if(localStorage.getItem('currentUser')){
      this.appService.getStudents().subscribe({
        next: (res) => {  
          this.studentsList = res;
          this.studentsCount = res.length;
        },
        error: (err) => {
          console.log(err.message);
        }
      });
    }
  }

  public getBatchDetails(){
    if(localStorage.getItem('currentUser')){
      this.appService.getBatches().subscribe({
        next: (res) => {  
          this.batchesList = res;
        },
        error: (err) => {
          console.log(err.message);
        },
      });
    } 
  }

  public getTeacherCoursesDetails() {
    if(localStorage.getItem('currentUser')){
      this.appService.getTeacher().subscribe({
        next: (res) => {  
          this.teachersList = res;
          this.teachersCount = res.length;
        },
        error: (err) => {
          console.log(err.message);
        },
      });
    }
  }

  public getCoursesList(){
    if(localStorage.getItem('currentUser')){
      this.appService.getCourses().subscribe({
        next: (res) => {  
          this.coursesList = res;
        },
        error: (err) => {
          console.log(err.message);
        },
      });
    }
  }

  public getSegmentsList(){
    if(localStorage.getItem('currentUser')){
      this.appService.getSegments().subscribe({
        next: (res) => {
          for(var i=0;i<res.length;i++) {
            this.segmentsList.push(res.title);
          }
        },
        error: (err) => {
          console.log(err.message);
        },
      });
    }
  }
}
