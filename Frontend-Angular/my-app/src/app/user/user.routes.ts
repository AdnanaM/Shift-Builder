import { Routes } from "@angular/router";
import { LoginComponent } from "./login.component";
import { ProfileComponent } from "./profile.component";
import { RegisterComponent } from "./register.component";
import { UpdatePasswordComponent } from "./update-password.component";

export const userRoutes : Routes = [
    {path: 'updatePassword', component: UpdatePasswordComponent},
    {path: 'profile', component: ProfileComponent},
    {path: 'login', component: LoginComponent},
    {path: 'signup', component: RegisterComponent},
]