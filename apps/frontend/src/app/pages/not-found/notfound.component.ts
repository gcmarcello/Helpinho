import { Component, signal, effect, OnInit } from "@angular/core";
import { NavbarComponent } from "../../components/navbar/navbar.component";
import { ButtonComponent } from "../../components/button/button.component";
import { RouterModule } from "@angular/router";

@Component({
  selector: "app-notfound",
  standalone: true,
  imports: [NavbarComponent, ButtonComponent, RouterModule],
  templateUrl: "./notfound.component.html",
})
export class NotFoundComponent {}
