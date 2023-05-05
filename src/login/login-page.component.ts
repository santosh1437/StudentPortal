import { Component } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { account_validation_messages } from './validation-messages/validation-messages';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent {
  public loginForm: any = FormGroup;
  // currentUserData: any;
  // public display: any;
  public validationErrorMessages: any;
  // public signOutsuccess: boolean = false;
  // public errorMessage = null;
  // public currentUserLoginId: any;
  public hide: boolean = true;
  public invalid: boolean = false;
  public authenticating: boolean = false;
  constructor(
    public fb: FormBuilder,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.validationErrorMessages = this.getErrorMessages();
    // Admin loginform
    this.loginForm = this.fb.group({
      username: [
        '',
        Validators.compose([
          Validators.required,
          Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$'),
        ]),
      ],
      password: [
        '',
        Validators.compose([Validators.minLength(6), Validators.required]),
      ],
    });
  }

  // Get all validation error message
  private getErrorMessages() {
    return account_validation_messages;
  }

  // After clicking login button
  public onLogin() {
    this.authenticating = true;
    this.invalid = false;
    // this.appService.getAuthentication(this.loginForm.value).subscribe({
    //   next: (res) => {
    //     this.appService.currentUser = {
    //       id: res.id,
    //       fullName:	res.fullName,
    //       phoneNo:	res.phoneNo,
    //       userName: res.userName,
    //       password: res.password,
    //       createdOn: res.createdOn,
    //       updatedOn: res.updatedOn,
    //       isDeleted: res.isDeleted,
    //       adminType: res.adminType
    //     };
    //     localStorage.setItem('currentUser', JSON.stringify(res));
        this.router.navigateByUrl('/dashboard');
    //   },
    //   error: (error) => {
    //     console.log(error.error.message);
    //     this.errorMessage = error.error.message;
    //     this.invalid = true;
    //   },
    // });
    // https://edutechex.com/StudentAdminPortal_Api/swagger/index.html
  }
}
