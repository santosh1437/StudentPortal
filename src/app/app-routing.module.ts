import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AdminPageComponent } from 'src/admin/admin-page.component';
import { ZoomMeetingsComponent } from 'src/admin/zoom-meetings/zoom-meetings.component';
import { ZoomMeeting1Component } from 'src/admin/zoom-meetings/zoom-settings/zoom-meeting1/zoom-meeting1.component';
import { MyGuardGuard } from 'src/guard/my-guard.guard';
// import { ScheduleSessionComponent } from 'src/admin/schedule-session/schedule-session.component';
import { LoginPageComponent } from 'src/login/login-page.component';

const routes: Routes = [
  {
    path: '',
    title: "Login",
    component: LoginPageComponent,
    // canActivate: [MyGuardGuard],
  },
  {
    path: 'dashboard',
    component: AdminPageComponent,
    // canActivate: [MyGuardGuard],
  },
  {
    path:'zoom1',
    component: ZoomMeeting1Component
  },
  {
    path:'zoom',
    component:ZoomMeetingsComponent,
  }
  // {
  //   path: 'zoom',
  //   component: ScheduleSessionComponent
  // }
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{ useHash: true ,  preloadingStrategy: PreloadAllModules})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
