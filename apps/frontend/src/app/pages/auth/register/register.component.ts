import { Component, signal } from "@angular/core";
import {
  ClassValidatorFormBuilderModule,
  ClassValidatorFormBuilderService,
} from "ngx-reactive-form-class-validator";
import { SignupDto } from "shared-types/dist/dto/auth.dto";
import { AuthService } from "../../../services/auth.service";
import { Router, RouterModule } from "@angular/router";
import { ButtonComponent } from "../../../components/button/button.component";
import { ReactiveFormsModule } from "@angular/forms";
import { CheckboxComponent } from "../../../components/form/checkbox/checkbox.component";
import { InputComponent } from "../../../components/form/input/input.component";
import { parseInputErrors } from "../../../components/form/utils/error-handling";

@Component({
  selector: "app-register",
  standalone: true,
  imports: [
    ClassValidatorFormBuilderModule,
    ButtonComponent,
    ReactiveFormsModule,
    CheckboxComponent,
    InputComponent,
    RouterModule,
  ],
  providers: [],
  templateUrl: "./register.component.html",
})
export class RegisterComponent {
  profileForm = this.fb.group(
    SignupDto,
    {
      name: [""],
      email: [""],
      password: [""],
      phone: [""],
    },
    { updateOn: "change" }
  );

  loading = signal(false);

  constructor(
    private fb: ClassValidatorFormBuilderService,
    private authService: AuthService,
    private router: Router
  ) {}

  async register() {
    this.loading.set(true);
    this.authService.signup(this.profileForm).subscribe({
      next: (result) => {
        this.loading.set(false);
        this.router.navigate(["/"]);
      },
      complete: () => {
        this.loading.set(false);
      },
    });
  }
}
