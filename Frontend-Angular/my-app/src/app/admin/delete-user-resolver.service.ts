import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve } from "@angular/router";
import { UsersService } from "../providers/users.service";


@Injectable()
export class DeleteUserResolver implements Resolve<any> {
    constructor(private userService:UsersService) {}

    resolve(route: ActivatedRouteSnapshot) {
        return this.userService.deleteUser(route.params['id'])
    }
}