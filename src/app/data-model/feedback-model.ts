import { Category } from './category-model';
import { Comment } from './comment-model';
import { User } from './user-model';

export type FeedbackRequest = {
  id: number;
  title: string;
  description: string;
  upvotes: number;
  status: string;
  comments: Comment[];
  category: Category;
};

export type FeedbackByStatus = {
  status: string;
  feedbacks: FeedbackRequest[];
  count: number;
  color: string;
};