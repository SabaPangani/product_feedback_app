import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { FeedbackBoardComponent } from './pages/home/components/feedback-board/feedback-board.component';
import { SuggestionsComponent } from './pages/home/components/suggestions/suggestions.component';
import { FeedbacksComponent } from './pages/home/components/feedbacks/feedbacks.component';
import { HttpClientModule } from '@angular/common/http';
import { DetailsComponent } from './pages/details/details.component';
import { AddCommentComponent } from './pages/details/components/add-comment/add-comment.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AddReplyComponent } from './pages/details/components/add-reply/add-reply.component';
import { CreateFeedbackComponent } from './pages/create-feedback/create-feedback.component';
import { RoadmapComponent } from './pages/roadmap/roadmap.component';
import { RoadmapHeaderComponent } from './pages/roadmap/components/roadmap-header/roadmap-header.component';
import { FeedbacksByStatusComponent } from './pages/roadmap/components/feedbacks-by-status/feedbacks-by-status.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    FeedbackBoardComponent,
    SuggestionsComponent,
    FeedbacksComponent,
    DetailsComponent,
    AddCommentComponent,
    AddReplyComponent,
    CreateFeedbackComponent,
    RoadmapComponent,
    RoadmapHeaderComponent,
    FeedbacksByStatusComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
  ],

  bootstrap: [AppComponent]
})
export class AppModule { }
