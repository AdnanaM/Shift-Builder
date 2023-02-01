import { Component, Inject, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { AuthService } from "../providers/auth.service";
import { Router } from "@angular/router";
import { TOASTR_TOKEN, Toastr } from "../providers/toastr.service";
//import { ToastrService } from "../providers/toastr.service";


@Component({
    templateUrl:'./register.component.html',
    styleUrls: ['./register.component.css']
})

export class RegisterComponent implements OnInit{
    registerForm!:FormGroup
    firstName!:FormControl
    lastName!:FormControl
    email!:FormControl
    password!:FormControl
    userName!:FormControl
    age!:FormControl

    registerInvalid: boolean = false

    constructor(private authService: AuthService, private router: Router, @Inject(TOASTR_TOKEN) private toastr: Toastr){}
    //constructor(private authService: AuthService, private router: Router){}
    //constructor(private authService: AuthService, private router: Router, private toastr: ToastrService){}

    ngOnInit(): void{
        this.firstName = new FormControl('', [Validators.required, Validators.pattern("^[a-zA-Z0-9_.+-]*(?:[a-zA-Z][a-zA-Z0-9_.+-]*){2,}$")])
        this.lastName = new FormControl('', [Validators.required, Validators.pattern("^[a-zA-Z0-9_.+-]*(?:[a-zA-Z][a-zA-Z0-9_.+-]*){2,}$")])
        this.email = new FormControl('', [Validators.required, Validators.email])
        this.password = new FormControl('', [Validators.required, Validators.pattern('((?=.*[a-z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{6,}))|((?=.*[a-z])(?=.*[A-Z])(?=.*[^A-Za-z0-9])(?=.{8,}))')])
        this.userName = new FormControl('', [Validators.required, Validators.pattern("^[a-zA-Z0-9_.+-]*(?:[a-zA-Z][a-zA-Z0-9_.+-]*){6,}$")])
        this.age = new FormControl('', [Validators.required, Validators.min(6), Validators.max(130)])

        this.registerForm = new FormGroup({
            firstName: this.firstName,
            lastName: this.lastName,
            email: this.email,
            password: this.password,
            userName: this.userName,
            age: this.age
        }) 
    }

    saveProfile(formValues:any){
        this.authService.registerUser(formValues.firstName, formValues.lastName, formValues.email, formValues.password, formValues.userName, formValues.age)
        .subscribe((resp: any) => {
            if(!resp){
                this.registerInvalid = true
            } else{
                this.registerInvalid = true
                setTimeout(() => {
                    this.router.navigate(['user/login'])
                }, 3000)
            }
        })
    }

    validateFirstName() {
        return this.firstName.valid || this.firstName.untouched 
    }

    validateLastName() {
        return this.lastName.valid || this.lastName.untouched
    }

    validateEmail() {
        return this.email.valid || this.email.untouched
    }

    validatePassword() {
        return this.password.valid || this.password.untouched
    }

    validateUserName() {
        return this.userName.valid || this.userName.untouched
    }

    validateAge() {
        return this.age.valid || this.age.untouched
    }
}