import { Component, Input, OnInit } from "@angular/core";
import { Form, FormControl, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { ShiftService } from "../providers/shift.service";

@Component({
    templateUrl:'./create-shift.component.html',
    styleUrls: ['./create-shift.component.css']
})

export class CreateShiftComponent implements OnInit{
    shiftForm!: FormGroup
    created!:FormControl
    start!: FormControl
    end!: FormControl
    price!: FormControl
    place!: FormControl
    shift_name!: FormControl

    constructor(private shiftService: ShiftService,private router:Router){}

    ngOnInit(): void {
        this.created = new FormControl('', Validators.required);
        this.start = new FormControl('', Validators.required)
        this.end = new FormControl('', Validators.required)
        this.price = new FormControl('', Validators.required)
        this.place = new FormControl('', Validators.required)
        this.shift_name = new FormControl('', Validators.required)

        this.shiftForm = new FormGroup({
            created: this.created,
            start: this.start,
            end: this.end,
            price: this.price,
            place: this.place,
            shift_name: this.shift_name
        })
    }

    saveShift(formValues: any){
        this.shiftService.saveShift(formValues).subscribe((formValues) => {
            console.log(formValues)
            this.router.navigate(['/shift'])
        })
    }


    cancel() {
        this.router.navigate(['/main'])
    }

    validateDate() {
        return this.created.valid || this.created.untouched 
    }

    validateStartTime() {
        return this.start.valid || this.start.untouched
    }

    validateEndTime() {
        return this.end.valid || this.end.untouched
    }

    validateHourlyWage() {
        return this.price.valid || this.price.untouched
    }

    validateWorkplace() {
        return this.place.valid || this.place.untouched
    }

    validateShiftName() {
        return this.shift_name.valid || this.shift_name.untouched
    }
}