import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from './shared/guards/auth.guard';

const routes: Routes = [{
  path: '',
  loadChildren: () => import('../app/authentication/authentication.module').then(m => m.AuthenticationModule),
},
{
  path: 'stories',
  loadChildren: () => import('../app/stories/stories.module').then(m => m.StoriesModule),
  canActivate: [AuthGuard]
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
