import { useState } from 'react';
import UserBar from '../UserBar/UserBar';
import UserBarPopover from '../UserBarPopover/UserBarPopover';
import css from './UserPanel.module.css';
import { useSelector } from 'react-redux';
import { selectUser } from '../../redux/auth/selectors';

export default function UserPanel() {
  const [openBar, setOpenBar] = useState(false);
  const user = useSelector(selectUser);

  return (
    <div className={css.wrapper}>
      <h2>Hello, {user.name}!</h2>
      <div className={css.panelWrap}>
        <UserBar state={openBar} setState={setOpenBar} />
        {openBar && <UserBarPopover />}
      </div>
    </div>
  );
}
