import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  public dashboard: boolean = false;
  public userManagementExternal: boolean = false;
  public userManagementInternal: boolean = false;
  constructor() { }
}
