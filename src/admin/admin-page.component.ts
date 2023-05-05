import { Component } from '@angular/core';
import { AdminService } from './admin.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-page',
  templateUrl: './admin-page.component.html',
  styleUrls: ['./admin-page.component.css']
})
export class AdminPageComponent {
  public currentUserData: any;
  constructor(
    public router:Router,
    public adminService: AdminService
  ){ }

  ngOnInit(){
    this.openSection('dashboard');
    this.currentUserData = localStorage.getItem('currentUser');
    this.adminService.currentUser = this.getCurrentUser();
  }

  public openSection(sectionName: string) {
    this.adminService.dashboard = false;
    this.adminService.teachers = false;
    this.adminService.internalStudents = false;
    this.adminService.externalStudents = false;
    // this.adminService.userManagement = false;

    switch (sectionName) {
      case 'dashboard':
        this.adminService.dashboard = true;
        break;
      case 'userManagement':
        // this.adminService.userManagement = true;
        this.adminService.teachers = true;
        break;
      case 'internalStudents':
        this.adminService.internalStudents = true;
        break;
      case 'externalStudents':
        this.adminService.externalStudents = true;
        break;
      case 'teachers':
        this.adminService.teachers = true;
        break;
    }
  }

  // Get Current user from localstorage
  getCurrentUser() {
    const user = JSON.parse(this.currentUserData);
    return user;
  }

  // Signout or Sign In
  public signout() {
    if(localStorage.length){
      this.adminService.signOut = true;
      localStorage.clear();
    } else {
      this.adminService.signOut = false;
    }
    this.router.navigateByUrl('');
  }
}
