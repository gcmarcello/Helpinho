import { Component, signal, effect, OnInit } from "@angular/core";
import { NavbarComponent } from "../../../components/navbar/navbar.component";
import { ButtonComponent } from "../../../components/button/button.component";
import {
  ClassValidatorFormBuilderModule,
  ClassValidatorFormBuilderService,
} from "ngx-reactive-form-class-validator";
import { ClientCreateHelpinhoDto } from "shared-types/dist/dto/helpinho.dto";
import { CommonModule } from "@angular/common";
import { ReactiveFormsModule } from "@angular/forms";
import { InputComponent } from "../../../components/form/input/input.component";
import { TextAreaComponent } from "../../../components/form/textarea/textarea.component";
import { FileInputComponent } from "../../../components/form/file-input/file-input.component";
import { HelpinhosCategoriesComponent } from "./components/categories/helpinhos-categories.component";
import { HelpinhosGoalsComponent } from "./components/goals/helpinhos-goals.component";
import { HelpinhosReviewComponent } from "./components/review/helpinhos-review.component";
import { HelpinhosInfoComponent } from "./components/information/helpinhos-info.component";
import { HelpinhoService } from "../../../services/helpinho.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-helpinhos",
  standalone: true,
  imports: [
    NavbarComponent,
    ButtonComponent,
    CommonModule,
    ClassValidatorFormBuilderModule,
    ReactiveFormsModule,
    InputComponent,
    TextAreaComponent,
    FileInputComponent,
    HelpinhosCategoriesComponent,
    HelpinhosGoalsComponent,
    HelpinhosInfoComponent,
    HelpinhosReviewComponent,
  ],
  templateUrl: "./helpinhos.component.html",
})
export class HelpinhosComponent {
  constructor(
    private fb: ClassValidatorFormBuilderService,
    private helpinhoService: HelpinhoService,
    private router: Router
  ) {}

  error?: string;

  helpinhoForm = this.fb.group(
    ClientCreateHelpinhoDto,
    {
      categories: [""],
      title: [""],
      image: [""],
      description: [""],
      goal: [0],
    },
    { updateOn: "change" }
  );
  activeStep = signal(0);

  steps = [
    {
      name: "Categoria do Helpinho",
      id: "category",
      validation: () => this.helpinhoForm.get("categories")?.value.length,
      error: "Escolha pelo menos uma categoria para o Helpinho",
    },
    {
      name: "Conhecendo o Helpinho",
      id: "description",
      validation: () =>
        this.helpinhoForm.get("description")?.value &&
        this.helpinhoForm.get("title")?.value,
      error: "Preencha todos os campos para continuar",
    },
    {
      name: "Metas do Helpinho!",
      id: "goal",
      validation: () => this.helpinhoForm.get("goal")?.value,
      error: "Escolha uma meta para o Helpinho",
    },
    {
      name: "Revisando",
      id: "done",
      validation: () => true,
    },
  ];

  helpinhoId?: string;

  canGoNext() {
    return (
      this.steps[this.activeStep()].validation() &&
      this.activeStep() < this.steps.length - 1
    );
  }

  canGoPrevious() {
    return this.activeStep() > 0;
  }

  nextStep() {
    if (this.activeStep() === 3) return this.submitHelpinho();
    if (this.canGoNext()) {
      this.error = undefined;
      this.activeStep.set(this.activeStep() + 1);
      return window.scrollTo({ behavior: "smooth", top: 0 });
    }
    this.error = this.steps[this.activeStep()].error;
  }

  previousStep() {
    if (this.canGoPrevious()) {
      this.activeStep.set(this.activeStep() - 1);
      window.scrollTo({ behavior: "smooth", top: 0 });
    }
  }

  submitHelpinho() {
    if (!this.helpinhoForm.valid) return;

    return this.helpinhoService.create(this.helpinhoForm).subscribe((data) =>
      data.subscribe((data) => {
        return this.router.navigate(["/helpinhos", data.id]);
      })
    );
  }
}
