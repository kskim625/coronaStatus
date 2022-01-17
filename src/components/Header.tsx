import React, { useState, useEffect } from 'react';
import '../stylesheets/Header.css';
import flag from '../images/koreaFlag.svg';
import HeaderButtons from './HeaderButtons';
import { objectType } from '../App';

const Header = ({ data }: { data: objectType[][] }) => {
  const [date, setDate] = useState<Date>(new Date());
  const [errMsg, setErrMsg] = useState<string>('데이터가 업데이트되는 중입니다.');

  useEffect(() => {
    if (data.length === 0) return;
    setErrMsg('');
    setDate(new Date(data[0][0].createDt));
  }, []);

  return (
    <>
      <div id="header">
        <img className="header-image" src={flag}></img>
        <div className="header-description">한국 코로나 상황판</div>
      </div>
      <HeaderButtons />
      <div className="header-date">{`${date.getFullYear()}년 ${date.getMonth() + 1}월 ${date.getDate() - 1}일 기준`}</div>
      <div className="header-error-msg">{errMsg}</div>
    </>
  );
};

export default React.memo(Header);
