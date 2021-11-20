import {AppRoute} from '../../constants';
import {Link} from 'react-router-dom';

type LogoProps = {
  className: string,
  imageWidth: number,
  imageHeight: number,
}

function Logo({className, imageHeight, imageWidth}: LogoProps): JSX.Element {
  return (
    <Link to={AppRoute.ROOT} className={`${className}-link ${className}-link--active`}>
      <img className={`${className}`} src="img/logo.svg" alt="6 cities logo" width={imageWidth} height={imageHeight}/>
    </Link>);
}

export {Logo};
