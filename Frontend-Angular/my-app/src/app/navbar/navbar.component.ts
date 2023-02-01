import { Component, Input } from "@angular/core";
import { AuthService } from "../providers/auth.service";
import { Router } from "@angular/router";
import { ShiftService } from "../providers/shift.service";
import { IShift } from "../shift/shift.model";



@Component({
    selector:"nav-bar",
    templateUrl:'./navbar.component.html',
    styleUrls: ['./navbar.component.css']
})

export class NavBarComponent {
    searchTerm: string = ""
    foundSessions!: IShift[]

    constructor(public authService: AuthService, private router:Router, private shiftService: ShiftService){}

    logout(){
        this.authService.logout().subscribe(() => {
            this.router.navigate(['/main'])
            location.reload()
        })
    }

    searchSessions(searchTerm: string){
        this.shiftService.searchShifts(searchTerm).subscribe(sessions => {
            this.foundSessions = sessions
            //console.log(this.foundSessions)
        })
    }
}