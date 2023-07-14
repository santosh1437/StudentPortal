import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  public dashboard: boolean = false;
  public settings: boolean = false;
  public students: boolean = false;
  public addStudents: boolean = false;
  public teachers: boolean = false;
  public addTeachers: boolean = false;
  public counsellors: boolean = false;
  public addCounsellors: boolean = false;
  public userManagement: boolean = false;
  public manageCourses: boolean = false;
  public manageBatches :boolean = false;
  public signOut: boolean = false;
  public currentUser: any;
  public counsellorsCount: number = 0;
  public teachersCount: number = 0;
  public studentsCount: number = 0;
  public grade: any = ['K12','ug','pg'];
  public course: any = ['','',''];
  public subCourse: any = [];
  constructor() { }

  public openSection(sectionName: string) {
    this.dashboard = false;
    this.teachers = false;
    this.students = false;
    this.counsellors = false;
    this.addTeachers = false;
    this.addStudents = false;
    this.addCounsellors = false;
    this.manageBatches = false;
    this.manageCourses = false;

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
      case 'addCounsellors':
        this.addCounsellors = true;
        break;
      case 'settings':
        case 'manageCourses':
        this.manageCourses = true;
        break;
      case 'manageBatches':
        this.manageBatches = true;
    }
  }
}
