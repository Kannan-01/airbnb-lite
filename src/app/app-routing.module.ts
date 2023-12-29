import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { HostComponent } from './host/host.component';
import { ViewComponent } from './view/view.component';
import { authGuard } from './guards/auth.guard';
import { WishlistsComponent } from './wishlists/wishlists.component';
import { AccountComponent } from './account/account.component';

const routes: Routes = [
  {
    path:"",component:HomeComponent
  },
  {
    path:"host",component:HostComponent,canActivate:[authGuard]
  },
  {
    path:"wishlists",component:WishlistsComponent,canActivate:[authGuard]
  },
  {
    path:"account",component:AccountComponent,canActivate:[authGuard]
  },
  {
    path:"view/:id",component:ViewComponent,canActivate:[authGuard]
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
