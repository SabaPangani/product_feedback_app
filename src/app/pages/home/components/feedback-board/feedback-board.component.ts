import { Component, OnInit, Output, EventEmitter, Input, HostListener } from '@angular/core';
import { Category } from 'src/app/data-model/category-model';
import { FeedbackRequest } from 'src/app/data-model/feedback-model';
import { __values } from 'tslib';
import { StatusService } from 'src/app/services/status.service';
import { BreakpointObserver, Breakpoints, BreakpointState } from '@angular/cdk/layout';
import { trigger, state, style, transition, animate } from '@angular/animations';

@Component({
  selector: 'app-feedback-board',
  templateUrl: './feedback-board.component.html',
  styleUrls: ['./feedback-board.component.scss'],
  animations: [
    trigger('fadeInOut', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('.3s ease-in-out', style({ opacity: 1 }))
      ]),
      transition(':leave', [
        animate('.3s ease-in-out', style({ opacity: 0 }))
      ])
    ]),
    trigger('slideInOut', [
      transition(':enter', [
        style({ transform: 'translateX(100%)' }),
        animate('.3s ease-in-out', style({ transform: 'translateX(0%)' }))
      ]),
      transition(':leave', [
        animate('.3s ease-in-out', style({ transform: 'translateX(100%)' }))
      ])
    ])
  ]
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
  
  openNav: boolean = false;

  constructor(private _status: StatusService,private breakpointObserver: BreakpointObserver) { }

  toggleNav(){
    this.openNav = !this.openNav;
    if (this.openNav) {
      document.body.classList.add('sidenav-open');
    } else {
      document.body.classList.remove('sidenav-open');
    }
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    if (event.target.innerWidth <= 586) {
      this.openNav = false;
    }
  }

  onFilterClick(index: number) {
    this.activeIndex = index;
  }
  getUniqueCategories(): Category[] {
    const categories = this.uniqueData?.map((request: FeedbackRequest) => request.category);
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

    this.breakpointObserver
    .observe(['(min-width: 586px)'])
    .subscribe((state: BreakpointState) => {
      if (state.matches) {
        this.openNav = false;
      }
    });
  }
  filterByCategory(cat: string): void {
    this.categoryName.emit(cat);
    console.log(cat)
  }
}
