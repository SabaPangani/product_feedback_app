import { Category } from './category-model';
import { Comment } from './comment-model';

export type FeedbackRequest = {
  id: number | string;
  title: string;
  description: string;
  upvotes: number;
  status: string;
  category: Category;
  comments: Comment[];
};