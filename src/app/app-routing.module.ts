import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateFeedbackComponent } from './pages/create-feedback/create-feedback.component';
import { DetailsComponent } from './pages/details/details.component';
import { HomeComponent } from './pages/home/home.component';

const routes: Routes = [
  {'path':'', component:HomeComponent},
  {'path':'details/:id', component:DetailsComponent},
  {'path':'create-feedback', component:CreateFeedbackComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
