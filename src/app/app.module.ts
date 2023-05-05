import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// import { MatToolbarModule } from '@angular/material/toolbar';
// import { MatSidenavModule } from '@angular/material/sidenav';
// import { MatButtonModule } from '@angular/material/button';
// import { MatIconModule } from '@angular/material/icon';
// import { MatListModule } from '@angular/material/list';
// import { MatFormFieldModule } from "@angular/material/form-field";
// import { MatTableModule } from '@angular/material/table';
// import { MatSortModule } from '@angular/material/sort';
// import { MatCheckboxModule } from '@angular/material/checkbox';
// import { MatPaginatorModule } from '@angular/material/paginator';
// import { MatInputModule } from '@angular/material/input';
import { HttpClientModule } from '@angular/common/http';
// import { MatDialogModule } from '@angular/material/dialog';
// import { MatNativeDateModule } from '@angular/material/core';
// import { MatDatepickerModule } from '@angular/material/datepicker';
@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NoopAnimationsModule,
    ReactiveFormsModule,
    FormsModule,
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
    HttpClientModule,
    // MatTableModule,
    // MatSidenavModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
