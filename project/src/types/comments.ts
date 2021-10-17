import {User} from './user';

type Comment = {
  id: number,
  comment: string,
  date: string,
  rating: number,
  user: User,
}

export type { Comment };
