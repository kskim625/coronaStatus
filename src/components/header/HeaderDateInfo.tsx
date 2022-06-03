import { useState, useRef, useEffect, Dispatch, SetStateAction } from 'react';
import moment from 'moment';
import { objectType } from '../../App';
import { MODAL_MESSAGES, FETCH_STATUS } from '../../util/constants';
import HeaderModal from './HeaderModal';
import leftArrow from '../../images/leftArrow.svg';
import rightArrow from '../../images/rightArrow.svg';

interface headerDateInfoType {
  data: objectType[][];
  modalStatus: string;
  setModalStatus: Dispatch<SetStateAction<string>>;
  getData: (query: string) => Promise<void>;
}

const HeaderDateInfo = ({ data, modalStatus, setModalStatus, getData }: headerDateInfoType) => {
  const [date, setDate] = useState<moment.Moment>(moment());
  const [dateModal, setDateModal] = useState<JSX.Element>(<></>);
  const [modalMessage, setModalMessage] = useState<string>('');
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
    if (date > moment('21-01-2020', 'DD-MM-YYYY') && leftArrowRef.current === e.target) {
      newDate = date.add(-1, 'days');
      changed = true;
      setDate(newDate);
    } else if (date < moment().add(-1, 'days') && leftArrowRef.current !== e.target) {
      newDate = date.add(1, 'days');
      changed = true;
      setDate(newDate);
    }
    if (changed) {
      setModalStatus(FETCH_STATUS.INIT);
      const searchDate: string = getNewDate(newDate);
      await getData(`?startCreateDt=${searchDate}&endCreateDt=${searchDate}`);
    }
    setModalStatus(FETCH_STATUS.FINISHED);
  };

  const isInputValid = () => {
    const searchDate = (dateRef.current as HTMLInputElement).value;
    const isValid = moment(searchDate, 'YYYYMMDD').format('YYYYMMDD');
    if ((searchDate as unknown as number) != Number(searchDate)) {
      setModalMessage(MODAL_MESSAGES.NUMBER_ERR);
      return false;
    } else if (searchDate.length !== 8) {
      setModalMessage(MODAL_MESSAGES.LENGTH_ERR);
      return false;
    } else if (isValid === 'Invalid date') {
      setModalMessage(MODAL_MESSAGES.FORMAT_ERR);
      return false;
    } else if (searchDate > moment().format('YYYYMMDD')) {
      setModalMessage(MODAL_MESSAGES.PREV_ERR);
      return false;
    } else if (searchDate < '20200120') {
      setModalMessage(MODAL_MESSAGES.PASS_ERR);
      return false;
    } else {
      setModalMessage(MODAL_MESSAGES.BLANK);
      return true;
    }
  };

  const getDatesData = async () => {
    if (isInputValid()) {
      const searchDate = (dateRef.current as HTMLInputElement).value;
      setModalStatus(FETCH_STATUS.UPDATING);
      setModalMessage(MODAL_MESSAGES.LOAD_DATA);
      await getData(`?startCreateDt=${searchDate}&endCreateDt=${searchDate}`);
      setModalStatus(FETCH_STATUS.UPDATED);
      setModalMessage(MODAL_MESSAGES.BLANK);
    }
  };

  const removeModal = () => {
    setDateModal(<></>);
    setModalMessage(MODAL_MESSAGES.BLANK);
    setModalStatus(FETCH_STATUS.UPDATED);
  };

  const setModal = () => {
    const modal: JSX.Element = (
      <HeaderModal dateRef={dateRef} isInputValid={isInputValid} modalMessage={modalMessage} getDatesData={getDatesData} removeModal={removeModal} />
    );
    setDateModal(modal);
    setModalStatus(FETCH_STATUS.UPDATING);
  };

  const moveDate = () => {
    !dateModal.props.children ? setModal() : removeModal();
  };

  const getYesterday = () => {
    const yesterday = moment().add(-1, 'days');
    let year: string = yesterday.format('YYYY');
    let month: string = yesterday.format('MM');
    let day: string = yesterday.format('DD');
    return year + month + day;
  };

  const getPastData = async () => {
    const searchDate: string = getYesterday();
    await getData(`?startCreateDt=${searchDate}&endCreateDt=${searchDate}`);
  };

  useEffect(() => {
    data.length === 0 ? getPastData() : setDate(moment(data[0][0].createDt));
    if (modalStatus === FETCH_STATUS.INIT) {
      setModalStatus(FETCH_STATUS.FINISHED);
    }
  }, [data]);

  useEffect(() => {
    if (modalStatus === FETCH_STATUS.FINISHED || modalStatus === FETCH_STATUS.UPDATING) {
      setModal();
    } else if (modalStatus === FETCH_STATUS.UPDATED) {
      removeModal();
    }
  }, [modalMessage]);

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
