import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ChatgptTestComponent } from './pages/welcome/chatgpt-test/chatgpt-test.component';


const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/welcome' },
  { path: 'welcome', loadChildren: () => import('./pages/welcome/welcome.module').then(m => m.WelcomeModule) },
  { path: 'chatgpt', component: ChatgptTestComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
