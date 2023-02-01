import { Component, OnInit, Inject } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { AuthService } from "../providers/auth.service";
import { TOASTR_TOKEN, Toastr } from "../providers/toastr.service";
import { Router } from "@angular/router";

@Component({
    templateUrl:'./profile.component.html',
    styleUrls: ['./profile.component.css']
})

export class ProfileComponent implements OnInit{
    profileForm!:FormGroup
    firstName!:FormControl
    lastName!:FormControl
    email!:FormControl
    userName!:FormControl
    age!:FormControl

    profileInvalid: boolean = false

    constructor(private authService: AuthService, private router:Router, @Inject(TOASTR_TOKEN) private toastr: Toastr){}


    ngOnInit(): void {
        this.firstName = new FormControl(this.authService.currentUser.firstname, [Validators.required, Validators.pattern("^[a-zA-Z0-9_.+-]*(?:[a-zA-Z][a-zA-Z0-9_.+-]*){2,}$")])
        this.lastName = new FormControl(this.authService.currentUser.lastname, [Validators.required, Validators.pattern("^[a-zA-Z0-9_.+-]*(?:[a-zA-Z][a-zA-Z0-9_.+-]*){2,}$")])
        this.email = new FormControl(this.authService.currentUser.email, [Validators.required, Validators.email])
        this.userName = new FormControl(this.authService.currentUser.username, [Validators.required, Validators.pattern("^[a-zA-Z0-9_.+-]*(?:[a-zA-Z][a-zA-Z0-9_.+-]*){6,}$")])
        this.age = new FormControl(this.authService.currentUser.age, [Validators.required, Validators.min(6), Validators.max(130)])

        this.profileForm = new FormGroup({
            firstName: this.firstName,
            lastName: this.lastName,
            email: this.email,
            userName: this.userName,
            age: this.age
        }) 
    }

    editProfile(formValues: any){
        if (this.profileForm.valid){
            this.authService.updateCurrentUser(formValues.firstName, formValues.lastName, formValues.email, formValues.userName, formValues.age)
            .subscribe(() => {
                this.toastr.success('Profile saved', "Success!")
                this.router.navigate(['main'])

            })
        }
    }

    cancel() {
        this.router.navigate(['/main'])
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

    validateUserName() {
        return this.userName.valid || this.userName.untouched
    }

    validateAge() {
        return this.age.valid || this.age.untouched
    }
}