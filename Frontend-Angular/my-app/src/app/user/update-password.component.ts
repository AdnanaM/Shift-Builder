import { Component, Inject, OnInit } from "@angular/core";
import { AuthService } from "../providers/auth.service";
import { Router } from "@angular/router";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Toastr, TOASTR_TOKEN } from "../providers/toastr.service";

@Component({
    templateUrl:'./update-password.component.html',
    styleUrls: ['./update-password.component.css']
})

export class UpdatePasswordComponent implements OnInit{
    updatePasswordForm!: FormGroup
    currentPassword!: FormControl
    newPassword!: FormControl

    updatePasswordInvalid: Boolean = false

    constructor(private authService: AuthService, private router: Router, @Inject(TOASTR_TOKEN) private toastr: Toastr){}

    ngOnInit(): void {
        this.currentPassword = new FormControl('', Validators.required)
        this.newPassword = new FormControl('', [Validators.required, Validators.pattern('((?=.*[a-z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{6,}))|((?=.*[a-z])(?=.*[A-Z])(?=.*[^A-Za-z0-9])(?=.{8,}))')])
        
        this.updatePasswordForm = new FormGroup({
            newPassword: this.newPassword,
            currentPassword: this.currentPassword
        })
    }

    updatePassword(formValues: any){
        this.authService.updatePassword(formValues.currentPassword, formValues.newPassword)
        .subscribe((response: any) => {
            if(!response){
                this.updatePasswordInvalid = true
            }else{
                this.toastr.success('Password changed with succes!:)', 'Success!')
                this.router.navigate(['main'])
            }
        })
    }

    cancel() {
        this.router.navigate(['/main'])
    }

    validateNewPassword() {
        return this.newPassword.valid || this.newPassword.untouched
    }

    validateCurrentPassword() {
        return this.currentPassword.valid || this.currentPassword.untouched
    }
    
}