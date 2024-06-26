import { CommonModule } from "@angular/common";
import { Component, Input, OnInit, ViewEncapsulation } from "@angular/core";
import { FormGroup, ReactiveFormsModule } from "@angular/forms";
import { parseInputErrors } from "../utils/error-handling";
import { ClassValidatorFormGroup } from "ngx-reactive-form-class-validator";

@Component({
  selector: "app-input",
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: "./input.component.html",
  encapsulation: ViewEncapsulation.None,
})
export class InputComponent {
  @Input() formGroup!: ClassValidatorFormGroup;
  @Input() name: string = "";
  @Input() label?: string;
  @Input() inputType: string = "text";
  @Input() placeholder?: string = "";
  @Input() required: boolean = false;
  @Input() disabled: boolean = false;
  @Input() autocomplete?: string;
  @Input() inputMode?: string;

  parseInputErrors = parseInputErrors;

  getInputStyle() {
    return this.formGroup.get(this.name)?.valid &&
      this.formGroup.get(this.name)?.touched
      ? this.inputStyles.valid
      : this.formGroup.get(this.name)?.invalid &&
          this.formGroup.get(this.name)?.touched
        ? this.inputStyles.invalid
        : this.inputStyles.disabled;
  }

  inputStyles = {
    valid:
      "focus:ring-primary-300 block w-full rounded-md border-0 py-1.5 text-neutral-900 shadow-sm ring-1 ring-inset ring-neutral-300 placeholder:text-neutral-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6",
    invalid:
      "block w-full rounded-md border-0 py-1.5 pr-10 text-red-900 ring-1 ring-inset ring-red-300 placeholder:text-red-300 focus:ring-2 focus:ring-inset focus:ring-red-500 sm:text-sm sm:leading-6",
    disabled:
      "block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary-300 disabled:cursor-not-allowed disabled:bg-gray-50 disabled:text-gray-500 disabled:ring-gray-200 sm:text-sm sm:leading-6",
  };
}
