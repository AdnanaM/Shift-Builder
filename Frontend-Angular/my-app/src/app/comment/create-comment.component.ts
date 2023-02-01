import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { CommentService } from "../providers/comment.service";

@Component({
    templateUrl:'./create-comment.component.html',
    styleUrls: ['./create-comment.component.css']
})

export class CreateCommentComponent implements OnInit {
    commentForm!: FormGroup
    created!: FormControl
    description!: FormControl

    constructor(private commentService: CommentService ,private router:Router){}

    ngOnInit(): void {
        this.created = new FormControl('', Validators.required)
        this.description = new FormControl('', Validators.required)

        this.commentForm = new FormGroup({
            created: this.created,
            description: this.description
        })
    }

    createComment(formValues:any){
        this.commentService.createComment(formValues).subscribe((formValues) => {
            console.log(formValues)
            this.router.navigate(['shift'])
        })
    }

    cancel() {
        this.router.navigate(['/shift'])
    }

    validateDate() {
        return this.created.valid || this.created.untouched 
    }

    validateDescription(){
        return this.description.valid || this.description.untouched 
    }

    
}
