import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";
import { RouterModule } from "@angular/router";

@Component({
  selector: "app-auth",
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: "./auth.component.html",
})
export class AuthComponent {}
