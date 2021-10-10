import {user} from './user';

type comment = {
  id: number,
  comment: string,
  date: string,
  rating: number,
  user: user,
}

type comments = comment[];

export type { comments };
