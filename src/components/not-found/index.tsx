import { FC } from 'react';
import ClsGen from '../../utils/cls-gen';
import './index.scss';

const cls = ClsGen('not-found');

const NotFound: FC = () => {
  return (
    <div className={cls()}>Not Found</div>
  )
}

export default NotFound;