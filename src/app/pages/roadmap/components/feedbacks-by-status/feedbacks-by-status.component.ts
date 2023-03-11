import {
  ChangeDetectorRef,
  Component,
  Input,
  OnInit,
  OnChanges,
} from '@angular/core';
import { filter, map, Observable, of, tap } from 'rxjs';
import { FeedbackByStatus } from 'src/app/data-model/feedback-model';
import { SuggestionsComponent } from 'src/app/pages/home/components/suggestions/suggestions.component';
import { SuggestionsService } from 'src/app/services/suggestions.service';

@Component({
  selector: 'app-feedbacks-by-status',
  templateUrl: './feedbacks-by-status.component.html',
  styleUrls: ['./feedbacks-by-status.component.scss'],
})
export class FeedbacksByStatusComponent implements OnChanges {
  activeIndex: number = 0;
  @Input() dataByStatus!: FeedbackByStatus[];
  filteredData!: FeedbackByStatus[];
  private dataHasChanged = true;

  ngOnChanges() {
    if (this.dataHasChanged) {
      this.filteredData = this.dataByStatus;
    }
  }

  filterDataByCategory(cat: string): void {
    if (!this.dataByStatus) {
      return;
    }
    this.filteredData = this.dataByStatus.filter((data) => {
      return data.status.toLowerCase() === cat.toLowerCase();
    });
    this.dataHasChanged = false
  }

  onTabClick(i:number){
    this.activeIndex = i;
  }
}
