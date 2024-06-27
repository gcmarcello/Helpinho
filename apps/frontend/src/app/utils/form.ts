import { FormGroup } from "@angular/forms";
import { EMPTY, Observable } from "rxjs";

export function parseInputErrors(formGroup: FormGroup, name: string) {
  const errors = formGroup.get(name)?.errors;
  if (!errors) return;
  const parsedErrors = Object.values(formGroup.get(name)?.errors!)[0];
  return parsedErrors;
}

export function handleFormErrors(
  form: FormGroup,
  error: any
): Observable<never> {
  if (error?.error?.fields && error.error.fields.length) {
    for (const field of error.error.fields) {
      if (form.controls[field]) {
        form.controls[field].setErrors({ invalid: error.error.message });
      }
    }
  } else {
    form.setErrors({ invalid: error.error.message });
  }
  return EMPTY;
}
