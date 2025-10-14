import AddSettingBtn from '../AddSettingBtn/AddSettingBtn';
import AddLogOutBtn from '../AddLogOutBtn/AddLogOutBtn';
import css from './UserBarPopover.module.css';

export default function UserBarPopover() {
  return (
    <>
      <div className={css.container}>
        <AddSettingBtn />

        <AddLogOutBtn />
      </div>
    </>
  );
}
