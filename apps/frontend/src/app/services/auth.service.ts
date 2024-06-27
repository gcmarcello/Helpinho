import { Inject, Injectable } from "@angular/core";
import { BehaviorSubject, EMPTY, Observable, catchError, map } from "rxjs";
import { Router } from "@angular/router";
import * as jose from "jose";
import { ClassValidatorFormGroup } from "ngx-reactive-form-class-validator";
import { DOCUMENT } from "@angular/common";
import { HttpClient } from "@angular/common/http";
import { handleFormErrors } from "../utils/form";
import { UserSession, LoginResponse, SignupResponse } from "shared-types";
import { environment } from "../../environment/environment";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  private tokenStore: BehaviorSubject<string> = new BehaviorSubject("");
  tokenStore$: Observable<string> = this.tokenStore.asObservable();
  constructor(
    @Inject(DOCUMENT) private document: Document,
    private http: HttpClient,
    private router: Router
  ) {
    const untrustedToken = this.localStorage.getItem("token");

    const trustedToken = this.validateSession(untrustedToken);

    if (trustedToken) {
      this.setSession(trustedToken);
    } else {
      this.removeSession();
    }
  }

  localStorage = this.document.defaultView?.localStorage!;

  login(form: ClassValidatorFormGroup) {
    return this.http
      .post<LoginResponse>(environment.apiUrl + "/auth/login", form.value)
      .pipe(
        map((response) => {
          const token = response.token;
          this.localStorage.setItem("userInfo", JSON.stringify(response));
          this.localStorage.setItem("token", token);
          this.tokenStore.next(token);
          return form.value;
        }),
        catchError((error) => {
          return handleFormErrors(form, error);
        })
      );
  }

  signup(form: ClassValidatorFormGroup) {
    return this.http
      .post<SignupResponse>(environment.apiUrl + "/auth/signup", form.value)
      .pipe(
        map((response) => {
          const token = response;
          this.localStorage.setItem("token", response.token);
          this.document.defaultView?.localStorage?.setItem(
            "userInfo",
            JSON.stringify(response)
          );
          this.tokenStore.next(response.token);
          return token;
        }),
        catchError((error) => {
          return handleFormErrors(form, error);
        })
      );
  }

  async logout() {
    this.removeSession();
    return this.router.navigate(["/auth/login"]);
  }

  isLoggedIn() {
    return this.tokenStore$.pipe(map((token) => !!token));
  }

  captureSession(): string {
    return this.localStorage.getItem("token")!;
  }

  setSession(token: string) {
    this.tokenStore.next(token);
  }

  removeSession() {
    this.tokenStore.next("");
    this.document.defaultView?.localStorage?.clear();
    this.localStorage.removeItem("token");
  }

  validateSession(token: string | null): string | false {
    if (!token) return false;

    try {
      const decodedToken: UserSession = jose.decodeJwt(token);
      if (decodedToken.exp < Date.now() / 1000) return false;
    } catch (error) {
      return false;
    }

    return token;
  }
}
