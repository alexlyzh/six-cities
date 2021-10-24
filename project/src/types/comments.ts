import {Host} from './offers';

type Comment = {
  id: number,
  comment: string,
  date: string,
  rating: number,
  user: Host,
}

export type { Comment };
