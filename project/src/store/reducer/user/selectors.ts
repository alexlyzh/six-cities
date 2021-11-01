import {NameSpace, State} from '../root-reducer';
import {AuthorizationStatus} from '../../../constants';
import {User} from '../../../types/types';

const getAuthStatus = (state: State): AuthorizationStatus => state[NameSpace.USER].authorizationStatus;
const getUser = (state: State): User | null => state[NameSpace.USER].user;

export {getAuthStatus, getUser};
