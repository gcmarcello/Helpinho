import { Component, signal } from "@angular/core";
import { ButtonComponent } from "../../../../components/button/button.component";
import { CommonModule } from "@angular/common";
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
  helpinhos = signal<UserHelpHelpinhoResponse | null>(null);
  helps = signal<number | null>(null);
  constructor(private helpinhoService: HelpinhoService) {}

  calculateMyFundings() {
    const helps = this.helpinhos()?.flatMap((h) => h.helps);

    const helpsAmounts = helps?.map((h) => Number(h?.amount)!)!;

    const total = helpsAmounts?.reduce((acc, curr) => acc + curr, 0);

    return total;
  }

  ngOnInit() {
    this.userInfo = JSON.parse(localStorage.getItem("userInfo")!);
    this.helpinhoService
      .getUserHelpsAndHelpinhos()
      .subscribe((data: UserHelpHelpinhoResponse) => {
        this.helpinhos.set(data);
        return this.helps.set(
          data.filter((helpinho) => Boolean(helpinho.helps?.length)).length
        );
      });
  }
}
