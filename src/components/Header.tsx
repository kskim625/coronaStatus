import React, { useState, useEffect } from 'react';
import flag from '../images/virus.svg';
import HeaderButtons from './HeaderButtons';
import Messages from './Messages';
import { objectType } from '../App';
import '../stylesheets/Header.css';

const Header = ({ data }: { data: objectType[][] }) => {
  const [date, setDate] = useState<Date>(new Date());

  useEffect(() => {
    console.log(data);
    if (data.length === 0) return;
    setDate(new Date(data[0][0].createDt));
  }, []);

  return (
    <>
      <div id="header">
        <img className="header-image" src={flag}></img>
        <div className="header-description">한국 코로나 상황판</div>
        <div className="header-dummy"></div>
      </div>
      <HeaderButtons />
      <div className="header-date">{`${date.getFullYear()}년 ${date.getMonth() + 1}월 ${date.getDate()}일 0시 기준`}</div>
      <Messages data={data} />
    </>
  );
};

export default React.memo(Header);
