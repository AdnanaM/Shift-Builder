import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, of, Observable, tap } from "rxjs";
import { IShift } from "../shift/shift.model";

@Injectable()

export class ShiftsService{
    shift!: IShift

    constructor(private http: HttpClient){}

    getShifts(){
        return this.http.get<IShift[]>('/api/shift')
        .pipe(catchError(this.handleError<IShift[]>('getShifts', [])))
    }

    deleteShift(id: number){
        return this.http.delete<IShift>(`/api/shift/${id}`)
        .pipe(tap(data => {
            Object.entries(data).find(([key, value]) => {
                if(key === 'data'){
                    this.shift = value
                    return true
                }
                return false
            })
        }))
        .pipe(catchError(this.handleError<IShift>('deleteShift')))
    }


    private handleError<T> (operation='operation', result?:T){
        return (error:any): Observable<T> => {
          console.error(error)
          return of(result as T)
        }
    }
}