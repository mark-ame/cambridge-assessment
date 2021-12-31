import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddEditArticleComponent } from './pages/add-edit-article/add-edit-article.component';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'home', component: HomeComponent },
  { path: 'article', component: AddEditArticleComponent },
  { path: '',   redirectTo: '/login', pathMatch: 'full' }, // redirect to `login`
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
