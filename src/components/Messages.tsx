import { useState, useEffect } from 'react';
import { objectType } from '../App';
import loading from '../images/loading.gif';
import '../stylesheets/Messages.css';

const Messages = ({ data }: { data: objectType[][] }) => {
  const [updateMessage] = useState<String>('데이터가 업데이트되는 중입니다.');
  const [timeMessage, setTimeMessage] = useState<String>('');

  useEffect(() => {
    if (data.length !== 0) {
      setTimeMessage('');
      return;
    }
    const hour: number = new Date().getHours();
    if (hour >= 0 && hour <= 10) {
      setTimeMessage('오전 0시 ~ 10시 사이에는 데이터가 업데이트 되지 않을 수 있음을 참고 부탁드립니다.');
    }
  }, [data]);

  return data.length === 0 ? (
    <div id="header-message">
      <div className="header-message-modal">
        <img className="header-loading-gif" src={loading}></img>
        <div className="header-loading-message">{updateMessage}</div>
        <div className="header-time-message">{timeMessage}</div>
      </div>
    </div>
  ) : (
    <></>
  );
};

export default Messages;
