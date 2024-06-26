import { Component, OnInit, signal } from "@angular/core";
import { HelpinhoService } from "../../../../services/helpinho.service";
import { HelpinhoCardComponent } from "../helpinho-card/helpinho-card.component";
import { CommonModule } from "@angular/common";
import { SearchboxComponent } from "../../../../components/form/searchbox/searchbox.component";
import {
  ClassValidatorFormBuilderModule,
  ClassValidatorFormBuilderService,
} from "ngx-reactive-form-class-validator";
import { ReactiveFormsModule } from "@angular/forms";
import { GetHelpinhoDto, Helpinho, LoginDto } from "shared-types";
import { SelectComponent } from "../../../../components/form/select/select.component";

@Component({
  selector: "app-helpinho-list",
  standalone: true,
  imports: [
    ReactiveFormsModule,
    SearchboxComponent,
    HelpinhoCardComponent,
    CommonModule,
    ClassValidatorFormBuilderModule,
    SelectComponent,
  ],
  templateUrl: "./helpinho-list.component.html",
})
export class HelpinhoListComponent implements OnInit {
  searchForm = this.fb.group(
    LoginDto,
    {
      title: [""],
      category: [""],
    },
    { updateOn: "change" }
  );
  constructor(
    private fb: ClassValidatorFormBuilderService,
    private helpinhoService: HelpinhoService
  ) {}
  helpinhos: Helpinho[] | null = null;
  categories = [
    { value: "games", label: "Jogos" },
    { value: "health", label: "Saúde" },
    { value: "music", label: "Música" },
    { value: "fix", label: "Reforma" },
    { value: "emergency", label: "Emergência" },
    { value: "hospital", label: "Hospitalar" },
  ];

  ngOnInit() {
    this.helpinhoService
      .list()
      .subscribe((data: Helpinho[]) => (this.helpinhos = data));
  }
}
