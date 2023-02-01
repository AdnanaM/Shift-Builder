import { Routes } from "@angular/router";
import { MainContentComponent } from "./main-page/main-content.component";
import { CreateShiftComponent } from "./shift/create-shift.component";
import { EditShiftComponent } from "./shift/edit-shift.component";
import { ShiftListComponent } from "./shift/shift-list.component";
import { ShiftResolver } from './shift/edit-shift-resolver.service'
import { CreateCommentComponent } from "./comment/create-comment.component";
import { SearchResultsComponent } from "./search/search-result.component";
import { CommentsComponent } from "./comment/comments.component";
import { CommentResolver } from "./comment/comments-resolver.service";
import { AllUsers } from "./admin/users.component";
import { DeleteUserComponent } from "./admin/delete-user.component";
import { DeleteUserResolver } from "./admin/delete-user-resolver.service";
import { AllShifts } from "./admin/shifts.component";
import { DeleteShiftComponent } from "./admin/delete-shift.component";
import { DeleteShiftsResolver } from './admin/delete-shift-resolve.service'



export const appRoutes: Routes = [
    {path: 'user/allShifts/delete/:id', component: DeleteShiftComponent, resolve: {user: DeleteShiftsResolver}},
    {path: 'user/allShifts', component: AllShifts},
    {path: 'user/allUsers/delete/:id', component: DeleteUserComponent, resolve: {user: DeleteUserResolver}},
    {path: 'user/allUsers', component: AllUsers},
    {path: 'comment/:id', component: CommentsComponent, resolve: {commentsInfo: CommentResolver}},
    {path: 'shift/search', component: SearchResultsComponent},
    {path: 'shift/edit/:id', component: EditShiftComponent, resolve: {shift:ShiftResolver}},
    {path: 'shift', component: ShiftListComponent},
    {path: 'shift/new', component: CreateShiftComponent},
    {path: 'comment/new/:id', component: CreateCommentComponent, resolve: {shift:ShiftResolver}},
    {path: "main", component: MainContentComponent},
    {path: '', redirectTo:'/main', pathMatch:'full'},
    {path:'user', 
        loadChildren: () => import('./user/user.module')
        .then (m => m.UserModule)
    }
]