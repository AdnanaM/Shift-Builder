import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve } from "@angular/router";
import { ShiftsService } from "../providers/shifts.service";


@Injectable()
export class DeleteShiftsResolver implements Resolve<any> {
    constructor(private shiftsService: ShiftsService) {}

    resolve(route: ActivatedRouteSnapshot) {
        return this.shiftsService.deleteShift(route.params['id'])
    }
}