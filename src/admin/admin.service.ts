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
  public studentCourseDetails: boolean = false;
  public studentPaymentDetails: boolean = false;
  public addOrEditStudentCourses: boolean = false;
  public addOrEditStudentPayments: boolean = false;
  public paymentDetails: boolean = false;
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
  public subBatches: boolean = false;
  public addOrEditSubBatches: boolean = false;
  public classSchedule: boolean = false;
  public sessionSchedule: boolean = false;
  public scheduler: boolean = false;
  public zoomMeetings: boolean = false;
  public liveDemo: boolean = false;
  public liveClass: boolean = false;
  public liveSession: boolean = false;
  public counselingSession: boolean = false;
  public interview: boolean = false;
  public manageSegment: boolean = false;
  public editSegment: boolean = false;
  public addOrEditCourse: boolean = false;
  public subCourse: boolean = false;
  public addOrEditSubCourse = false;
  

  public scheduleLiveDemo: boolean = false;
  public scheduleLiveClass: boolean = false;
  public scheduleLiveSession: boolean = false;
  public scheduleCounsellingSession: boolean = false;
  public scheduleInterview: boolean = false;

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
  public PaymentDetailsList: any[] = [];
  public upcomingInterviewsList: any[] = [];
  public upcomingCounsellingList: any[] = [];
  public upcomingLiveSessionsList: any[] = [];
  public upcomingLiveClasssList: any[] = [];
  public studentPaymentsList: any[] = [];
  
  //Other required fields
  public signOut: boolean = false;
  public currentUser: any;
  public counsellorsCount: number = 0;
  public teachersCount: number = 0;
  public studentsCount: number = 0;
  public editCounselorObj: any = null;
  public editTeacherObj: any = null;
  public currentImage: any = null;
  public currentEditId: string = '';
  public currentAddId: string = '';
  public url: any;
  public editCourseObj: any = null;

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
    this.subBatches = false;
    this.classSchedule = false;
    this.sessionSchedule = false;
    this.manageCourses = false;
    this.teacherCourses = false;
    this.addEditTeacherCourses = false;
    this.paymentDetails = false;
    this.addOrEditSubBatches = false;
    this.liveClass = false;
    this.liveDemo = false;
    this.liveSession = false;
    this.counselingSession = false;
    this.interview = false;
    this.scheduleLiveClass = false;
    this.scheduleLiveDemo = false;
    this.scheduleLiveSession = false;
    this.scheduleCounsellingSession = false;
    this.scheduleInterview = false;
    this.studentCourseDetails = false;
    this.studentPaymentDetails = false;
    this.addOrEditStudentCourses = false;
    this.addOrEditStudentPayments = false;
    this.manageSegment = false;
    this.editSegment = false;
    this.addOrEditCourse = false;
    this.subCourse = false;
    this.addOrEditSubCourse = false;

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
      case 'studentCourseDetails':
        this.studentCourseDetails = true;
        break;
      case 'studentPaymentDetails':
        this.studentPaymentDetails = true;
        break;
      case 'addOrEditStudentCourses':
        this.addOrEditStudentCourses = true;
        break;
      case 'addOrEditStudentPayments':
        this.addOrEditStudentPayments = true;
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
        case 'manageSegment':
          this.manageSegment = true;
          break;
          case 'editSegment':
            this.editSegment = true;
            break;
        case 'manageCourses':
        this.manageCourses = true;
        break;
        case 'addOrEditCourse':
          this.addOrEditCourse = true;
          break;
        case 'subCourse':
          this.subCourse = true;
          break;
        case 'addOrEditSubCourse':
          this.addOrEditSubCourse = true;
          break;  
      case 'scheduler':
        case 'batches':
        this.batches = true;
        break;
      case 'addOrEditBatches':
        this.addOrEditBatches = true;
        break;
      case 'subBatches':
        this.subBatches = true;
        break;
      case 'addOrEditSubBatches':
        this.addOrEditSubBatches = true;
        break;
      case 'classSchedule':
        this.classSchedule = true;
        break;
      case 'sessionSchedule':
        this.sessionSchedule = true;
        break;
      case 'teacherCourses':
        this.teacherCourses = true;
        break;
      case 'addEditTeacherCourses':
        this.addEditTeacherCourses = true;
        break;
      case 'paymentDetails':
        this.paymentDetails = true;
        break;
      case 'interview':
        this.interview = true;
        break;
      case 'liveDemo':
        this.liveDemo = true;
        break;
      case 'zoomMeetings':
      case 'liveClass':
        this.liveClass = true;
        break;
      case 'liveSession':
        this.liveSession = true;
        break;
      case 'counselingSession':
        this.counselingSession = true;
        break;
      case 'scheduleInterview':
        this.scheduleInterview = true;
        break;
      case 'scheduleLiveDemo':
        this.scheduleLiveDemo = true;
        break;
      case 'scheduleLiveClass':
        this.scheduleLiveClass = true;
        break;
      case 'scheduleLiveSession':
        this.scheduleLiveSession = true;
        break;
      case 'scheduleCounsellingSession':
        this.scheduleCounsellingSession = true;
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

  public getSubBatchDetails(){
    if(localStorage.getItem('currentUser')){
      this.appService.getSubBatches().subscribe({
        next: (res) => {  
          this.subBatchesList = res;
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

  public getPaymentDetailsDetails(){
    if(localStorage.getItem('currentUser')){
      this.appService.getPaymentDetails().subscribe({
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

  public getImageByID(id: string){
    if(localStorage.getItem('currentUser')){
      this.appService.getImageById(id).subscribe({
        next: (res: any) => {
          this.url = res.imagePath;
          this.currentImage = res.imagePath;
        },
        error: (err) => {
          console.log(err.message);
        },
      });
    }
  }
}
