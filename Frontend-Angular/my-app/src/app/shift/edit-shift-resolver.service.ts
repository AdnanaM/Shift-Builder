import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve } from "@angular/router";
import { ShiftService } from "../providers/shift.service";


@Injectable()
export class ShiftResolver implements Resolve<any> {
    constructor(private shiftService:ShiftService) {}

    resolve(route: ActivatedRouteSnapshot) {
        return this.shiftService.getShift(route.params['id'])
    }
}
