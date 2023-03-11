import { Component, OnDestroy, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { FeedbackRequest } from 'src/app/data-model/feedback-model';
import { Subscription } from 'rxjs';
import { SuggestionsService } from 'src/app/services/suggestions.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {
  data!: FeedbackRequest[];
  uniqueData!:FeedbackRequest[];
  private dataSubscription!: Subscription;

  constructor(private _dataService: DataService,private _sugService:SuggestionsService) { }

  ngOnInit() {
    this.dataSubscription = this._dataService.getData().subscribe((data) => {
      this.data = data.productRequests;
      this.uniqueData = this.data;
    });
  }

  ngOnDestroy() {
    if (this.dataSubscription) {
      this.dataSubscription.unsubscribe();
    }
  }

  sortFeedbacks(sortStyle: string): void {
    this._sugService.sortFeedbacks(sortStyle).subscribe(response => {
      this.data = response;
    });
  }

  filterDataByCategory(cat: string): void {
    this._sugService.filterDataByCategory(cat).subscribe(response => {
      this.data = response;
    })
  }
}
