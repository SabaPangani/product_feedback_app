import { Reply } from './reply-model';
import { User } from './user-model';

export type Comment = {
  id: number;
  requestId: number;
  content: string;
  user: User;
  replies: Reply[];
};