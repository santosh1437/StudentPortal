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
import { ManageBatchesComponent } from './settings/manage-batches/manage-batches.component';
import { ManageCoursesComponent } from './settings/manage-courses/manage-courses.component';
import { ScheduleSessionComponent } from './schedule-session/schedule-session.component';
@NgModule({
  declarations: [
    AdminPageComponent,
    DashboardComponent,
    UserManagementComponent,
    StudentsComponent,
    TeachersComponent,
    AddOrEditAdminComponent,
    CounsellorsComponent,
    AddOrEditStudentComponent,
    AddOrEditCounsellorComponent,
    AddOrEditTeacherComponent,
    SettingsComponent,
    ManageBatchesComponent,
    ManageCoursesComponent,
    ScheduleSessionComponent
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
    MatSelectModule
  ],
  exports: [AdminPageComponent,
    DashboardComponent,
    UserManagementComponent],
})
export class AdminModule { }
