import React from 'react';
import { useNavigate } from 'react-router';
import '../stylesheets/Header.css';
import flag from '../images/koreaFlag.svg';

const Header = () => {
  const navigate = useNavigate();

  const redirectToMap = () => {
    navigate('/map');
  };

  const redirectToCard = () => {
    navigate('/card');
  };

  const redirectToMain = () => {
    navigate('/');
  };

  return (
    <>
      <div id="header">
        <img className="header-image" src={flag}></img>
        <div className="header-description">한국 코로나 상황판</div>
      </div>
      <div id="header-buttons">
        <button className="btn-redirect-map header-btn" onClick={redirectToMap}>
          지도로 보기
        </button>
        <button className="btn-redirect-card header-btn" onClick={redirectToCard}>
          카드로 보기
        </button>
        <button className="btn-redirect-main header-btn" onClick={redirectToMain}>
          메인으로 돌아가기
        </button>
      </div>
    </>
  );
};

export default React.memo(Header);
