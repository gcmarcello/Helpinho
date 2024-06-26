import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";
import { RouterOutlet } from "@angular/router";
import { SpinnerComponent } from "./components/spinner.component";

@Component({
  selector: "app-loading",
  standalone: true,
  imports: [RouterOutlet, CommonModule, SpinnerComponent],
  templateUrl: "./loading.component.html",
})
export class LoadingComponent {
  constructor() {}
}
