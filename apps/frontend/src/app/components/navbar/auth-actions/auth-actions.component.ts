import { Component } from "@angular/core";
import { ButtonComponent } from "../../button/button.component";
import { RouterLink, RouterLinkActive } from "@angular/router";

@Component({
  selector: "app-auth-actions",
  standalone: true,
  imports: [ButtonComponent, RouterLink, RouterLinkActive],
  templateUrl: "./auth-actions.component.html",
})
export class AuthActionsComponent {}
