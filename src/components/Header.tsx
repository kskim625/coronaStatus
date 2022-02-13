import React, { useState, useEffect, useRef } from 'react';
import flag from '../images/virus.svg';
import leftArrow from '../images/leftArrow.svg';
import rightArrow from '../images/rightArrow.svg';
import HeaderButtons from './HeaderButtons';
import MessagesModal from './MessagesModal';
import { objectType } from '../App';
import '../stylesheets/Header.css';

const Header = ({ data, getData }: { data: objectType[][]; getData: (query: string) => Promise<void> }) => {
  const [date, setDate] = useState<Date>(new Date());
  const [modalStatus, setModalStatus] = useState<String>('init');
  const leftArrowRef = useRef<HTMLImageElement>(null);

  const getNewDate = (newDate: Date) => {
    let year = String(newDate.getFullYear());
    let month = String(newDate.getMonth() + 1);
    month = month.length === 1 ? '0' + month : month;
    let day = String(newDate.getDate());
    day = day.length === 1 ? '0' + day : day;
    return year + month + day;
  };

  const changeDate = async (e: React.MouseEvent) => {
    setModalStatus('load');
    let newDate: Date = new Date();
    if (date > new Date(2020, 3, 1) && leftArrowRef.current === e.target) {
      newDate = new Date(date.getFullYear(), date.getMonth(), date.getDate() - 1);
      setDate(newDate);
    } else if (date < new Date(date.getFullYear(), date.getMonth(), date.getDate() - 1)) {
      newDate = new Date(date.getFullYear(), date.getMonth(), date.getDate() + 1);
      setDate(newDate);
    }
    const searchDate: string = getNewDate(newDate);
    await getData(`?startCreateDt=${searchDate}&endCreateDt=${searchDate}`);
    setModalStatus('finished');
  };

  useEffect(() => {
    if (data.length === 0) return;
    setModalStatus('finished');
    setDate(new Date(data[0][0].createDt));
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
        <div className="header-date-text">{`${date.getFullYear()}년 ${date.getMonth() + 1}월 ${date.getDate()}일 0시 기준`}</div>
        <img className="header-date-arrow" src={rightArrow} onClick={changeDate}></img>
      </div>
      <MessagesModal data={data} modalStatus={modalStatus} getData={getData} />
    </>
  );
};

export default React.memo(Header);
