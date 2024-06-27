import { CommonModule } from "@angular/common";
import { Component, Input } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { goals } from "../../constants/goals";
import { categories } from "../../../../../constants/categories";
import { ClassValidatorFormGroup } from "ngx-reactive-form-class-validator";

@Component({
  selector: "app-helpinhos-review",
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: "./helpinhos-review.component.html",
})
export class HelpinhosReviewComponent {
  cats = categories;
  gls = goals;
  @Input() formGroup: ClassValidatorFormGroup;

  constructor() {}

  retrieveSelectedCategories() {
    return this.cats.filter((category) =>
      this.formGroup.get("categories")?.value.includes(category.id)
    );
  }
}
