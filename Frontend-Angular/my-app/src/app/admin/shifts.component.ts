import { Component, OnInit } from "@angular/core";
import { IShift } from "../shift/shift.model";
import { ShiftsService } from "../providers/shifts.service";

@Component({
    templateUrl:'./shifts.component.html',
    styleUrls: ['./shifts.component.css']
})

export class AllShifts implements OnInit{
    shifts!: IShift[]

    constructor(private shiftsService: ShiftsService){}

    ngOnInit(): void {
        this.shiftsService.getShifts().subscribe(shifts => {this.shifts = shifts})
    }
}