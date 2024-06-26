import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";
import { RouterOutlet } from "@angular/router";

@Component({
  selector: "app-spinner",
  standalone: true,
  imports: [RouterOutlet, CommonModule],
  templateUrl: "./spinner.component.html",
})
export class SpinnerComponent {
  constructor() {}
}
