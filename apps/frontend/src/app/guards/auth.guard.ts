import { inject } from "@angular/core";
import {
  CanActivateFn,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
} from "@angular/router";
import { Observable, map } from "rxjs";
import { AuthService } from "../services/auth.service";

export const AuthGuard: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
): Observable<boolean> => {
  const authService = inject(AuthService);
  const router = inject(Router);

  return authService.tokenStore$.pipe(
    map((user) => {
      if (!user) {
        router.navigate(["/auth/login"]);
        return false;
      }
      return true;
    })
  );
};

export const AuthPageGuard: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
  const router = inject(Router);

  if (state.url === "/auth") {
    router.navigate(["/auth/login"]);
    return false;
  }
  return true;
};
