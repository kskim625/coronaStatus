import { useState, useEffect } from 'react';
import moment from 'moment';
import { CLASSES, MODAL_STATUS, MODAL_MESSAGES } from '../../util/constants';
import { objectType } from '../../App';
import loading from '../../images/loading.gif';
import '../../stylesheets/MessagesModal.css';

const MessagesModal = ({ data, modalStatus, getData }: { data: objectType[][]; modalStatus: string; getData: (query: string) => Promise<void> }) => {
  const [updateMessage] = useState<string>(MODAL_MESSAGES.LOADING_MESSAGE);
  const [timeMessage, setTimeMessage] = useState<string>(MODAL_MESSAGES.BLANK);
  const [buttonActive, setButtonActive] = useState<string>(CLASSES.MODAL_BUTTON_INACTIVE);

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
      setTimeMessage(MODAL_MESSAGES.TIME_MESSAGE);
      setButtonActive(CLASSES.MODAL_BUTTON_ACTIVE);
    } else {
      setTimeMessage(MODAL_MESSAGES.BLANK);
      setButtonActive(CLASSES.MODAL_BUTTON_INACTIVE);
    }
  }, [data]);

  return modalStatus === MODAL_STATUS.INIT ? (
    <div id="modal-message">
      <div className="modal-message-modal">
        <img className="modal-loading-gif" src={loading}></img>
        <div className="modal-loading-message">{updateMessage}</div>
        <div className="modal-time-message">{timeMessage}</div>
        <button className={buttonActive} onClick={getPastData}>
          {MODAL_MESSAGES.BUTTON_MESSAGE}
        </button>
      </div>
    </div>
  ) : (
    <></>
  );
};

export default MessagesModal;
