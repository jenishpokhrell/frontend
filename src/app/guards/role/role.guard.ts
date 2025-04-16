import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';

export const roleGuard: CanActivateFn = (route, state) => {
  const roles = route.data["roles"] as string[];
  const authService = inject(AuthService)
  const router = inject(Router)

  const userRoles = authService.getRoles()

  if(!authService.isLoggedIn()){
    router.navigate(['/login'])

    alert('You must login to view this page')

    return false
  }

  if(roles.some((role) => userRoles?.includes(role))){
    return true;
  } 

  router.navigate(['/unauthorized'])
  return false;

};
