import {
  Component,
  signal,
  effect,
  OnInit,
  Signal,
  WritableSignal,
} from "@angular/core";
import { ButtonComponent } from "../../../../components/button/button.component";
import { CommonModule } from "@angular/common";
import { UserService } from "../../../../services/user.service";
import { SpinnerComponent } from "../../../../components/loading/components/spinner.component";
import { HelpinhoService } from "../../../../services/helpinho.service";
import { UserHelpHelpinhoResponse } from "shared-types";

@Component({
  selector: "app-hero-auth",
  standalone: true,
  imports: [ButtonComponent, SpinnerComponent, CommonModule],
  templateUrl: "./hero-auth.component.html",
  styleUrls: ["./hero-auth.component.scss"],
})
export class HeroAuthComponent {
  userInfo: any;
  helpinhos = signal<UserHelpHelpinhoResponse["helpinhos"] | null>(null);
  helps = signal<UserHelpHelpinhoResponse["helps"] | null>(null);
  constructor(private helpinhoService: HelpinhoService) {}

  ngOnInit() {
    this.userInfo = JSON.parse(localStorage.getItem("userInfo")!);
    this.helpinhoService
      .getUserHelpsAndHelpinhos()
      .subscribe((data: UserHelpHelpinhoResponse) => {
        this.helpinhos.set(data.helpinhos);
        return this.helps.set(data.helps);
      });
  }
}
