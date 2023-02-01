import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { HttpClientModule } from '@angular/common/http'



import { AppComponent } from './app.component';
import { NavBarComponent } from './navbar/navbar.component';
import { Toastr, TOASTR_TOKEN } from './providers/toastr.service';
import { MainContentComponent } from './main-page/main-content.component';
import { appRoutes } from './routes';
import { AuthService } from './providers/auth.service';
import { ShiftService } from './providers/shift.service';
import { CreateShiftComponent} from './shift/create-shift.component';
import { ShiftListComponent} from './shift/shift-list.component';
import { CollapsibleWellComponent} from './shift/collapsible-well.component';
import { EditShiftComponent} from './shift/edit-shift.component';
import { ShiftResolver } from './shift/edit-shift-resolver.service';
import { CreateCommentComponent } from './comment/create-comment.component';
import { CommentService} from './providers/comment.service';
import { SearchResultsComponent } from './search/search-result.component';
import { CommentsComponent } from './comment/comments.component';
import { CommentResolver } from './comment/comments-resolver.service';
import { UpdatePasswordComponent } from './user/update-password.component'


declare let toastr:Toastr

//Components used only by admin
import { AllUsers } from './admin/users.component'
import { UsersService } from './providers/users.service';
import { DeleteUserComponent } from './admin/delete-user.component';
import { DeleteUserResolver } from './admin/delete-user-resolver.service';
import { AllShifts } from './admin/shifts.component';
import { ShiftsService } from './providers/shifts.service';
import { DeleteShiftComponent } from './admin/delete-shift.component';
import { DeleteShiftsResolver } from './admin/delete-shift-resolve.service'


@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    MainContentComponent,
    CreateShiftComponent,
    ShiftListComponent,
    CollapsibleWellComponent,
    EditShiftComponent,
    CreateCommentComponent,
    SearchResultsComponent,
    CommentsComponent,
    UpdatePasswordComponent,
    AllUsers,
    DeleteUserComponent,
    AllShifts,
    DeleteShiftComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes),
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
  ],
  providers: [
    {provide:TOASTR_TOKEN, useValue:toastr},
    AuthService,
    ShiftService,
    ShiftResolver,
    CommentService,
    CommentResolver,
    UsersService,
    DeleteUserResolver,
    ShiftsService,
    DeleteShiftsResolver

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

