import { Component, OnInit } from "@angular/core";
import { IUser } from "../user/user.model";
import { UsersService } from "../providers/users.service";

@Component({
    templateUrl:'./users.component.html',
    styleUrls: ['./users.component.css']
})

export class AllUsers implements OnInit{
    users!: IUser[]

    constructor(private usersService: UsersService){}

    ngOnInit(): void {
        this.usersService.getUsers().subscribe(users => {this.users = users})
    }
}