import { Component, OnInit } from '@angular/core';
import { Category } from 'src/app/data-model/category-model';
import { FeedbackRequest } from 'src/app/data-model/feedback-model';
import { CategoryEnum } from 'src/app/enums/categoryEnum.enum';
import { FormControl, FormGroup, RequiredValidator, Validators } from '@angular/forms';
import { DataService } from 'src/app/services/data.service';
import { Observable } from 'rxjs';
import { data } from 'src/app/data-model/data-model';
@Component({
  selector: 'app-create-feedback',
  templateUrl: './create-feedback.component.html',
  styleUrls: ['./create-feedback.component.scss']
})
export class CreateFeedbackComponent implements OnInit {
  createFeedbackForm!: FormGroup;
  categoryEnum = CategoryEnum;
  newTitle!: string;
  newCategory!: Category;
  newDescription!: string;
  feedbacks!: FeedbackRequest[];

  constructor(private _dataService: DataService) {}

  ngOnInit(): void {
    this.createFeedbackForm = new FormGroup({
      newTitle: new FormControl(null, [Validators.required, Validators.minLength(2), Validators.maxLength(30)]),
      newCategory: new FormControl(this.categoryEnum.Feature, Validators.required),
      newDescription: new FormControl(null, [Validators.required]),
    })
    console.log(this.createFeedbackForm.controls);
    this._dataService.getData().subscribe((data: data) => {
      this.feedbacks = data.productRequests;
    });  
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

    this._dataService.addFeedback(newFeedback).subscribe(newFeedback => (this.feedbacks.push(newFeedback)));
    this.newTitle = '';
    this.newCategory;
    this.newDescription = '';
  }
}
