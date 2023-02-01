import { Component, OnInit } from "@angular/core";
import { ShiftService } from "../providers/shift.service";
import { IShift } from "./shift.model";

@Component({
    templateUrl:'./shift-list.component.html',
    styleUrls: ['./shift-list.component.css']
})

export class ShiftListComponent implements OnInit{
    shifts!:IShift[] 

    constructor(private shiftService: ShiftService){}

    ngOnInit(): void {
        this.shiftService.getShifts().subscribe(shifts => {this.shifts = shifts})
    }

}



