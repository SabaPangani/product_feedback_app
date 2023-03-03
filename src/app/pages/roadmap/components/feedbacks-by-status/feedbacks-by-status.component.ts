import { Component, Input } from '@angular/core';
import { FeedbackByStatus } from 'src/app/data-model/feedback-model';

@Component({
  selector: 'app-feedbacks-by-status',
  templateUrl: './feedbacks-by-status.component.html',
  styleUrls: ['./feedbacks-by-status.component.scss']
})
export class FeedbacksByStatusComponent {
  @Input() dataByStatus!:FeedbackByStatus[];
}
