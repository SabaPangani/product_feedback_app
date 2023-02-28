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
  @Input() comment!:Comment[];
  chars:number = 250;
  commentContent: string = "";

  constructor() { }

  // ngOnInit(): void {
  //   throw new Error('Method not implemented.');
  // }

  onSubmit(): void {
    if (this.commentContent == '') {
      alert("Add comment");
    }

    const newComment: Comment = {
      id: 0,
      requestId: 0,
      content: this.commentContent,
      user: this.user,
      replies: [],
    };

    if (this.commentContent != ''){
      this.onCommentAdd.emit(newComment);
    }

    this.commentContent = '';
  }
}
