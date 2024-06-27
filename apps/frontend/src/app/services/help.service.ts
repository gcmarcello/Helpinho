import { Injectable } from "@angular/core";
import { AuthService } from "./auth.service";
import { ClassValidatorFormGroup } from "ngx-reactive-form-class-validator";
import { ClientCreateHelpinhoDto } from "shared-types/dist/dto/helpinho.dto";
import { UploadService } from "./upload.service";
import { HttpClient } from "@angular/common/http";
import { environment } from "../../environment/environment";
import { handleFormErrors } from "../utils/form";
import { CreateHelpDto, CreateHelpinhoResponse, Help } from "shared-types";

@Injectable({
  providedIn: "root",
})
export class HelpService {
  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) {}

  create(form: ClassValidatorFormGroup) {
    const formData: CreateHelpDto = form.value;

    return this.http.post<Help>(environment.apiUrl + "/help", formData, {
      headers: { Authorization: this.authService.captureSession() },
    });
  }
}
