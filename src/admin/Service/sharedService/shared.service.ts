import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
public data : any;
  constructor() { }
  openAddStudentForm(){
    this.data = null;
  }
  openEditStudentForm(studentData: any){
    this.data = studentData;
  }

  openAddCounsellorForm(){
    this.data = null;
  }
  openEditCounsellorForm(counsellorData: any){
    this.data = counsellorData;
  }

  openAddBatchForm(){
    this.data = null;
  }
  openEditBatchForm(batchData : any){
    this.data = batchData;
  }

  openAddSubBatchForm(){
    this.data = null;
  }
  openEditSubBatchForm(subBatch:any){
    this.data = subBatch;
  }

  openAddTeacherForm(){
    this.data = null;
  }
  openEditTeacherForm(teacherData: any){
    this.data = teacherData;
  }

  openAddTeacherCourseForm(){
    this.data = null ;
  }
  openEditTeacherCourseForm(teacherCourseData : any){
    this.data = teacherCourseData;
  }

  openAddStudentCourseForm(){
    this.data = null ;
  }
  openEDitStudentCourseForm(studentCourse: any){
    this.data = studentCourse ;
  }

  openAddPaymentForm(){
    this.data = null;
  }
  openEditPayemtForm(payment: any){
    this.data = payment;
  }
}
