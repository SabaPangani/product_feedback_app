import { Category } from './category-model';
import { Comment } from './comment-model';
import { User } from './user-model';

export type FeedbackRequest = {
  id: number | string;
  title: string;
  description: string;
  upvotes: number;
  status: string;
  comments: Comment[];
  category: Category; 
};