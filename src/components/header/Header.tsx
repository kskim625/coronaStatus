import React, { useState } from 'react';
import HeaderButtons from './HeaderButtons';
import HeaderDateInfo from './HeaderDateInfo';
import MessagesModal from '../common/MessagesModal';
import { objectType } from '../../App';
import '../../stylesheets/Header.css';

const UpperHeader = () => {
  return (
    <div id="header">
      <div className="header-description">한국 코로나 상황판</div>
      <HeaderButtons />
    </div>
  );
};

const Header = ({ data, getData }: { data: objectType[][]; getData: (query: string) => Promise<void> }) => {
  const [modalStatus, setModalStatus] = useState<string>('init');

  return (
    <>
      <UpperHeader />
      <HeaderDateInfo data={data} modalStatus={modalStatus} setModalStatus={setModalStatus} getData={getData} />
      <MessagesModal data={data} modalStatus={modalStatus} getData={getData} />
    </>
  );
};

export default React.memo(Header);
