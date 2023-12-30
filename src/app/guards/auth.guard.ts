import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { ToasterService } from '../services/toaster.service';
import { inject } from '@angular/core';
export const authGuard: CanActivateFn = (route, state) => {
  const authStatus = inject(AuthService);
  const router = inject(Router);
  const toaster = inject(ToasterService);
  if (authStatus.isLogged()) {
    return true;
  } else {
    toaster.showWarning('Login to continue !');
    router.navigateByUrl('');
    return false;
  }
};
