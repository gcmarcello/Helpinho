import { CommonModule } from "@angular/common";
import { Component, Input } from "@angular/core";
import { FormGroup, ReactiveFormsModule } from "@angular/forms";
import { ClassValidatorFormGroup } from "ngx-reactive-form-class-validator";

@Component({
  selector: "app-checkbox",
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: "./checkbox.component.html",
})
export class CheckboxComponent {
  @Input() formGroup!: ClassValidatorFormGroup;
  @Input() name: string = "";
  @Input() label?: string;
  @Input() inputType: string = "text";
  @Input() placeholder?: string = "";
  @Input() required: boolean = false;
  @Input() disabled: boolean = false;
  @Input() autocomplete?: string;
}
