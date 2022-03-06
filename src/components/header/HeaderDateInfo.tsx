import { useState, useRef, useEffect, SetStateAction } from 'react';
import moment from 'moment';
import { objectType } from '../../App';
import leftArrow from '../../images/leftArrow.svg';
import rightArrow from '../../images/rightArrow.svg';

interface headerDateInfoType {
  data: objectType[][];
  modalStatus: string;
  setModalStatus: React.Dispatch<SetStateAction<string>>;
  getData: (query: string) => Promise<void>;
}

const HeaderDateInfo = ({ data, modalStatus, setModalStatus, getData }: headerDateInfoType) => {
  const [date, setDate] = useState<moment.Moment>(moment());
  const [dateModal, setDateModal] = useState<JSX.Element>(<></>);
  const [modalWarning, setModalWarning] = useState<string>('');
  const leftArrowRef = useRef<HTMLImageElement>(null);
  const dateRef = useRef<HTMLInputElement>(null);

  const getNewDate = (newDate: moment.Moment) => {
    let year = newDate.format('YYYY');
    let month = newDate.format('MM');
    let day = newDate.format('DD');
    return year + month + day;
  };

  const changeDate = async (e: React.MouseEvent) => {
    setModalStatus('load');
    let newDate: moment.Moment = moment();
    let changed: boolean = false;
    if (date > moment('01-03-2020', 'DD-MM-YYYY') && leftArrowRef.current === e.target) {
      newDate = date.add(-1, 'days');
      changed = true;
      setDate(newDate);
    } else if (date < moment().add(-1, 'days')) {
      newDate = date.add(1, 'days');
      changed = true;
      setDate(newDate);
    }
    if (changed) {
      const searchDate: string = getNewDate(newDate);
      await getData(`?startCreateDt=${searchDate}&endCreateDt=${searchDate}`);
    }
    setModalStatus('finished');
  };

  const getDatesData = async () => {
    const searchDate = (dateRef.current as HTMLInputElement).value;
    const isValid = moment(searchDate, 'YYYYMMDD').format('YYYYMMDD');
    console.log(isValid === 'Invalid date', typeof isValid);
    if (searchDate.length !== 8) {
      setModalWarning('정확히 8자를 입력해주세요.');
    } else if (isValid === 'Invalid date') {
      setModalWarning('입력된 날짜 형식을 확인해주세요.');
    } else if (searchDate > moment().format('YYYYMMDD')) {
      setModalWarning('오늘 이전 날짜를 입력해주세요.');
    } else if (searchDate < '20200103') {
      setModalWarning('조금 더 최근 날짜를 입력해주세요.');
    } else {
      setModalWarning('');
      setDateModal(<></>);
      await getData(`?startCreateDt=${searchDate}&endCreateDt=${searchDate}`);
    }
  };

  const removeModal = () => {
    setDateModal(<></>);
  };

  const setModal = () => {
    const modal: JSX.Element = (
      <div className="header-date-move">
        <div className="header-date-modal">
          <div className="header-date-modal-content">
            이동하고자 하는 날짜를 입력해주세요.<br></br>(예시: 20220306)
            <input className="header-date-modal-text" type="text" ref={dateRef}></input>
            <div className="header-date-modal-warning">{modalWarning}</div>
            <div className="header-date-modal-submit-buttons">
              <div className="header-date-modal-submit" onClick={getDatesData}>
                이동
              </div>
              <div className="header-date-modal-submit" onClick={removeModal}>
                취소
              </div>
            </div>
          </div>
        </div>
      </div>
    );
    setDateModal(modal);
  };

  const moveDate = () => {
    if (!dateModal.props.children) {
      setModal();
    } else {
      setDateModal(<></>);
    }
  };

  useEffect(() => {
    if (data.length === 0) return;
    setModalStatus('finished');
    setDate(moment(data[0][0].createDt));
  }, [data]);

  useEffect(() => {
    if (modalStatus !== 'init' && modalWarning !== '') {
      setModal();
    }
  }, [modalWarning]);

  return (
    <>
      <div className="header-date">
        <img className="header-date-arrow" src={leftArrow} onClick={changeDate} ref={leftArrowRef}></img>
        <div className="header-date-text" onClick={moveDate}>{`${date.format('YYYY')}년 ${date.format('MM')}월 ${date.format('DD')}일 0시 기준`}</div>
        <img className="header-date-arrow" src={rightArrow} onClick={changeDate}></img>
      </div>
      {dateModal}
    </>
  );
};

export default HeaderDateInfo;
