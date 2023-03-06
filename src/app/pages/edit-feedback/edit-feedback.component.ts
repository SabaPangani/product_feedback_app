import { Component, OnInit } from '@angular/core';
import { Category } from 'src/app/data-model/category-model';
import { FeedbackRequest } from 'src/app/data-model/feedback-model';
import { CategoryEnum } from 'src/app/enums/categoryEnum.enum';
import { FormControl, FormGroup, RequiredValidator, Validators } from '@angular/forms';
import { DataService } from 'src/app/services/data.service';
import { Observable } from 'rxjs';
import { data } from 'src/app/data-model/data-model';
import { ActivatedRoute, ParamMap } from '@angular/router';
@Component({
  selector: 'app-edit-feedback',
  templateUrl: './edit-feedback.component.html',
  styleUrls: ['./edit-feedback.component.scss']
})
export class EditFeedbackComponent {
  createFeedbackForm!: FormGroup;
  categoryEnum = CategoryEnum;
  newTitle!: string;
  newCategory!: Category;
  newDescription!: string;
  feedbacks!: FeedbackRequest[];
  feedbackId!: number;
  constructor(private _dataService: DataService, private _route:ActivatedRoute) { }

  ngOnInit(): void {
    this.createFeedbackForm = new FormGroup({
      newTitle: new FormControl(null, [Validators.required, Validators.minLength(2), Validators.maxLength(30)]),
      newCategory: new FormControl(this.categoryEnum.Feature, Validators.required),
      newStatus: new FormControl("Planned", Validators.required),
      newDescription: new FormControl(null, [Validators.required]),
    })
    console.log(this.createFeedbackForm.controls);
    this._dataService.getData().subscribe((data: data) => {
      this.feedbacks = data.productRequests;
    });

    this._route.paramMap.subscribe((params: ParamMap) => {
        this.feedbackId = Number(params.get('id'));
    })
  }

  onSubmit(): void {
    console.log(this.createFeedbackForm.controls)
    this.newTitle = this.createFeedbackForm.controls['newTitle'].value;
    this.newCategory = this.createFeedbackForm.controls['newCategory'].value;
    this.newDescription = this.createFeedbackForm.controls['newDescription'].value;

    const newFeedback: FeedbackRequest = {
      id: 1,
      title: this.newTitle,
      description: this.newDescription,
      upvotes: 0,
      status: '',
      comments: [],
      category: this.newCategory,
    }

    // this._dataService.addFeedback(newFeedback).subscribe(
      // (response: FeedbackRequest[]) => {
      
      //   console.log('Feedback added successfully:', response);
      // },
      // (error: any) => {
      //   console.error('Failed to add feedback:', error);
      // }
    // );
    this.newTitle = '';
    this.newCategory;
    this.newDescription = '';
  }

  deleteFeedback(){
    this._dataService.deleteFeedback(this.feedbackId).subscribe(
      (response: FeedbackRequest) => {
      
        console.log('Feedback added successfully:', response);
      },
      (error: any) => {
        console.error('Failed to add feedback:', error);
      }
    );
  }
}
