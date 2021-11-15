import {render, screen} from '@testing-library/react';
import {FavoriteButton} from './favorite-button';
import {AuthorizationStatus, FAKE_ID} from '../../constants';
import {getRandomInteger} from '../../utils/utils';
import {configureMockStore} from '@jedmao/redux-mock-store';
import {Provider} from 'react-redux';
import thunk from 'redux-thunk';
// import userEvent from '@testing-library/user-event';
// import {ActionsAPI} from '../../store/api-actions';

const ButtonMockProps = {
  id: FAKE_ID,
  isFavorite: Boolean(getRandomInteger()),
  buttonClassName: 'some',
  iconClassName: 'some',
  iconWidth: 20,
  iconHeight: 20,
} as const;


const mockStore = configureMockStore([thunk]);
const store = mockStore({
  USER: {
    authorizationStatus: AuthorizationStatus.AUTH,
  },
});

describe('Component: FavoriteButton', () => {
  const {id, isFavorite, buttonClassName, iconClassName, iconHeight, iconWidth} = ButtonMockProps;

  it('should render correctly', () => {
    render(
      <Provider store={store}>
        <FavoriteButton
          id={id}
          isFavorite={isFavorite}
          buttonClassName={buttonClassName}
          iconClassName={iconClassName}
          iconWidth={iconWidth}
          iconHeight={iconHeight}
        />
      </Provider>);

    expect(screen.getByTestId('favorite-btn')).toBeInTheDocument();
  });

  // it('should dispatch ActionsAPI.postFavorite() when clicked', () => {
  //   render(
  //     <Provider store={store}>
  //       <FavoriteButton
  //         id={id}
  //         isFavorite={isFavorite}
  //         buttonClassName={buttonClassName}
  //         iconClassName={iconClassName}
  //         iconWidth={iconWidth}
  //         iconHeight={iconHeight}
  //       />
  //     </Provider>);
  //
  //   expect(store.getActions()).toEqual([]);
  //
  //   const button = screen.getByRole('button');
  //
  //   userEvent.click(button);
  //
  //   expect(store.getActions()).toEqual([
  //     ActionsAPI.postFavorite(id, !isFavorite),
  //   ]); как проверить, что происходит диспатч по клику?
  // });
});
