import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { RegisterComponent } from "./register.component";
import { LoginComponent } from "./login.component";
import { ProfileComponent } from "./profile.component";
import { ReactiveFormsModule } from "@angular/forms";
import { userRoutes } from "./user.routes";

@NgModule({
    declarations: [ProfileComponent, LoginComponent, RegisterComponent],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        RouterModule.forChild(userRoutes)
    ],
    providers: []
})

export class UserModule{}