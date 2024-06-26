import { Routes } from "@angular/router";
import { LoginComponent } from "./pages/auth/login/login.component";
import { HomeComponent } from "./pages/home/home.component";
import { HelpinhosComponent } from "./pages/helpinhos/helpinhos.component";
import { RegisterComponent } from "./pages/auth/register/register.component";
import { NotFoundComponent } from "./pages/not-found/notfound.component";
import { AuthComponent } from "./pages/auth/auth.component";
import { AuthGuard, AuthPageGuard } from "./guards/auth.guard";

export const routes: Routes = [
  { path: "", component: HomeComponent },
  {
    path: "helpinhos",
    component: HelpinhosComponent,
    canActivate: [AuthGuard],
  },
  {
    path: "auth",
    component: AuthComponent,
    children: [
      {
        path: "login",
        component: LoginComponent,
      },
      {
        path: "register",
        component: RegisterComponent,
      },
    ],
    canActivate: [AuthPageGuard],
  },
  { path: "**", component: NotFoundComponent },
];
