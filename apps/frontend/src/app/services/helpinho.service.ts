import { Injectable } from "@angular/core";
import { AuthService } from "./auth.service";
import { catchError, map, switchMap } from "rxjs";
import { ClassValidatorFormGroup } from "ngx-reactive-form-class-validator";
import {
  ClientCreateHelpinhoDto,
  ServerCreateHelpinhoDto,
} from "shared-types/dist/dto/helpinho.dto";
import { UploadService } from "./upload.service";
import { HttpClient } from "@angular/common/http";
import { environment } from "../../environment/environment";
import { handleFormErrors } from "../utils/form";
import {
  CreateHelpinhoResponse,
  Helpinho,
  UserHelpHelpinhoResponse,
} from "shared-types";

@Injectable({
  providedIn: "root",
})
export class HelpinhoService {
  constructor(
    private uploadService: UploadService,
    private http: HttpClient,
    private authService: AuthService
  ) {}

  create(form: ClassValidatorFormGroup) {
    const formData: ClientCreateHelpinhoDto = form.value;

    const POST = (data: ServerCreateHelpinhoDto) =>
      this.http.post<CreateHelpinhoResponse>(
        environment.apiUrl + "/helpinho",
        data,
        { headers: { Authorization: this.authService.captureSession() } }
      );

    return this.uploadService.upload(formData.image).pipe(
      map((url) =>
        POST({
          ...formData,
          image: url,
        })
      ),
      catchError((error) => {
        return handleFormErrors(form, error);
      })
    );
  }

  getUserHelpsAndHelpinhos() {
    return this.http.get<UserHelpHelpinhoResponse>(
      environment.apiUrl + "/helpinho",
      {
        headers: {
          Authorization: this.authService.captureSession(),
        },
      }
    );
  }

  list() {
    return this.http.get<Helpinho[]>(environment.apiUrl + "/helpinho/all");
  }
}
