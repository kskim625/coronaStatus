import { useState, useEffect } from 'react';
import { objectType } from '../App';
import loading from '../images/loading.gif';
import '../stylesheets/MessagesModal.css';

const Messages = ({ data, getData }: { data: objectType[][]; getData: (query: string) => Promise<void> }) => {
  const [updateMessage] = useState<String>('데이터가 업데이트되는 중입니다.');
  const [timeMessage, setTimeMessage] = useState<String>('');
  const [buttonActive, setButtonActive] = useState<string>('modal-button-inactive');
  const TIME_MESSAGE = '오전 0시 ~ 10시 사이에는 당일 데이터가 업데이트 되지 않을 수 있습니다.';
  const BUTTON_MESSAGE = '어제 데이터 불러오기';

  const getYesterday = (date: Date) => {
    const yesterday = new Date(date.getFullYear(), date.getMonth(), date.getDate() - 1);
    let year = String(yesterday.getFullYear());
    let month = String(yesterday.getMonth() + 1);
    month = month.length === 1 ? '0' + month : month;
    let day = String(yesterday.getDate());
    day = day.length === 1 ? '0' + day : day;
    return year + month + day;
  };

  const getPastData = () => {
    const date: Date = new Date();
    const searchDate: string = getYesterday(date);
    getData(`&startCreateDt=${searchDate}`);
  };

  useEffect(() => {
    if (data.length !== 0) {
      return;
    }
    const hour: number = new Date().getHours();
    if (hour >= 0 && hour <= 10) {
      setTimeMessage(TIME_MESSAGE);
      setButtonActive('modal-button-active');
    } else {
      setTimeMessage('');
      setButtonActive('modal-button-inactive');
    }
  }, [data]);

  return data.length === 0 ? (
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

export default Messages;
