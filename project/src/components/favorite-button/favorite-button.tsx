import {ActionsAPI} from '../../store/api-actions';
import {useDispatch, useSelector} from 'react-redux';
import {getAuthStatus} from '../../store/reducer/user/selectors';
import {AppRoute, AuthorizationStatus} from '../../constants';
import {ActionCreator} from '../../store/actions';

type FavoriteButtonType = {
  id: number,
  nearsAnchorId?: number
  isFavorite: boolean,
  buttonClassName: string,
  iconClassName: string,
  iconWidth: number,
  iconHeight: number,
}

function FavoriteButton(props: FavoriteButtonType): JSX.Element {
  const {id, nearsAnchorId, isFavorite, buttonClassName, iconClassName, iconHeight, iconWidth} = props;

  const dispatch = useDispatch();
  const authorizationStatus = useSelector(getAuthStatus);

  const isAuthorized = authorizationStatus === AuthorizationStatus.AUTH;

  return (
    <button
      className={`${buttonClassName} button ${isFavorite ? `${buttonClassName}--active` : ''}`}
      type="button"
      onClick={() => {
        if (isAuthorized) {
          dispatch(ActionsAPI.postFavorite(id, !isFavorite, nearsAnchorId));
          return;
        }
        dispatch(ActionCreator.redirectToRoute(AppRoute.LOGIN));
      }}
      data-testid="favorite-btn"
    >
      <svg
        className={`${iconClassName}`}
        width={iconWidth}
        height={iconHeight}
      >
        <use xlinkHref="#icon-bookmark"/>
      </svg>
      <span className="visually-hidden">{isFavorite ? 'In bookmarks' : 'To bookmarks'}</span>
    </button>
  );
}

export {FavoriteButton};
