import { Injectable } from "@angular/core";
import { IUser } from "../user/user.model";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, of, Observable, tap } from "rxjs";

@Injectable()

export class UsersService{
    user!: IUser

    constructor(private http: HttpClient){}

    getUsers(){
        return this.http.get<IUser[]>('/api/user')
        .pipe(catchError(this.handleError<IUser[]>('getUsers', [])))
    }

    deleteUser(id: number){
        return this.http.delete<IUser>(`/api/user/${id}`)
        .pipe(tap(data => {
            Object.entries(data).find(([key, value]) => {
                if(key === 'data'){
                    this.user = value
                    return true
                }
                return false
            })
        }))
        .pipe(catchError(this.handleError<IUser>('deleteUser')))
    }


    private handleError<T> (operation='operation', result?:T){
        return (error:any): Observable<T> => {
          console.error(error)
          return of(result as T)
        }
    }
}