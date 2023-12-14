import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Admin, Student, Counsellor, Teachers, addAdmin, addStudent, addTeachers, Batch, addBatch, AddCourseToTeacher, SubBatch, addSubBatch, AddSegment, addPayment, payment, addCourseStudent, courseStudent, EditCourseToTeacher, addLiveDemoMeetimg } from './app.model';
@Injectable({
  providedIn: 'root'
})
export class AppService {
  public signOut: boolean = false;
  private baseUrlAPI = "https://studentportal.edutechex.com/api";
  // private baseUrlAPI = "https://www.edutechex.com/profile/api/api";
  // https://www.edutechex.com/profile/api
  //while deploying in baseUrlAPI https://www.edutechex.com/profile/api/api
  private edutechApi = "https://api.edutechex.com/api/Segment/GetSegmentList";
  private zoomBaseUrlApi = "https://api.zoom.us/v2";
  public currentUser: any;
  public httpClientMsg: string ="";

  constructor(private httpClient: HttpClient) {}

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
    return this.httpClient.put<any>(`${this.baseUrlAPI}/Teacher/${teacher.tID}`, teacher);
  }

  deleteTeacher(tID: string): Observable<any> {
    return this.httpClient.delete(`${this.baseUrlAPI}/Teacher/${tID}`);
  }

  // Add Courses to teacher
  addTeacherCourse(course: AddCourseToTeacher): Observable<any> {
    return this.httpClient.post<any>(`${this.baseUrlAPI}/TeacherCourse`,course);
  }

  getTeacherCourse(){
    return this.httpClient.get<any>(`${this.baseUrlAPI}/TeacherCourse`);
  }

  editTeacherCourse(course: EditCourseToTeacher): Observable<any>{
    return this.httpClient.put<any>(`${this.baseUrlAPI}/TeacherCourse/${course.id}`, course);
  }

  deleteTeacherCourse(tID: string): Observable<any> {
    return this.httpClient.delete(`${this.baseUrlAPI}/TeacherCourse/${tID}`);
  }
  

  // Student APIs
  getStudents() {
    return this.httpClient.get<any>(`${this.baseUrlAPI}/Student`);
  }

  editStudent(student: Student): Observable<any>{
    return this.httpClient.put<any>(`${this.baseUrlAPI}/Student/${student.sID}`, student);
  }

  addStudent(student:addStudent): Observable<any> {
    return this.httpClient.post<any>(`${this.baseUrlAPI}/Student`,student);
  }
  
  deleteStudent(id: string): Observable<any> {
    return this.httpClient.delete(`${this.baseUrlAPI}/Student/${id}`);
  }

  // Student Course
  addStudentCourse(course: addCourseStudent): Observable<any>{
    return this.httpClient.post<any>(`${this.baseUrlAPI}/studentCourse`,course);
  }
  getStudentCourse(): Observable<any>{
    return this.httpClient.get<any>(`${this.baseUrlAPI}/studentCourse`);
  }
  editStudentCourse(editCourse: courseStudent): Observable<any>{
    return this.httpClient.put<any>(`${this.baseUrlAPI}/studentCourse/${editCourse.id}`,editCourse);
  }
  deleteStudentCourse(id:any){
    return this.httpClient.delete(`${this.baseUrlAPI}/studentCourse/${id}`);
  }

  // Counsellor APIs
  addCounselor(counselling:any): Observable<any> {
    return this.httpClient.post<any>(`${this.baseUrlAPI}/Counsellor`,counselling);
  }
  
  getCounselor(){
    return this.httpClient.get<any>(`${this.baseUrlAPI}/Counsellor`);
  }

  editCounselor(counsellor: Counsellor): Observable<any>{
    return this.httpClient.put<any>(`${this.baseUrlAPI}/Counsellor/${counsellor.cID}`, counsellor);
  }

  deleteCounselor(id: string): Observable<any> {
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
    return this.httpClient.put<any>(`${this.baseUrlAPI}/Batch/${batch.id}`, batch);
  }

  deleteBatch(bId: string){
    return this.httpClient.delete(`${this.baseUrlAPI}/Batch/${bId}`);
  }

  // Sub Batches APIs
  getSubBatches() {
    return this.httpClient.get<any>(`${this.baseUrlAPI}/SubBatch`);
  }

  addSubBatch(subBatch: addSubBatch): Observable<any> {
    return this.httpClient.post<any>(`${this.baseUrlAPI}/SubBatch`, subBatch);
  }

  editSubBatch(subBatch: SubBatch){
    return this.httpClient.put<any>(`${this.baseUrlAPI}/SubBatch/${subBatch.id}`, subBatch);
  }

  deleteSubBatch(bId: string){
    return this.httpClient.delete(`${this.baseUrlAPI}/SubBatch/${bId}`);
  }

  // Image APIs
  addImage(image:any): Observable<any> {
    return this.httpClient.post<any>(`${this.baseUrlAPI}/Image`,image);
  }
  
  getImages(){
    return this.httpClient.get<any>(`${this.baseUrlAPI}/Image`);
  }

  editImage(image: any): Observable<any>{
    return this.httpClient.put<any>(`${this.baseUrlAPI}/Image`, image);
  }

  deleteImage(id: string): Observable<any> {
    return this.httpClient.delete(`${this.baseUrlAPI}/Image/${id}`);
  }

  getImageById(uniqueID: string){
    return this.httpClient.get(`${this.baseUrlAPI}/Image/${uniqueID}`);
  }

  // Courses APIs
  addCourse(course:any): Observable<any> {
    return this.httpClient.post<any>(`${this.baseUrlAPI}/Course`,course);
  }
  
  getCourses() {
    return this.httpClient.get<any>(`${this.baseUrlAPI}/Course`);
  }

  editCourse(course: any): Observable<any>{
    return this.httpClient.put<any>(`${this.baseUrlAPI}/Course`,course);
  }

  deleteCourse(courseID: string): Observable<any> {
    return this.httpClient.delete(`${this.baseUrlAPI}/Course/${courseID}`);
  }

  // SubCOurses API
  addSubCourse(subCourse:any): Observable<any>{
    return this.httpClient.post<any>(`${this.baseUrlAPI}/SubCourse`,subCourse);
  }
  getSubCourse(){
    return this.httpClient.get<any>(`${this.baseUrlAPI}/SubCourse`)
  }
  editSubCourse(subCourse: any): Observable<any> {
    return this.httpClient.put<any>(`${this.baseUrlAPI}/SubCourse`,subCourse);
  }
  deleteSubCourse(ID:any): Observable<any> {
    return this.httpClient.delete(`${this.baseUrlAPI}/SubCourse/${ID}`);
  }


  // Interview APIs
  addInterview(interview:any): Observable<any> {
    return this.httpClient.post<any>(`${this.baseUrlAPI}/Interview`,interview);
  }
  
  getInterviews(){
    return this.httpClient.get<any>(`${this.baseUrlAPI}/Interview`);
  }

  editInterview(interview: any): Observable<any>{
    return this.httpClient.put<any>(`${this.baseUrlAPI}/Interview`, interview);
  }

  deleteInterview(id: string): Observable<any> {
    return this.httpClient.delete(`${this.baseUrlAPI}/Interview/${id}`);
  }

  getInterviewById(uniqueID: string){
    return this.httpClient.get(`${this.baseUrlAPI}/Interview/${uniqueID}`);
  }

  // Zoom APIs
  createMeeting(createMeeting: any, userId: any){
    return this.httpClient.post<any>(`${this.zoomBaseUrlApi}/users/${userId}/meetings`,createMeeting);
  }

  getMeeting(meetingId:any) {
    return this.httpClient.get<any>(`${this.zoomBaseUrlApi}/meetings/{meetingId}`);
  }

  // Payment details
  getPaymentDetails(){
    return this.httpClient.get<any>(`${this.baseUrlAPI}/payment`);
  }
  addPaymentDetails(payment: addPayment){
    return this.httpClient.post(`${this.baseUrlAPI}/payment`,payment);
  }
  editPayment(payments: payment){
    return this.httpClient.put(`${this.baseUrlAPI}/payment/${payments.id}`,payments);
  }
  deletePayment(id:any){
    return this.httpClient.delete(`${this.baseUrlAPI}/payment/${id}`);
  }

  // Segment Details
  addSegments(segment:AddSegment): Observable<any> {
    return this.httpClient.post<any>(`${this.baseUrlAPI}/Segment`,segment);
  }
  getSegments(){
    return this.httpClient.get<any>(`${this.baseUrlAPI}/Segment`);
  }
  getSegmentsById(sId:any){
    return this.httpClient.get<any>(`${this.baseUrlAPI}/Segment/${sId}`);
  }
  updateSegments(segment:any): Observable<any>{
    return this.httpClient.put<any>(`${this.baseUrlAPI}/Segment`,segment);
  }
  deleteSegments(segId:any): Observable<any>{
    return this.httpClient.delete(`${this.baseUrlAPI}/Segment/${segId}`);
  }
  // getSegments(){
  //   return this.httpClient.get<any>(`${this.edutechApi}`);
  // }


  //Live demo jitsi meeting
  addLiveDemoMeeting(demo:any): Observable<any>{
    return this.httpClient.post<any>(`${this.baseUrlAPI}/demo`,demo);
  }
  getLiveDemoMeeting(): Observable<any>{
    return this.httpClient.get<any>(`${this.baseUrlAPI}/demo`);
  }
  getUpComingLiveDemo(): Observable<any>{
    return this.httpClient.get<any>(`${this.baseUrlAPI}/demo/upcomingDate`);
  }
  getPastLiveDemo(): Observable<any>{
    return this.httpClient.get<any>(`${this.baseUrlAPI}/demo/Date`);
  }

  //Test meeting for own dashboard
  addInterviewMeeting(interview:any): Observable<any>{
    return this.httpClient.post<any>(`${this.baseUrlAPI}/meeting`,interview);
  }
  getInterviewMeeting(): Observable<any>{
    return this.httpClient.get<any>(`${this.baseUrlAPI}/meeting`);
  }


  //Counselling Session Jitsi meeting
  addCounsellingSessionMeeting(counselling:any): Observable<any>{
    return this.httpClient.post<any>(`${this.baseUrlAPI}/CounsellingSession`,counselling);
  }
  getCounsellingSessionUpcomingmeeting(): Observable<any>{
    return this.httpClient.get<any>(`${this.baseUrlAPI}/CounsellingSession/upcomingDate`);
  }
  getCounsellingSessionPastMetting(): Observable<any>{
    return this.httpClient.get<any>(`${this.baseUrlAPI}/CounsellingSession/pastDate`);
  }
}