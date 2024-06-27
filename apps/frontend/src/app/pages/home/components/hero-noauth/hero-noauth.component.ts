import { Component, signal, effect, OnInit } from "@angular/core";
import { ButtonComponent } from "../../../../components/button/button.component";
import { CommonModule } from "@angular/common";
import { CarouselComponent } from "../carousel/carousel.component";

@Component({
  selector: "app-hero-noauth",
  standalone: true,
  imports: [ButtonComponent, CommonModule, CarouselComponent],
  templateUrl: "./hero-noauth.component.html",
})
export class HeroNoAuthComponent {
  numVisible = 3;
  numScroll = 3;
  circular = false;
  items = ["Registro Grátis", "Sem Taxas", "Rápido e Prático"];
}
