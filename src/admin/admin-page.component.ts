import { Component } from '@angular/core';
import { AdminService } from './admin.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-page',
  templateUrl: './admin-page.component.html',
  styleUrls: ['./admin-page.component.css']
})
export class AdminPageComponent {
  constructor(
    public router:Router,
    public adminService: AdminService
  ){ }

  public openSection(sectionName: string) {
    this.adminService.userManagementInternal = false;
    this.adminService.userManagementExternal = false;
    this.adminService.dashboard = false;

    switch (sectionName) {
      case 'dashboard':
        this.adminService.dashboard = true;
        break;
      case 'userManagementInternal':
        this.adminService.userManagementInternal = true;
        break;
      case 'userManagementExternal':
        this.adminService.userManagementExternal = true;
        break;
    }
  }

  public signout(){
    this.router.navigateByUrl('/login')
  }
}
