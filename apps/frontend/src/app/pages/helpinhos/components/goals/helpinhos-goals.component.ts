import { Component, Input } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { goals } from "../../constants/goals";
import { ClassValidatorFormGroup } from "ngx-reactive-form-class-validator";

@Component({
  selector: "app-helpinhos-goals",
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: "./helpinhos-goals.component.html",
})
export class HelpinhosGoalsComponent {
  gls = goals;
  @Input() formGroup: ClassValidatorFormGroup;
  constructor() {}
}
