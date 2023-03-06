import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateFeedbackComponent } from './pages/create-feedback/create-feedback.component';
import { DetailsComponent } from './pages/details/details.component';
import { EditFeedbackComponent } from './pages/edit-feedback/edit-feedback.component';
import { HomeComponent } from './pages/home/home.component';
import { RoadmapComponent } from './pages/roadmap/roadmap.component';

const routes: Routes = [
  {'path':'home', redirectTo: '', pathMatch: 'full'},
  {'path':'', component:HomeComponent},
  {'path':'details/:id', component:DetailsComponent},
  {'path':'create-feedback', component:CreateFeedbackComponent},
  {'path':'roadmap', component:RoadmapComponent},
  {'path':'edit-feedback/:id', component:EditFeedbackComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
