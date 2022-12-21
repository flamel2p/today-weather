import { FC } from 'react';
import ClsGen from '../../utils/cls-gen';
import './index.scss';

const cls = ClsGen('title');

interface IProps {
  title: string;
}

const Title: FC<IProps> = ({title}) => {
  return (
    <div className={cls()}>
      <div className={cls('label')}>{title}</div>
      <div className={cls('divider')}/>
    </div>
  )
}

export default Title;