import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { of, catchError, tap, Observable } from "rxjs";
import { IUser } from "../user/user.model";

@Injectable()
export class AuthService {
    currentUser!: IUser
    admin!: any

    constructor(private http: HttpClient){}

    registerUser(firstName: string, lastName:string,email:string, password:string, userName:string, age:number){
        let registerInfo = {
            firstname: firstName, 
            lastname: lastName, 
            email: email, 
            password: password, 
            username: userName, 
            age: age
        }
        let options = {headers: new HttpHeaders({'Content-Type': 'application/json'})}

        return this.http.post('api/user/signup', registerInfo, options)
            .pipe(catchError(err => {
                return of(false)
            }))
    }

    loginUser(email: String, password: string){
        let loginInfo = {
            email: email,
            password: password
        }
        let options = {headers: new HttpHeaders({'Content-Type': 'application/json'})}

        return this.http.post('api/user/login', loginInfo, options)
        .pipe(tap(data => {
            Object.entries(data).find(([key, value]) => {
                if(key === 'user'){
                    this.currentUser = value

                    if(this.currentUser.permission === "admin"){
                        this.admin = true
                        console.log(this.admin)
                    }

                    return true
                }
                return false
            })
        }))
        .pipe(catchError(err => {
            return of(false)
        }))
    }

    updateCurrentUser(firstName:string, lastName:string, email:string, userName:string, age:number){
        this.currentUser.firstname = firstName
        this.currentUser.lastname = lastName
        this.currentUser.email = email
        this.currentUser.username = userName
        this.currentUser.age = age

        let options = {headers: new HttpHeaders({'Content-Type':'application/json'})}

        return this.http.patch(`/api/user/${this.currentUser._id}`, this.currentUser, options)
    }

    checkAuthStatus(){
        this.http.get('/api/user/getUser')
        .subscribe(data => { 
            if (data instanceof Object)
            this.currentUser = <IUser> data

            if(this.currentUser.permission === "admin")
            this.admin = true
        })
    }


    logout(){
        this.currentUser = <IUser> {}
        let options = {headers: new HttpHeaders({'Content-Type':'application/json'} )}
        return this.http.post('/api/user/logout', {}, options)
    }


    isAuthenticated(){
        return !!this.currentUser
    }


    updatePassword(currentPassword: string, newPassword: string){
        let body = {
            currentPassword: currentPassword,
            password: newPassword
        }

        let options = {headers: new HttpHeaders({'Content-Type':'application/json'})}
        return this.http.patch(`/api/user/updatePassword/${this.currentUser._id}`, body, options)
    }


    isAdmin(){
        return this.admin
    }
}