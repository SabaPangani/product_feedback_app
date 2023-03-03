import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { Category } from 'src/app/data-model/category-model';
import { FeedbackRequest } from 'src/app/data-model/feedback-model';
import { __values } from 'tslib';
import { StatusService } from 'src/app/services/status.service';
@Component({
  selector: 'app-feedback-board',
  templateUrl: './feedback-board.component.html',
  styleUrls: ['./feedback-board.component.scss']
})
export class FeedbackBoardComponent implements OnInit {
  activeIndex: number = 0;
  categories!: Category[];
  @Output() categoryName = new EventEmitter<string>();
  planned!: FeedbackRequest[];
  inProgress!: FeedbackRequest[];
  live!: FeedbackRequest[];
  @Input() feedBacks!: FeedbackRequest[];
  @Input() uniqueData!: FeedbackRequest[];

  constructor(private _status: StatusService) { }

  onFilterClick(index: number) {
    this.activeIndex = index;
  }
  getUniqueCategories(): Category[] {
    const categories = this.uniqueData?.map((request: FeedbackRequest) => request.category).filter(Boolean);
    return [...new Set(categories)];
  }
  ngOnInit() {
    this._status.roadMapFeedBack();

    this._status.plannedFilter.subscribe({
      next: filter => this.planned = filter
    });
    this._status.inProgressFilter.subscribe({
      next: filter => this.inProgress = filter
    });
    this._status.liveFilter.subscribe({
      next: filter => this.live = filter
    });
  }
  filterByCategory(cat: string): void {
    this.categoryName.emit(cat);
    console.log(cat)
  }
}
