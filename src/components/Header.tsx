import React, { useState, useEffect, useRef } from 'react';
import moment from 'moment';
import flag from '../images/virus.svg';
import leftArrow from '../images/leftArrow.svg';
import rightArrow from '../images/rightArrow.svg';
import HeaderButtons from './HeaderButtons';
import MessagesModal from './MessagesModal';
import { objectType } from '../App';
import '../stylesheets/Header.css';

const Header = ({ data, getData }: { data: objectType[][]; getData: (query: string) => Promise<void> }) => {
  const [date, setDate] = useState<moment.Moment>(moment());
  const [modalStatus, setModalStatus] = useState<String>('init');
  const leftArrowRef = useRef<HTMLImageElement>(null);

  const getNewDate = (newDate: moment.Moment) => {
    let year = String(newDate.format('YYYY'));
    let month = String(newDate.format('MM'));
    let day = String(newDate.format('DD'));
    return year + month + day;
  };

  const changeDate = async (e: React.MouseEvent) => {
    setModalStatus('load');
    let newDate: moment.Moment = moment();
    if (date > moment('01-03-2020', 'DD-MM-YYYY') && leftArrowRef.current === e.target) {
      newDate = date.add(-1, 'days');
      setDate(newDate);
    } else if (date < moment().add(-1, 'days')) {
      newDate = date.add(1, 'days');
      setDate(newDate);
    }
    const searchDate: string = getNewDate(newDate);
    await getData(`?startCreateDt=${searchDate}&endCreateDt=${searchDate}`);
    setModalStatus('finished');
  };

  useEffect(() => {
    if (data.length === 0) return;
    setModalStatus('finished');
    setDate(moment(data[0][0].createDt));
  }, [data]);

  return (
    <>
      <div id="header">
        <img className="header-image" src={flag}></img>
        <div className="header-description">한국 코로나 상황판</div>
        <div className="header-dummy"></div>
      </div>
      <HeaderButtons />
      <div className="header-date">
        <img className="header-date-arrow" src={leftArrow} onClick={changeDate} ref={leftArrowRef}></img>
        <div className="header-date-text">{`${date.format('YYYY')}년 ${date.format('MM')}월 ${date.format('DD')}일 0시 기준`}</div>
        <img className="header-date-arrow" src={rightArrow} onClick={changeDate}></img>
      </div>
      <MessagesModal data={data} modalStatus={modalStatus} getData={getData} />
    </>
  );
};

export default React.memo(Header);
