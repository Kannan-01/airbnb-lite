import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { HostComponent } from './host/host.component';
import { ViewComponent } from './view/view.component';

const routes: Routes = [
  {
    path:"",component:HomeComponent
  },
  {
    path:"host",component:HostComponent
  },
  {
    path:"view/:id",component:ViewComponent
  },
  {
    path:"**",redirectTo:""
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
