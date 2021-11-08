import {internet, datatype} from 'faker';
import {User} from '../types/types';

const makeFakeUser = (): User => ({
  avatarUrl: internet.avatar(),
  id: datatype.number(),
  isPro: datatype.boolean(),
  name: internet.userName(),
  email: internet.email(),
  token: datatype.string(),
});

export {makeFakeUser};
