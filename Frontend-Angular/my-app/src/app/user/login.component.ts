import { Component, Inject, OnInit } from "@angular/core";
import { AuthService } from "../providers/auth.service";
import { Router } from "@angular/router";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Toastr, TOASTR_TOKEN } from "../providers/toastr.service";

@Component({
    templateUrl:'./login.component.html',
    styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit{
    loginForm!:FormGroup
    email!:FormControl
    password!:FormControl

    loginInvalid: Boolean = false

    constructor(private authService: AuthService, private router: Router, @Inject(TOASTR_TOKEN) private toastr: Toastr){}
    //constructor(private authService: AuthService, private router: Router){}

    ngOnInit(): void {
        this.email = new FormControl('', [Validators.required, Validators.email])
        this.password = new FormControl('', [Validators.required, Validators.pattern('((?=.*[a-z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{6,}))|((?=.*[a-z])(?=.*[A-Z])(?=.*[^A-Za-z0-9])(?=.{8,}))')])

        this.loginForm = new FormGroup({
            email: this.email,
            password: this.password
        })
    }

    loginProfile(formValues: any){
        this.authService.loginUser(
            formValues.email,
            formValues.password
        )
        .subscribe((response: any) => {
            if(!response){
                this.loginInvalid = true
            }else{
                this.router.navigate(['main'])
            }
        })
    }

    validatePassword() {
        return this.password.valid || this.password.untouched
    }

    validateEmail() {
        return this.email.valid || this.email.untouched
    }

    
}