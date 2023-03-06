import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { FeedbackRequest } from 'src/app/data-model/feedback-model';
import { DataService } from 'src/app/services/data.service';
import { FeedbackByStatus } from 'src/app/data-model/feedback-model';
@Component({
  selector: 'app-roadmap',
  templateUrl: './roadmap.component.html',
  styleUrls: ['./roadmap.component.scss']
})

export class RoadmapComponent {
  data!: FeedbackRequest[];
  private dataSubscription!: Subscription;

  constructor(private _dataService: DataService) { }

  ngOnInit() {
    this.dataSubscription = this._dataService.getData().subscribe((data) => {
      this.data = data.productRequests;
    });
  }
  getStatuses(): string[] {
    const statuses = [...new Set(this.data?.map((request: FeedbackRequest) => request.status))].splice(1, 3);
    console.log(statuses)
    return statuses;
  }
  modifyDataByStatus(): FeedbackByStatus[] {
    const feedbackByStatus: FeedbackByStatus[] = [];

    const statusColorMap: { [key: string]: string } = {
      planned: '#F49F85',
      'in-progress': '#AD1FEA',
      live: '#62BCFA',
    };

    for (const    status of this.getStatuses()) {
      const feedbacks = this.data.filter((feedback: FeedbackRequest) => feedback.status === status)

      feedbackByStatus.push({ status, feedbacks, count: feedbacks.length,color: statusColorMap[status] || 'gray' })
    }
    return feedbackByStatus;
  }
  ngOnDestroy() {
    if (this.dataSubscription) {
      this.dataSubscription.unsubscribe()
    }
  }

}
