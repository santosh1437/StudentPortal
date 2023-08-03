import { Component, TemplateRef, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { AdminService } from 'src/admin/admin.service';
import { AddCourseToTeacher } from 'src/app/app.model';
import { AppService } from 'src/app/app.service';

@Component({
  selector: 'app-add-edit-teacher-courses',
  templateUrl: './add-edit-teacher-courses.component.html',
  styleUrls: ['./add-edit-teacher-courses.component.css']
})
export class AddEditTeacherCoursesComponent {
  
}
