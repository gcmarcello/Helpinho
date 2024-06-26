import { CommonModule } from "@angular/common";
import { Component, Input } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { InputComponent } from "../../../../components/form/input/input.component";
import { TextAreaComponent } from "../../../../components/form/textarea/textarea.component";
import { FileInputComponent } from "../../../../components/form/file-input/file-input.component";
import { ClassValidatorFormGroup } from "ngx-reactive-form-class-validator";

@Component({
  selector: "app-helpinhos-info",
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule,
    InputComponent,
    TextAreaComponent,
    FileInputComponent,
  ],
  templateUrl: "./helpinhos-info.component.html",
})
export class HelpinhosInfoComponent {
  @Input() formGroup: ClassValidatorFormGroup;
  constructor() {}

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
