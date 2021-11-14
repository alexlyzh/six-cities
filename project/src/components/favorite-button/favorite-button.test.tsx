import {render, screen} from '@testing-library/react';
import {FavoriteButton} from './favorite-button';
import {AuthorizationStatus, FAKE_ID} from '../../constants';
import {getRandomInteger} from '../../utils/utils';
import {configureMockStore} from '@jedmao/redux-mock-store';
import {Provider} from 'react-redux';

const ButtonMockProps = {
  id: FAKE_ID,
  isFavorite: Boolean(getRandomInteger()),
  buttonClassName: '',
  iconClassName: '',
  iconWidth: 20,
  iconHeight: 20,
} as const;

const mockStore = configureMockStore();
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

    expect(screen.getByRole('button')).toBeInTheDocument();
  });
});

export {};
