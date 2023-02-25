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
import { FormsModule } from '@angular/forms';
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    FeedbackBoardComponent,
    SuggestionsComponent,
    FeedbacksComponent,
    DetailsComponent,
    AddCommentComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
