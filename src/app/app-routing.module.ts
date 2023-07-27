import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AdminPageComponent } from 'src/admin/admin-page.component';
// import { ScheduleSessionComponent } from 'src/admin/schedule-session/schedule-session.component';
import { LoginPageComponent } from 'src/login/login-page.component';

const routes: Routes = [
  {
    path: '',
    title: "Login",
    component: LoginPageComponent
  },
  {
    path: 'dashboard',
    component: AdminPageComponent
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
