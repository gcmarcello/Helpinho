import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router, RouterModule } from "@angular/router";
import { HelpinhoService } from "../../../services/helpinho.service";
import { CreateHelpDto, Helpinho } from "shared-types";
import { NavbarComponent } from "../../../components/navbar/navbar.component";
import { ButtonComponent } from "../../../components/button/button.component";
import { SelectComponent } from "../../../components/form/select/select.component";
import {
  ClassValidatorFormBuilderModule,
  ClassValidatorFormBuilderService,
} from "ngx-reactive-form-class-validator";
import { CommonModule } from "@angular/common";
import { HelpService } from "../../../services/help.service";
import { AuthService } from "../../../services/auth.service";

@Component({
  selector: "app-helpinho",
  standalone: true,
  imports: [
    CommonModule,
    NavbarComponent,
    ButtonComponent,
    SelectComponent,
    ClassValidatorFormBuilderModule,
  ],
  templateUrl: "./helpinho.component.html",
})
export class HelpinhoComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private helpinhoService: HelpinhoService,
    private fb: ClassValidatorFormBuilderService,
    private helpService: HelpService,
    private authService: AuthService
  ) {}

  helpinhoOptions = ["5", "15", "50", "100", "200"].map((i) => ({
    value: i,
    label: `R$ ${i}`,
  }));

  isLoggedIn() {
    return Boolean(this.authService.captureSession());
  }

  isDonating = false;
  helpinho?: Helpinho;

  helpinhoId = this.route.snapshot.params["id"];

  createHelpForm = this.fb.group(
    CreateHelpDto,
    {
      amount: [""],
      helpinhoId: [this.helpinhoId],
    },
    { updateOn: "change" }
  );

  donate() {
    this.isDonating = true;
    this.helpService.create(this.createHelpForm).subscribe(() => {
      return this.helpinhoService
        .getHelpinho(this.helpinhoId)
        .subscribe((data) => {
          return (this.helpinho = data);
        });
    });
    setTimeout(() => {
      this.isDonating = false;
    }, 2500);
  }

  calculateFunding() {
    return (
      this.helpinho?.helps?.reduce((acc, help) => acc + +help.amount, 0) ?? 0
    );
  }

  ngOnInit(): void {
    this.helpinhoService.getHelpinho(this.helpinhoId).subscribe((data) => {
      return (this.helpinho = data);
    });
  }
}
