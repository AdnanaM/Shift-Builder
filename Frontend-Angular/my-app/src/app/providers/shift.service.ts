import { Injectable } from "@angular/core";
import { IShift } from "../shift/shift.model";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, of, Observable, tap } from "rxjs";
import { AuthService } from "./auth.service";

@Injectable()

export class ShiftService{
    currentShift!:IShift
    newShift!: IShift
    constructor(private http: HttpClient, private authService: AuthService){}

    saveShift(shift: IShift){
        const url = '/api/shift'
        const body = {
            userId: this.authService.currentUser._id,
            created: shift.created,
            start: shift.start,
            end: shift.end,
            price: shift.price,
            place: shift.place,
            shift_name: shift.shift_name
        }

        let options = {headers: new HttpHeaders({'Content-Type':'application/json'})}
        return this.http.post<IShift>(url, body, options)
        .pipe(tap(data => {
            Object.entries(data).find(([key, value]) => {
                if(key === 'data'){
                    this.currentShift = value
                    return true
                }
                return false
            })
        }))
        .pipe(catchError(this.handleError<IShift>('saveShift')))
    }


    getShifts(){
        return this.http.get<IShift[]>(`/api/shift/getAllShiftCreatedByUserId/${this.authService.currentUser._id}`)
        .pipe(catchError(this.handleError<IShift[]>('getShifts', [])))
        
    }

    getShift(id: number){
        return this.http.get<IShift>(`/api/shift/${id}`)
        .pipe(tap(data => {
            Object.entries(data).find(([key, value]) => {
                if(key === 'data'){
                    this.newShift = value
                    return true
                }
                return false
            })
        }))
        .pipe(catchError(this.handleError<IShift>('getShift')))
    }

    updateCurrentShift(created: Date, start: string, end: string, price:number, place: string, shift_name: string){
        this.newShift.created = created
        this.newShift.start = start
        this.newShift.end = end
        this.newShift.place = place
        this.newShift.price = price
        this.newShift.shift_name = shift_name

        let options = {headers: new HttpHeaders({'Content-Type':'application/json'})}

        return this.http.patch(`/api/shift/${this.newShift._id}`, this.newShift, options)
    }

    searchShifts(searchTerm: string) {
        return this.http.get<IShift[]>(`/api/shift/search?search=${searchTerm}`)
        .pipe(catchError(this.handleError<IShift[]>('searchShifts')))
    }


    private handleError<T> (operation='operation', result?:T){
        return (error:any): Observable<T> => {
          console.error(error)
          return of(result as T)
        }
    }
}