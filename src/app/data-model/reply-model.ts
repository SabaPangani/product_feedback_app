import { User } from './user-model';
export type Reply = {
  commentId: number;
  replytoId: number;
  content: string;
  user: User;
  replyingTo: string;
};