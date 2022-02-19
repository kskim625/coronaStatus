import React, { useState } from 'react';
import flag from '../../images/virus.svg';
import HeaderButtons from './HeaderButtons';
import HeaderDateInfo from './HeaderDateInfo';
import MessagesModal from '../common/MessagesModal';
import { objectType } from '../../App';
import '../../stylesheets/Header.css';

const UpperHeader = () => {
  return (
    <div id="header">
      <img className="header-image" src={flag}></img>
      <div className="header-description">한국 코로나 상황판</div>
      <div className="header-dummy"></div>
    </div>
  );
};

const Header = ({ data, getData }: { data: objectType[][]; getData: (query: string) => Promise<void> }) => {
  const [modalStatus, setModalStatus] = useState<string>('init');

  return (
    <>
      <UpperHeader />
      <HeaderButtons />
      <HeaderDateInfo data={data} setModalStatus={setModalStatus} getData={getData} />
      <MessagesModal data={data} modalStatus={modalStatus} getData={getData} />
    </>
  );
};

export default React.memo(Header);
