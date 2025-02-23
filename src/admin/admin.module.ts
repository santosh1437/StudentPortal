import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminPageComponent } from './admin-page.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UserManagementComponent } from './user-management/user-management.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { HttpClientModule } from '@angular/common/http';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { StudentsComponent } from './user-management/students/students.component';
import { TeachersComponent } from './user-management/teachers/teachers.component';
import { AddOrEditAdminComponent } from './dashboard/add-or-edit-admin/add-or-edit-admin.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatNativeDateModule } from '@angular/material/core';
import { CounsellorsComponent } from './user-management/counsellors/counsellors.component';
import { AddOrEditStudentComponent } from './user-management/students/add-or-edit-student/add-or-edit-student.component';
import { AddOrEditCounsellorComponent } from './user-management/counsellors/add-or-edit-counsellor/add-or-edit-counsellor.component';
import { AddOrEditTeacherComponent } from './user-management/teachers/add-or-edit-teacher/add-or-edit-teacher.component';
import { SettingsComponent } from './settings/settings.component';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSelectModule } from '@angular/material/select';
import { SchedulerComponent } from './scheduler/scheduler.component';
import { BatchesComponent } from './scheduler/batches/batches.component';
import { SubBatchesComponent } from './scheduler/sub-batches/sub-batches.component';
import { AddOrEditBatchComponent } from './scheduler/batches/add-or-edit-batch/add-or-edit-batch.component';
import { AddOrEditSubBatchesComponent } from './scheduler/sub-batches/add-or-edit-sub-batches/add-or-edit-sub-batches.component';
import { AddEditTeacherCoursesComponent } from './user-management/teachers/teacher-courses/add-edit-teacher-courses/add-edit-teacher-courses.component';
import { TeacherCoursesComponent } from './user-management/teachers/teacher-courses/teacher-courses.component';
import { PaymentDetailsComponent } from './user-management/students/payment-details/payment-details.component';
import { StudentCoursesComponent } from './user-management/students/student-courses/student-courses.component';
import { StudentPaymentDetailsComponent } from './user-management/students/student-payment-details/student-payment-details.component';
import { AddOrEditStudentCoursesComponent } from './user-management/students/student-courses/add-or-edit-student-courses/add-or-edit-student-courses.component';
import { ClassSchedulerComponent } from './scheduler/class-scheduler/class-scheduler.component';
import { SessionSchedulerComponent } from './scheduler/session-scheduler/session-scheduler.component';
import { ZoomMeetingsComponent } from './zoom-meetings/zoom-meetings.component';
import { LiveClassComponent } from './zoom-meetings/live-class/live-class.component';
import { LiveSessionComponent } from './zoom-meetings/live-session/live-session.component';
import { LiveDemoComponent } from './zoom-meetings/live-demo/live-demo.component';
import { CounselingSessionComponent } from './zoom-meetings/counseling-session/counseling-session.component';
import { InterviewComponent } from './zoom-meetings/interview/interview.component';
import { InterviewTableComponent } from './zoom-meetings/interview/interview-table/interview-table.component';
import { ScheduleInterviewComponent } from './zoom-meetings/interview/schedule-interview/schedule-interview.component';
import { ScheduleCounsellingSessionComponent } from './zoom-meetings/counseling-session/schedule-counselling-session/schedule-counselling-session.component';
import { ScheduleLiveClassComponent } from './zoom-meetings/live-class/schedule-live-class/schedule-live-class.component';
import { ScheduleLiveSessionComponent } from './zoom-meetings/live-session/schedule-live-session/schedule-live-session.component';
import { ScheduleLiveDemoComponent } from './zoom-meetings/live-demo/schedule-live-demo/schedule-live-demo.component';
import { AddOrEditPaymentDetailsComponent } from './user-management/students/student-payment-details/add-or-edit-payment-details/add-or-edit-payment-details.component';
import { AddOrEditSegmentComponent } from './settings/add-or-edit-segment/add-or-edit-segment.component';
import { AddOrEditCourseComponent } from './settings/add-or-edit-course/add-or-edit-course.component';
import { EditSegmentComponent } from './settings/edit-segment/edit-segment.component';
import { CourseComponent } from './settings/course/course.component';
import { SubcourseComponent } from './settings/subcourse/subcourse.component';
import { AddOrEditSubcourseComponent } from './settings/subcourse/add-or-edit-subcourse/add-or-edit-subcourse.component';
import { ZoomMeeting1Component } from './zoom-meetings/zoom-settings/zoom-meeting1/zoom-meeting1.component';
import { AuthConfig, OAuthModule, OAuthService } from 'angular-oauth2-oidc';
import { ZoomService } from './Service/zoom.service';
import {ClipboardModule} from '@angular/cdk/clipboard';
import { VideoRecordingService } from './zoom-meetings/video-recording.service';
// import { ScheduleSessionComponent } from './schedule-session/schedule-session.component';


const authConfig: AuthConfig = {
  issuer: 'https://your-okta-domain.okta.com/oauth2/default',
  clientId: 'yB7PHziVTkmjaNaUTt1J5Q',
  silentRefreshTimeout: 60000,
  redirectUri: window.location.origin + '/callback',
  showDebugInformation: true,
};

@NgModule({
  declarations: [
    AdminPageComponent,
    DashboardComponent,
    UserManagementComponent,
    StudentsComponent,
    TeachersComponent,
    TeacherCoursesComponent,
    AddOrEditAdminComponent,
    CounsellorsComponent,
    AddOrEditStudentComponent,
    AddOrEditCounsellorComponent,
    AddOrEditTeacherComponent,
    SettingsComponent,
    SchedulerComponent,
    BatchesComponent,
    SubBatchesComponent,
    AddOrEditBatchComponent,
    AddOrEditSubBatchesComponent,
    AddEditTeacherCoursesComponent,
    PaymentDetailsComponent,
    StudentCoursesComponent,
    StudentPaymentDetailsComponent,
    AddOrEditStudentCoursesComponent,
    ClassSchedulerComponent,
    SessionSchedulerComponent,
    ZoomMeetingsComponent,
    LiveClassComponent,
    LiveSessionComponent,
    LiveDemoComponent,
    CounselingSessionComponent,
    InterviewComponent,
    InterviewTableComponent,
    ScheduleInterviewComponent,
    ScheduleCounsellingSessionComponent,
    ScheduleLiveClassComponent,
    ScheduleLiveSessionComponent,
    ScheduleLiveDemoComponent,
    AddOrEditPaymentDetailsComponent,
    AddOrEditSegmentComponent,
    AddOrEditCourseComponent,
    EditSegmentComponent,
    CourseComponent,
    SubcourseComponent,
    AddOrEditSubcourseComponent,
    ZoomMeeting1Component,
    // ScheduleSessionComponent
  ],
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatButtonModule,
    MatListModule,
    MatIconModule,
    MatSidenavModule,
    MatToolbarModule,
    MatButtonModule,
    MatCheckboxModule,
    MatDatepickerModule,
    MatDialogModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatPaginatorModule,
    MatSortModule,
    HttpClientModule,
    MatTableModule,
    MatSidenavModule,
    MatNativeDateModule,
    ReactiveFormsModule,
    MatSlideToggleModule,
    MatSelectModule,
    MatTabsModule,
    ClipboardModule,
    OAuthModule.forRoot({
      resourceServer: {
        sendAccessToken: true,
      },
      ...authConfig,
    }),
  ],
  exports: [AdminPageComponent,
    DashboardComponent,
    UserManagementComponent],
    providers: [ZoomService, VideoRecordingService]
})
export class AdminModule { 
  // constructor(private oauthService: OAuthService) {
  //   this.configureWithZoomOAuth();
  // }

  // private configureWithZoomOAuth() {
  //   this.oauthService.configure({
  //     clientId: '4gIXPcA5Sri7LG8qKHj3SQ',
  //     dummyClientSecret: 'QM2obq8nHEWe7QTlTgegUfvgoT0V1o8K',
  //     loginUrl: 'https://zoom.us/oauth/authorize',
  //     redirectUri: window.location.origin + '/',
  //     responseType: 'code',
  //     scope: 'openid',
  //     strictDiscoveryDocumentValidation: false,
  //     showDebugInformation: true,
  //   });

  //   this.oauthService.setStorage(localStorage);
  // }
}
