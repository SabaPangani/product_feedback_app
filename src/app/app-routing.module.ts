import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateFeedbackComponent } from './pages/create-feedback/create-feedback.component';
import { DetailsComponent } from './pages/details/details.component';
import { HomeComponent } from './pages/home/home.component';
import { RoadmapComponent } from './pages/roadmap/roadmap.component';

const routes: Routes = [
  {'path':'home', redirectTo: '', pathMatch: 'full'},
  {'path':'', component:HomeComponent},
  {'path':'details/:id', component:DetailsComponent},
  {'path':'create-feedback', component:CreateFeedbackComponent},
  {'path':'roadmap', component:RoadmapComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
