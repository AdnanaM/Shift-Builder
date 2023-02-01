export interface IUser{
    _id: number,
    firstname: string,
    lastname: string,
    email: string,
    password: string,
    username: string,
    age: number,
    permission?: string
}