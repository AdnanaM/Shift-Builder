import { Component, Input } from "@angular/core";
import { AuthService } from "../providers/auth.service";
import { IShift } from "../shift/shift.model";
import { ShiftService } from "../providers/shift.service";

@Component({
    selector:"search-results",
    templateUrl:'./search-result.component.html',
    styleUrls: ['./search-result.component.css']
})

export class SearchResultsComponent{
    searchTerm: string = ""
    foundShifts!: IShift[]

    constructor(public authService: AuthService, private shiftService: ShiftService){}

    searchShifts(searchTerm: string){
        this.shiftService.searchShifts(searchTerm).subscribe(shifts => {
            this.foundShifts = shifts
            console.log(this.foundShifts)
        })
    }
}