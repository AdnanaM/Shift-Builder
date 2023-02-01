import { Component } from "@angular/core";
import { IComment } from "./comment.model";
import { ActivatedRouteSnapshot, Resolve } from "@angular/router";
import {ActivatedRoute} from '@angular/router'

@Component({
    templateUrl:'./comments.component.html',
    styleUrls: ['./comments.component.css']
})

export class CommentsComponent{
    comments!:IComment[] 
    commentsInfo!: IComment[]
    constructor(private route:ActivatedRoute){}

    ngOnInit(route: ActivatedRouteSnapshot){
        this.commentsInfo = this.route.snapshot.data['commentsInfo']
    }
}