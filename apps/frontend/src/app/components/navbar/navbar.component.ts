import { Component, Inject } from "@angular/core";
import { AuthActionsComponent } from "./auth-actions/auth-actions.component";
import { ButtonComponent } from "../button/button.component";
import { NavigationLinksComponent } from "./navigation-links/navigation-links.component";
import { ProfileActionsComponent } from "./profile-actions/profile-actions.component";
import { CommonModule, DOCUMENT } from "@angular/common";
import { Subscription, map } from "rxjs";
import { AuthService } from "../../services/auth.service";
import { UserService } from "../../services/user.service";

@Component({
  selector: "app-navbar",
  standalone: true,
  imports: [
    ButtonComponent,
    AuthActionsComponent,
    NavigationLinksComponent,
    ProfileActionsComponent,
    CommonModule,
  ],
  templateUrl: "./navbar.component.html",
})
export class NavbarComponent {
  isLoggedIn: any;
  userInfo: any;
  subscription: Subscription;

  constructor(
    @Inject(DOCUMENT) private document: Document,
    private authService: AuthService,
    private userService: UserService
  ) {}

  ngOnInit() {
    this.subscription = this.authService.isLoggedIn().subscribe({
      next: (status) => {
        this.isLoggedIn = status;

        if (!status) return;

        const userInfo = localStorage.getItem("userInfo");

        if (userInfo) return (this.userInfo = JSON.parse(userInfo!));

        this.fetchUserInfo().subscribe((data) => {
          this.userInfo = data;
          localStorage.setItem("userInfo", JSON.stringify(data));
        });
      },
    });
  }

  fetchUserInfo() {
    return this.userService.getUserInfo();
  }
}
