import {combineReducers} from '@reduxjs/toolkit';
import {dataReducer} from './data/data-reducer';
import {appReducer} from './app/app-reducer';
import {userReducer} from './user/user-reducer';

enum NameSpace {
  APP = 'APP',
  USER = 'USER',
  DATA = 'DATA',
}

type State = ReturnType<typeof rootReducer>

const rootReducer = combineReducers({
  [NameSpace.APP]: appReducer,
  [NameSpace.USER]: userReducer,
  [NameSpace.DATA]: dataReducer,
});

export {rootReducer, NameSpace};
export type {State};
