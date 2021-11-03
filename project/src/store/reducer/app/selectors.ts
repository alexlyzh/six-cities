import {NameSpace, State} from '../root-reducer';

const getSelectedCity = (state: State): string => state[NameSpace.APP].selectedCity;
const getCurrentSort = (state: State): string => state[NameSpace.APP].currentSort;
const getIsSubmitting = (state: State): boolean => state[NameSpace.APP].isSubmitting;

export {getSelectedCity, getCurrentSort, getIsSubmitting};
