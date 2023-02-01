import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, of, Observable, tap } from "rxjs";
import { IComment } from "../comment/comment.model";
import { AuthService } from "./auth.service";
import { ShiftService } from "./shift.service";


@Injectable()

export class CommentService{
    currentComment!: IComment

    constructor(private authService: AuthService, private shiftService: ShiftService, private http: HttpClient){}

    createComment(comment: IComment){
        const url = 'api/comment'
        const body = {
            userId: this.authService.currentUser._id,
            shiftId: this.shiftService.newShift._id,
            created: comment.created,
            description: comment.description
        }

        let options = {headers: new HttpHeaders({'Content-Type':'application/json'})}
        return this.http.post<IComment>(url, body, options)
        .pipe(tap(data => {
            Object.entries(data).find(([key, value]) => {
                if(key === 'data'){
                    this.currentComment = value
                    return true
                }
                return false
            })
        }))
        .pipe(catchError(this.handleError<IComment>('createComment')))
    }

    getComment(id: number){
        return this.http.get<IComment>(`/api/comment/getCommentForShift/${id}`)
        .pipe(tap(data => {
            Object.entries(data).find(([key, value]) => {
                if(key === 'data'){
                    this.currentComment = value
                    return true
                }
                return false
            })
        }))
        .pipe(catchError(this.handleError<IComment>('getComment')))
        
    }

    private handleError<T> (operation='operation', result?:T){
        return (error:any): Observable<T> => {
          console.error(error)
          return of(result as T)
        }
    }
}