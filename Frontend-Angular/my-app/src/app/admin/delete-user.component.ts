import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { UsersService } from "../providers/users.service";


@Component({
    template: `
        <div class="container">
            <h1>
                You have been deleted this profile with success!
            </h1>
            <h3>Thank you for your time!</h3>
        </div>
    `,
    styles: [
        `  .container {
            padding: 16px;
            text-align: center;
            width: 40%;
          }
        
          h1{
            font-family: Georgia, 'Times New Roman', Times, serif;
            color: #00b7f1;
          }
          h3{
            color: black
          }
          `
    ]
})

export class DeleteUserComponent{
    
    constructor(private router:Router, private usersService: UsersService){}

   
    cancel() {
        this.router.navigate(['user/allUsers'])
    }

}