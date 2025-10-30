import { useDispatch, useSelector } from 'react-redux';
import WaterDetailedInfo from '../../components/WaterDetailedInfo/WaterDetailedInfo';
import WaterMainInfo from '../../components/WaterMainInfo/WaterMainInfo';
import css from './TrackerPage.module.css';
import { useEffect, useState } from 'react';
import { chooseDay, chooseMonth } from '../../redux/water/operations';
import { selectDay, selectMonth } from '../../redux/water/selectors';
import HealthChat from '../../components/HealthChat/HealthChat';
import { FaComments } from 'react-icons/fa';
import chatCss from './TrackerPageChatBtn.module.css';

export default function TrackerPage() {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const dispatch = useDispatch();
  const day = useSelector(selectDay);
  const month = useSelector(selectMonth);

  useEffect(() => {
    dispatch(chooseDay(day));
  }, [dispatch, day]);

  useEffect(() => {
    dispatch(chooseMonth(month));
  }, [dispatch, month]);

  return (
    <>
      <main>
        <div className={css.wrapper}>
          <WaterMainInfo />
          <WaterDetailedInfo />
          <button
            type="button"
            className={chatCss.chatBtn}
            onClick={() => setIsChatOpen(true)}
            aria-label="Open health chat"
            title="Health Guide"
          >
            <FaComments size={16} />
          </button>
        </div>
      </main>
      <HealthChat isOpen={isChatOpen} onRequestClose={() => setIsChatOpen(false)} />
    </>
  );
}
