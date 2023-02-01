import { InjectionToken} from '@angular/core'

declare let toastr: Toastr
 
export let TOASTR_TOKEN = new InjectionToken<Toastr>('toastr') 

export interface Toastr {
    success(msg:string, title?: string) :void
    info(msg:string, title?: string) :void
    warning(msg:string, title?: string) :void
    error(msg:string, title?: string) :void
}

