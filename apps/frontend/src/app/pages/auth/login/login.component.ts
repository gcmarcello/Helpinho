import { Component, signal } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { InputComponent } from "../../../components/form/input/input.component";
import { ButtonComponent } from "../../../components/button/button.component";
import {
  ClassValidatorFormBuilderModule,
  ClassValidatorFormBuilderService,
} from "ngx-reactive-form-class-validator";
import { Router, RouterModule } from "@angular/router";
import { AuthService } from "../../../services/auth.service";
import { CheckboxComponent } from "../../../components/form/checkbox/checkbox.component";
import { LoginDto } from "shared-types";

@Component({
  selector: "app-login",
  standalone: true,
  imports: [
    ReactiveFormsModule,
    InputComponent,
    ButtonComponent,
    ClassValidatorFormBuilderModule,
    CheckboxComponent,
    RouterModule,
  ],
  templateUrl: "./login.component.html",
})
export class LoginComponent {
  profileForm = this.fb.group(
    LoginDto,
    {
      email: [""],
      password: [""],
      remember: [false],
    },
    { updateOn: "change" }
  );
  loading = signal(false);

  constructor(
    private fb: ClassValidatorFormBuilderService,
    private authService: AuthService,
    private router: Router
  ) {}

  async login() {
    if (this.profileForm.invalid) return;
    this.loading.set(true);
    this.authService.login(this.profileForm).subscribe({
      next: (result) => {
        this.router.navigate(["/"]);
      },
      complete: () => this.loading.set(false),
    });
  }
}
