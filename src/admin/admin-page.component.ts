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
    this.adminService.openSection('dashboard');
    this.currentUserData = localStorage.getItem('currentUser');
    this.adminService.currentUser = this.getCurrentUser();
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
