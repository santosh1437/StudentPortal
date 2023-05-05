import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  public dashboard: boolean = false;
  public internalStudents: boolean = false;
  public externalStudents: boolean = false;
  public teachers: boolean = false;
  public userManagement: boolean = false;
  public signOut: boolean = false;
  public currentUser: any;
  constructor() { }
}
