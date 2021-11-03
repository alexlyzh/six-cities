import {combineReducers} from '@reduxjs/toolkit';
import {dataReducer} from './data/data-reducer';
import {appReducer} from './app/app-reducer';
import {userReducer} from './user/user-reducer';

type State = ReturnType<typeof rootReducer>

enum NameSpace {
  APP = 'APP',
  USER = 'USER',
  DATA = 'DATA',
}

const rootReducer = combineReducers({
  [NameSpace.APP]: appReducer,
  [NameSpace.USER]: userReducer,
  [NameSpace.DATA]: dataReducer,
});

export {rootReducer, NameSpace};
export type {State};
