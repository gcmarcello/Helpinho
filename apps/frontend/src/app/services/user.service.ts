import { Injectable } from "@angular/core";
import { UserInfoResponse } from "shared-types";
import { AuthService } from "./auth.service";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { environment } from "../../environment/environment";

@Injectable({
  providedIn: "root",
})
export class UserService {
  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) {}
  getUserInfo() {
    return this.http.get<any>(environment.apiUrl + "/", {
      headers: {
        Authorization: this.authService.captureSession(),
      },
    });
  }
}
