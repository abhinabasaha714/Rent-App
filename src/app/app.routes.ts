import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ApartmentDetailComponent } from './apartment-detail/apartment-detail.component';
import { UserSignupComponent } from './user-signup/user-signup.component';
import { CreatePostComponent } from './create-post/create-post.component';
import { NgModule } from '@angular/core';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './auth/auth.guard';
import { WishlistComponent } from './wishlist/wishlist.component';

export const routes: Routes = [
    {path:'', component: HomeComponent},
    {path: 'apartment/:id', component: ApartmentDetailComponent, canActivate: [AuthGuard]},
    {path: 'signup', component: UserSignupComponent},
    {path: 'create-post', component: CreatePostComponent, canActivate: [AuthGuard]},
    {path: 'login', component: LoginComponent},
    {path: 'wishlist', component: WishlistComponent}
];
@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
  })

export class AppRoutingModule{}