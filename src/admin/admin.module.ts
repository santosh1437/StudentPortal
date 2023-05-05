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
import { InternalStudentsComponent } from './user-management/internal-students/internal-students.component';
import { ExternalStudentsComponent } from './user-management/external-students/external-students.component';
import { TeachersComponent } from './user-management/teachers/teachers.component';
import { AddOrEditAdminComponent } from './dashboard/add-or-edit-admin/add-or-edit-admin.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AdminPageComponent,
    DashboardComponent,
    UserManagementComponent,
    InternalStudentsComponent,
    ExternalStudentsComponent,
    TeachersComponent,
    AddOrEditAdminComponent
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
    ReactiveFormsModule
  ],
  exports: [AdminPageComponent,
    DashboardComponent,
    UserManagementComponent],
})
export class AdminModule { }
