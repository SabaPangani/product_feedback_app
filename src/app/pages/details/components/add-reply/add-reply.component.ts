import { Component, Output, Input, EventEmitter } from '@angular/core';
import { Reply } from 'src/app/data-model/reply-model';
import { User } from 'src/app/data-model/user-model';
import { Comment } from 'src/app/data-model/comment-model';
@Component({
  selector: 'app-add-reply',
  templateUrl: './add-reply.component.html',
  styleUrls: ['./add-reply.component.scss']
})
export class AddReplyComponent {
  @Output() onReplyAdd: EventEmitter<Reply> = new EventEmitter();
  @Input() comment!: Comment;
  @Input() reply!: Reply;
  @Input() user!: User;
  @Input() replyClick: boolean = false;
  replyContent!: string;

  
  onSubmit() {
    if (this.replyContent == '') {
      alert("Add comment");
    }

    let replyingTo = '';

    if (this.reply){
      replyingTo = this.reply.user.username;
    }else{
      replyingTo = this.comment.user.username;      
    }
    const newReply: Reply = {
      commentId: this.comment.id,
      replytoId: this.comment.id,
      content: this.replyContent,
      user: this.user,
      replyingTo: replyingTo,
    };

    if (this.replyContent !== "") {
      this.onReplyAdd.emit(newReply);
    }

    this.replyContent = '';
  }

}
