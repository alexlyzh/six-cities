import {internet, datatype} from 'faker';
import {User, UserBackend} from '../types/types';

const makeFakeUser = (): User => ({
  avatarUrl: internet.avatar(),
  id: datatype.number(),
  isPro: datatype.boolean(),
  name: internet.userName(),
  email: internet.email(),
  token: datatype.string(),
});

const makeFakeUserBackend = (): UserBackend => ({
  'avatar_url': internet.avatar(),
  id: datatype.number(),
  'is_pro': datatype.boolean(),
  name: internet.userName(),
  email: internet.email(),
  token: datatype.string(),
});

export {makeFakeUser, makeFakeUserBackend};
