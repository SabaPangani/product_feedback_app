import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FeedbacksByStatusComponent } from './feedbacks-by-status.component';

describe('FeedbacksByStatusComponent', () => {
  let component: FeedbacksByStatusComponent;
  let fixture: ComponentFixture<FeedbacksByStatusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FeedbacksByStatusComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FeedbacksByStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
