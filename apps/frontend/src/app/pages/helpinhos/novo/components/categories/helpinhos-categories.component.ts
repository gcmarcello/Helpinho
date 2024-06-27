import { Component, Input, OnInit } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { categories } from "../../../../../constants/categories";
import {
  ClassValidatorFormBuilderModule,
  ClassValidatorFormGroup,
} from "ngx-reactive-form-class-validator";
import { CommonModule } from "@angular/common";
import { goals } from "../../constants/goals";

@Component({
  selector: "app-helpinhos-categories",
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: "./helpinhos-categories.component.html",
})
export class HelpinhosCategoriesComponent {
  cats = categories;
  gls = goals;
  @Input() formGroup: ClassValidatorFormGroup;

  toggleCategory(category: string) {
    const categories = this.formGroup.get("categories")?.value;
    if (categories.includes(category)) {
      this.formGroup
        .get("categories")
        ?.setValue(categories.filter((c: string) => c !== category));
    } else {
      this.formGroup.get("categories")?.setValue([...categories, category]);
    }
  }
}
