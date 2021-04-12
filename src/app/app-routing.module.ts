import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccountComponent } from './account/account.component';
import { AuthGuard } from './auth.guard';
import { DonorlistComponent } from './donorlist/donorlist.component';
import { LoginComponent } from './login/login.component';
import { PostComponent } from './post/post.component';
import { PostedreqsComponent } from './postedreqs/postedreqs.component';
import { RequestComponent } from './request/request.component';
import { SignupComponent } from './signup/signup.component';
import { WelcomeComponent } from './welcome/welcome.component';


const routes: Routes = [{path: '', component: WelcomeComponent},
{path: 'login', component: LoginComponent},
{path: 'signup', component: SignupComponent},
{path: 'account', canActivate: [AuthGuard], component: AccountComponent},
{path: 'finddonor', component: DonorlistComponent},
{path: 'account/requests', canActivate: [AuthGuard], component: RequestComponent},
{path: 'account/post', canActivate: [AuthGuard], component: PostComponent},
{path: 'account/postedreqs', canActivate: [AuthGuard], component: PostedreqsComponent},
{path: 'account/delete/:id', canActivate: [AuthGuard], component: PostedreqsComponent},
{path: 'account/update', canActivate: [AuthGuard], component: PostComponent}]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
