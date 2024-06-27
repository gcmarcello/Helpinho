import { inject } from "@angular/core";
import {
  CanActivateFn,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
} from "@angular/router";
import { Observable, map, tap } from "rxjs";
import { AuthService } from "../services/auth.service";

export const AuthGuard: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
): Observable<boolean> => {
  const authService = inject(AuthService);
  const router = inject(Router);

  return authService.tokenStore$.pipe(
    map((session) => {
      if (!session) {
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
  const authService = inject(AuthService);

  authService.tokenStore$.subscribe((session: string) => {
    if (session) {
      router.navigate(["/"]);
      return false;
    }
    return true;
  });

  if (state.url === "/auth") {
    router.navigate(["/auth/login"]);
    return false;
  }
  return true;
};
