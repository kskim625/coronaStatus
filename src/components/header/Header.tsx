import { Fragment } from 'react';
import HeaderButtons from './HeaderButtons';
import HeaderDateInfo from './HeaderDateInfo';
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

export interface headerType {
  data: objectType[][];
  getData: (query: string) => Promise<void>;
}

const Header = ({ data, getData }: headerType) => {
  return (
    <Fragment>
      <UpperHeader />
      <HeaderDateInfo data={data} getData={getData} />
    </Fragment>
  );
};

export default Header;
