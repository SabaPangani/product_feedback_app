import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { User } from 'src/app/data-model/user-model';
import { Comment } from 'src/app/data-model/comment-model';

@Component({
  selector: 'app-add-comment',
  templateUrl: './add-comment.component.html',
  styleUrls: ['./add-comment.component.scss']
})
export class AddCommentComponent /*implements OnInit*/ {
  @Output() onCommentAdd: EventEmitter<Comment> = new EventEmitter();
  @Input() user!: User;
  content: string = "";

  constructor() { }

  // ngOnInit(): void {
  //   throw new Error('Method not implemented.');
  // }

  onSubmit(): void {
    if (!this.content) {
      alert("Add comment");
    }

    const newComment: Comment = {
      id: '',
      requestId: '',
      content: this.content,
      user: this.user,
      replies: [],
    };

    this.onCommentAdd.emit(newComment);

    this.content = '';
  }
}
