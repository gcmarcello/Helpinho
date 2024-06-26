import { Component, Input, signal } from "@angular/core";
import { ButtonComponent } from "../../button/button.component";
import { CommonModule } from "@angular/common";
import { AuthService } from "../../../services/auth.service";
import { SpinnerComponent } from "../../loading/components/spinner.component";
import { User } from "shared-types";

@Component({
  selector: "app-profile-actions",
  standalone: true,
  imports: [ButtonComponent, CommonModule, SpinnerComponent],
  templateUrl: "./profile-actions.component.html",
})
export class ProfileActionsComponent {
  constructor(private authService: AuthService) {}

  @Input() profile: User;

  logout() {
    this.authService.logout();
  }
}
