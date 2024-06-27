import { Component, signal, effect, OnInit } from "@angular/core";
import { NavbarComponent } from "../../components/navbar/navbar.component";
import { ButtonComponent } from "../../components/button/button.component";
import { FooterComponent } from "../../components/footer/footer.component";

import { Subscription } from "rxjs";
import { AuthService } from "../../services/auth.service";
import { HeroNoAuthComponent } from "./components/hero-noauth/hero-noauth.component";
import { HeroAuthComponent } from "./components/hero-auth/hero-auth.component";
import { CommonModule } from "@angular/common";
import { InfoComponent } from "./components/info/info.component";
import { HelpinhoListComponent } from "./components/search/components/helpinho-list/helpinho-list.component";

@Component({
  selector: "app-home",
  standalone: true,
  imports: [
    NavbarComponent,
    ButtonComponent,
    FooterComponent,
    HeroNoAuthComponent,
    HeroAuthComponent,
    CommonModule,
    InfoComponent,
    HelpinhoListComponent,
  ],
  templateUrl: "./home.component.html",
})
export class HomeComponent implements OnInit {
  isLoggedIn: any;
  userInfo: any;
  private subscription: Subscription;
  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.subscription = this.authService.isLoggedIn().subscribe((status) => {
      this.isLoggedIn = status;
    });
  }
}
