import React, { useState } from 'react';
import '../stylesheets/Header.css';
import flag from '../images/koreaFlag.svg';
import HeaderButtons from './HeaderButtons';

const Header = () => {
  const [today] = useState<Date>(new Date());

  return (
    <>
      <div id="header">
        <img className="header-image" src={flag}></img>
        <div className="header-description">한국 코로나 상황판</div>
      </div>
      <HeaderButtons />
      <div className="header-date">{`${today.getFullYear()}년 ${today.getMonth() + 1}월 ${today.getDate() - 1}일 기준`}</div>
    </>
  );
};

export default React.memo(Header);
