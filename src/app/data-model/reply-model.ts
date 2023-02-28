import { User } from './user-model';
export type Reply = {
  id: number;
  commentId: number;
  replytoId: number;
  content: string;
  user: User;
  replyingTo: string;
};