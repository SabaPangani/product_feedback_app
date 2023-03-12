import { Component, OnInit } from '@angular/core';
import { Category } from 'src/app/data-model/category-model';
import { FeedbackRequest } from 'src/app/data-model/feedback-model';
import { CategoryEnum } from 'src/app/enums/categoryEnum.enum';
import {
  FormControl,
  FormGroup,
  RequiredValidator,
  Validators,
} from '@angular/forms';
import { DataService } from 'src/app/services/data.service';
import { Observable } from 'rxjs';
import { data } from 'src/app/data-model/data-model';
import { ActivatedRoute, ParamMap } from '@angular/router';
@Component({
  selector: 'app-edit-feedback',
  templateUrl: './edit-feedback.component.html',
  styleUrls: ['./edit-feedback.component.scss'],
})
export class EditFeedbackComponent {
  createFeedbackForm!: FormGroup;
  categoryEnum = CategoryEnum;
  newTitle!: string;
  newCategory!: Category;
  newDescription!: string;
  newStatus!: string;
  feedbackId!: number;
  feedback!: FeedbackRequest;

  constructor(
    private _dataService: DataService,
    private _route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.createForm();
    this._route.paramMap.subscribe((params: ParamMap) => {
      this.feedbackId = Number(params.get('id'));
    });
  
    this._dataService.getData().subscribe((data: data) => {
      this.feedback = data.productRequests.find(
        feedback => feedback.id === this.feedbackId
      ) as FeedbackRequest;
  
      this.createForm();
    });
  }
  
  createForm(): void {
    this.createFeedbackForm = new FormGroup({
      newTitle: new FormControl(this.feedback?.title),
      newCategory: new FormControl(this.feedback?.category),
      newStatus: new FormControl(this.feedback?.status),
      newDescription: new FormControl(this.feedback?.description),
    });
  
    console.log(this.createFeedbackForm.controls);
  }
  onSubmit(): void {
    console.log(this.createFeedbackForm.controls);
    this.newTitle = this.createFeedbackForm.controls['newTitle'].value;
    this.newCategory = this.createFeedbackForm.controls['newCategory'].value;
    this.newDescription = this.createFeedbackForm.controls['newDescription'].value;
    this.newStatus = this.createFeedbackForm.controls['newStatus'].value;

    this.feedback = {
      id: this.feedback.id,
      title: this.newTitle,
      category: this.newCategory,
      upvotes: this.feedback.upvotes,
      status: this.newStatus,
      description: this.newDescription,
      comments: this.feedback.comments,
    }
    const editedFeedback = this.feedback;

    this._dataService.editFeedback(editedFeedback,this.feedbackId).subscribe(
      (response: FeedbackRequest) => {
        console.log('Feedback added successfully:', response);
      },
      (error: any) => {
        console.error('Failed to add feedback:', error);
      }
    );
    this.newTitle = '';
    this.newCategory;
    this.newDescription = '';
  }

  deleteFeedback() {
    this._dataService.deleteFeedback(this.feedbackId).subscribe(
      (response: FeedbackRequest) => {
        console.log('Feedback edited successfully:', response);
      },
      (error: any) => {
        console.error('Failed to add feedback:', error);
      }
    );
  }
}
