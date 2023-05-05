import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminPageComponent } from './admin-page.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UserManagementComponent } from './user-management/user-management.component';
// import { MatFormFieldModule } from '@angular/material/form-field';
// import { MatButtonModule } from '@angular/material/button';
// import { MatCommonModule, MatNativeDateModule } from '@angular/material/core';
// import { MatError } from '@angular/material/form-field';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
// import { MatListModule } from '@angular/material/list';
// import { MatCheckboxModule } from '@angular/material/checkbox';
// import { MatDatepickerModule } from '@angular/material/datepicker';
// import { MatDialogModule } from '@angular/material/dialog';
// import { MatInputModule } from '@angular/material/input';
// import { MatPaginatorModule } from '@angular/material/paginator';
// import { MatSortModule } from '@angular/material/sort';
// import { HttpClientModule } from '@angular/common/http';
// import { MatTableModule } from '@angular/material/table';

@NgModule({
  declarations: [
    AdminPageComponent,
    DashboardComponent,
    UserManagementComponent
  ],
  imports: [
    CommonModule,
    // MatFormFieldModule,
    // MatButtonModule,
    // MatCommonModule,
    // MatListModule,
    MatIconModule,
    MatSidenavModule,
    MatToolbarModule,
    // MatError,
    // MatButtonModule,
    // MatCheckboxModule,
    // MatDatepickerModule,
    // MatDialogModule,
    // MatFormFieldModule,
    // MatIconModule,
    // MatInputModule,
    // MatListModule,
    // MatPaginatorModule,
    // MatNativeDateModule,
    // MatSortModule,
    // HttpClientModule,
    // MatTableModule,
    // MatSidenavModule
  ]
})
export class AdminModule { }
