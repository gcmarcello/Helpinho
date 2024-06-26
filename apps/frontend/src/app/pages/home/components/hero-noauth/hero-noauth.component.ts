import { Component, signal, effect, OnInit } from "@angular/core";
import { ButtonComponent } from "../../../../components/button/button.component";
import { CommonModule } from "@angular/common";

@Component({
  selector: "app-hero-noauth",
  standalone: true,
  imports: [ButtonComponent, CommonModule],
  templateUrl: "./hero-noauth.component.html",
})
export class HeroNoAuthComponent {}
