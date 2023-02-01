import { Component, Input, Inject } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { ShiftService } from "../providers/shift.service";
import { Router } from "@angular/router";
import { TOASTR_TOKEN, Toastr } from "../providers/toastr.service";

@Component({
    templateUrl:'./edit-shift.component.html',
    styleUrls: ['./edit-shift.component.css']
})

export class EditShiftComponent{
    shiftForm!: FormGroup
    created!:FormControl
    start!: FormControl
    end!: FormControl
    price!: FormControl
    place!: FormControl
    shift_name!: FormControl


    constructor(private shiftService: ShiftService, private router:Router, @Inject(TOASTR_TOKEN) private toastr: Toastr){}

    ngOnInit(): void {
        this.created = new FormControl(this.shiftService.newShift.created, Validators.required);
        this.start = new FormControl(this.shiftService.newShift.start, Validators.required)
        this.end = new FormControl(this.shiftService.newShift.end, Validators.required)
        this.price = new FormControl(this.shiftService.newShift.price, Validators.required)
        this.place = new FormControl(this.shiftService.newShift.place, Validators.required)
        this.shift_name = new FormControl(this.shiftService.newShift.shift_name, Validators.required)

        this.shiftForm = new FormGroup({
            created: this.created,
            start: this.start,
            end: this.end,
            price: this.price,
            place: this.place,
            shift_name: this.shift_name
        })
    }

    editShift(formValues:any){
        if (this.shiftForm.valid){
            this.shiftService.updateCurrentShift(formValues.created, formValues.start, formValues.end, formValues.price, formValues.place, formValues.shift_name)
            .subscribe(() => {
              this.toastr.success('Shift saved', "Success!")
              this.router.navigate(['shift'])
            })
        }
    }

    cancel() {
        this.router.navigate(['/shift'])
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