import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Admin, Student, Teachers, addAdmin, addStudent } from './app.model';

@Injectable({
  providedIn: 'root'
})
export class AppService {
  public signOut: boolean = false;
  private baseUrlAPI = "https://edutechex.com/profile/api/api";
  public currentUser: any;
  public httpClientMsg: string ="";

  constructor(private httpClient: HttpClient) { }

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
  addTeacher(teacher:any): Observable<any> {
    return this.httpClient.post<any>(`${this.baseUrlAPI}/Teacher`,teacher);
  }

  //Get Teacher
  getTeacher(){
    return this.httpClient.get<any>(`${this.baseUrlAPI}/Teacher`);
  }

  //Update Teachers
  editTeachers(teacher: Teachers): Observable<any>{
    return this.httpClient.put<any>(`${this.baseUrlAPI}/Teacher/${teacher.id}`, teacher);
  }

  //Delete Teacher
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
}