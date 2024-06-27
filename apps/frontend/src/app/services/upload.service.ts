import { Injectable } from "@angular/core";
import { environment } from "../../environment/environment";
import { HttpClient } from "@angular/common/http";
import { map, switchMap } from "rxjs";
import { GetUploadLinkResponse, mimeType } from "shared-types";

@Injectable({
  providedIn: "root",
})
export class UploadService {
  constructor(private http: HttpClient) {}

  mTypes = mimeType;

  upload(file: File) {
    return this.http
      .post<GetUploadLinkResponse>(environment.apiUrl + "/files/presigned/", {
        mimeType: file.type,
        size: file.size,
      })
      .pipe(
        switchMap((r) => {
          return this.http
            .put(r.url, file, {
              headers: {
                "Content-Type": file.type,
              },
            })
            .pipe(
              map(() => {
                return r.url.split("?")[0];
              })
            );
        })
      );
  }
}
