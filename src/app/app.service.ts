import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Admin, Student, Counsellor, Teachers, addAdmin, addStudent, addTeachers, Batch, addBatch } from './app.model';
@Injectable({
  providedIn: 'root'
})
export class AppService {
  public signOut: boolean = false;
  private baseUrlAPI = "https://edutechex.com/profile/api/api";
  private zoomBaseUrlApi = "https://api.zoom.us/v2";
  public currentUser: any;
  public httpClientMsg: string ="";

  constructor(private httpClient: HttpClient) { }

  // Admin APIs
  getAuthentication(credentials: any): Observable<any> {
    return this.httpClient.post<any>(
      `${this.baseUrlAPI}/Admin/authenticate`,
      credentials
    );
  }
  
  getAdminDetails(): Observable<any> {
    return this.httpClient.get<any>(`${this.baseUrlAPI}/Admin`);
  }

  addAdminDetails(admin: addAdmin): Observable<any> {
    return this.httpClient.post<any>(`${this.baseUrlAPI}/Admin`, admin);
  }

  editAdminDetails(admin: Admin): Observable<any> {
    return this.httpClient.put<any>(`${this.baseUrlAPI}/Admin/${admin.id}`, admin);
  }

  deleteAdminDetails(id: number): Observable<any> {
    return this.httpClient.delete(`${this.baseUrlAPI}/Admin/${id}`);
  }

  // Add Teacher
  addTeacher(teacher:addTeachers): Observable<any> {
    return this.httpClient.post<any>(`${this.baseUrlAPI}/Teacher`,teacher);
  }

  getTeacher(){
    return this.httpClient.get<any>(`${this.baseUrlAPI}/Teacher`);
  }

  editTeacher(teacher: Teachers): Observable<any>{
    return this.httpClient.put<any>(`${this.baseUrlAPI}/Teacher/${teacher.id}`, teacher);
  }

  deleteTeacher(id: number): Observable<any> {
    return this.httpClient.delete(`${this.baseUrlAPI}/Teacher/${id}`);
  }

  // Student APIs
  getStudents() {
    return this.httpClient.get<any>(`${this.baseUrlAPI}/Student`);
  }

  editStudent(student: Student): Observable<any>{
    return this.httpClient.put<any>(`${this.baseUrlAPI}/Student/${student.id}`, student);
  }

  addStudentDetails(student: addStudent): Observable<any> {
    return this.httpClient.post<any>(`${this.baseUrlAPI}/Student`, student);
  }

  deleteStudent(id: number): Observable<any> {
    return this.httpClient.delete(`${this.baseUrlAPI}/Student/${id}`);
  }

  // Counsellor APIs
  addCounselor(counselling:any): Observable<any> {
    return this.httpClient.post<any>(`${this.baseUrlAPI}/Counsellor`,counselling);
  }
  
  getCounselor(){
    return this.httpClient.get<any>(`${this.baseUrlAPI}/Counsellor`);
  }

  editCounselor(counseller: Counsellor): Observable<any>{
    return this.httpClient.put<any>(`${this.baseUrlAPI}/Counsellor/${counseller.id}`, counseller);
  }

  deleteCounselor(id: number): Observable<any> {
    return this.httpClient.delete(`${this.baseUrlAPI}/Counsellor/${id}`);
  }

  // Batches APIs
  getBatches() {
    return this.httpClient.get<any>(`${this.baseUrlAPI}/Batch`);
  }

  addBatch(batch: addBatch): Observable<any> {
    return this.httpClient.post<any>(`${this.baseUrlAPI}/Batch`, batch);
  }

  editBatch(batch: Batch){
    return this.httpClient.put<any>(`${this.baseUrlAPI}/Student/${batch.bId}`, batch);
  }

  deleteBatch(bId: string){
    return this.httpClient.delete(`${this.baseUrlAPI}/Counsellor/${bId}`);
  }

  // Courses APIs
  getCourses() {
    return this.httpClient.get<any>(`${this.baseUrlAPI}/Courses`);
  }

  //Zoom APIs
  createMeeting(createMeeting: any, userId: any){
    return this.httpClient.post<any>(`${this.zoomBaseUrlApi}//users/${userId}/meetings`,createMeeting);
  }

  getMeeting(meetingId:any) {
    return this.httpClient.get<any>(`${this.zoomBaseUrlApi}/meetings/{meetingId}`);
  }
}