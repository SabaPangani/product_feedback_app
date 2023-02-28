import { Component, OnDestroy, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { FeedbackRequest } from 'src/app/data-model/feedback-model';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {
  data!: FeedbackRequest[];
  filteredData!: FeedbackRequest[];
  private dataSubscription!: Subscription;

  constructor(private _dataService: DataService) {}

  ngOnInit() {
    this.dataSubscription = this._dataService.getData().subscribe((data) => {
      this.data = data.productRequests;
      this.filteredData = [...this.data];
    });
  }

  ngOnDestroy() {
    if (this.dataSubscription) {
      this.dataSubscription.unsubscribe();
    }
  }

  sortFeedbacks(sortStyle: string): void {
    if (sortStyle === "most-upvotes") {
      this.sortData((a, b) => b.upvotes - a.upvotes);
    }
    if (sortStyle === "least-upvotes") {
      this.sortData((a, b) => a.upvotes - b.upvotes);
    }
    if (sortStyle === "most-comments") {
      this.sortData((a, b) => {
        const aCommentsLength = a.comments ? a.comments.length : 0;
        const bCommentsLength = b.comments ? b.comments.length : 0;
        return bCommentsLength - aCommentsLength;
      });
    }
    if (sortStyle === "least-comments") {
      this.sortData((a, b) => {
        const aCommentsLength = a.comments ? a.comments.length : 0;
        const bCommentsLength = b.comments ? b.comments.length : 0;
        return aCommentsLength - bCommentsLength;
      });
    }
  }

  private sortData(sortFn: (a: FeedbackRequest, b: FeedbackRequest) => number): void {
    this.data = this.data.sort(sortFn);
    if (this.filteredData.length) {
      this.filteredData = this.filteredData.sort(sortFn);
    }
  }

  filterDataByCategory(cat: string): void {
    this.filteredData = (cat === "All")
      ? [...this.data]
      : this.data.filter((item) => item.category && item.category.toString() === cat.toLowerCase());
  }
}
