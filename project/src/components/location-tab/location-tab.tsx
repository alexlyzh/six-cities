import {ActionCreator} from '../../store/actions';
import {useDispatch} from 'react-redux';

type LocationTabProps = {
  cityName: string,
  className: string,
}

function LocationTab({cityName, className}: LocationTabProps): JSX.Element {
  const dispatch = useDispatch();

  return (
    <li className="locations__item">
      <a
        className={className}
        href="#"
        onClick={(evt) => {
          evt.preventDefault();
          dispatch(ActionCreator.changeCity(cityName));
        }}
      >
        <span>{cityName}</span>
      </a>
    </li>);
}

export {LocationTab};
