import { useState, useEffect } from 'react';
import moment from 'moment';
import { objectType } from '../App';
import loading from '../images/loading.gif';
import '../stylesheets/MessagesModal.css';

const MessagesModal = ({ data, modalStatus, getData }: { data: objectType[][]; modalStatus: string; getData: (query: string) => Promise<void> }) => {
  const [updateMessage] = useState<string>('데이터가 업데이트되는 중입니다.');
  const [timeMessage, setTimeMessage] = useState<string>('');
  const [buttonActive, setButtonActive] = useState<string>('modal-button-inactive');
  const TIME_MESSAGE = '오전 0시 ~ 10시 사이에는 당일 데이터가 업데이트 되지 않을 수 있습니다.';
  const BUTTON_MESSAGE = '어제 데이터 불러오기';

  const getYesterday = () => {
    const yesterday = moment().add(-1, 'days');
    let year: string = yesterday.format('YYYY');
    let month: string = yesterday.format('MM');
    let day: string = yesterday.format('DD');
    return year + month + day;
  };

  const getPastData = () => {
    const searchDate: string = getYesterday();
    getData(`?startCreateDt=${searchDate}&endCreateDt=${searchDate}`);
  };

  useEffect(() => {
    const hour: Number = Number(moment().format('HH'));
    if (hour >= 0 && hour < 10) {
      setTimeMessage(TIME_MESSAGE);
      setButtonActive('modal-button-active');
    } else {
      setTimeMessage('');
      setButtonActive('modal-button-inactive');
    }
  }, [data]);

  return modalStatus !== 'finished' ? (
    <div id="modal-message">
      <div className="modal-message-modal">
        <img className="modal-loading-gif" src={loading}></img>
        <div className="modal-loading-message">{updateMessage}</div>
        <div className="modal-time-message">{timeMessage}</div>
        <button className={buttonActive} onClick={getPastData}>
          {BUTTON_MESSAGE}
        </button>
      </div>
    </div>
  ) : (
    <></>
  );
};

export default MessagesModal;
