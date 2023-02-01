import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve } from "@angular/router";
import { CommentService } from "../providers/comment.service";


@Injectable()
export class CommentResolver implements Resolve<any> {
    constructor(private commentService: CommentService) {}

    resolve(route: ActivatedRouteSnapshot) {
        return this.commentService.getComment(route.params['id'])
    }
}
