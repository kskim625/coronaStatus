import { Fragment, useState, useRef, useEffect, useCallback } from 'react';
import moment from 'moment';
import { MODAL_MESSAGES } from '../../util/constants';
import HeaderMoveModal from './HeaderMoveModal';
import leftArrow from '../../images/leftArrow.svg';
import rightArrow from '../../images/rightArrow.svg';
import { headerType } from './Header';

const HeaderDateInfo = ({ data, getData }: headerType) => {
  const [date, setDate] = useState<moment.Moment>(moment());
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [modalMessage, setModalMessage] = useState<string>('');
  const leftArrowRef = useRef<HTMLImageElement>(null);
  const dateRef = useRef<HTMLInputElement>(null);

  const getNewDate = (newDate: moment.Moment) => {
    let year = newDate.format('YYYY');
    let month = newDate.format('MM');
    let day = newDate.format('DD');
    return year + month + day;
  };

  const changeDate = useCallback(
    async (e: React.MouseEvent) => {
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
        const searchDate: string = getNewDate(newDate);
        await getData(`?startCreateDt=${searchDate}&endCreateDt=${searchDate}`);
      }
    },
    [date, getData]
  );

  const isInputValid = () => {
    const searchDate = (dateRef.current as HTMLInputElement).value;
    const isValid = moment(searchDate, 'YYYYMMDD').format('YYYYMMDD');
    if (searchDate === '') {
      setModalMessage(MODAL_MESSAGES.BLANK);
      return false;
    } else if (!Number(searchDate)) {
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

  const getDatesData = useCallback(async () => {
    if (isInputValid()) {
      const searchDate = (dateRef.current as HTMLInputElement).value;
      setModalMessage(MODAL_MESSAGES.LOAD_DATA);
      await getData(`?startCreateDt=${searchDate}&endCreateDt=${searchDate}`);
      setDate(moment(searchDate));
      closeModal();
    }
  }, [getData]);

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setModalMessage(MODAL_MESSAGES.BLANK);
  };

  const getYesterday = () => {
    const yesterday = moment().add(-1, 'days');
    let year: string = yesterday.format('YYYY');
    let month: string = yesterday.format('MM');
    let day: string = yesterday.format('DD');
    return year + month + day;
  };

  const getPastData = useCallback(async () => {
    const searchDate: string = getYesterday();
    await getData(`?startCreateDt=${searchDate}&endCreateDt=${searchDate}`);
  }, [getData]);

  useEffect(() => {
    data.length === 0 ? getPastData() : setDate(moment(data[0][0].createDt));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [getPastData]);

  return (
    <Fragment>
      <div className="header-date">
        <img className="header-date-arrow" src={leftArrow} onClick={changeDate} ref={leftArrowRef} alt="header-date-arrow" />
        <div className="header-date-text" onClick={openModal}>{`${date.format('YYYY')}년 ${date.format('MM')}월 ${date.format(
          'DD'
        )}일 0시 기준`}</div>
        <img className="header-date-arrow" src={rightArrow} onClick={changeDate} alt="header-date-arrow" />
      </div>
      <HeaderMoveModal
        open={modalOpen}
        dateRef={dateRef}
        isInputValid={isInputValid}
        modalMessage={modalMessage}
        getDatesData={getDatesData}
        closeModal={closeModal}
      />
    </Fragment>
  );
};

export default HeaderDateInfo;
