import { useState, useRef, useEffect, SetStateAction } from 'react';
import moment from 'moment';
import { objectType } from '../../App';
import leftArrow from '../../images/leftArrow.svg';
import rightArrow from '../../images/rightArrow.svg';

interface headerDateInfoType {
  data: objectType[][];
  setModalStatus: React.Dispatch<SetStateAction<string>>;
  getData: (query: string) => Promise<void>;
}

const HeaderDateInfo = ({ data, setModalStatus, getData }: headerDateInfoType) => {
  const [date, setDate] = useState<moment.Moment>(moment());
  const leftArrowRef = useRef<HTMLImageElement>(null);

  const getNewDate = (newDate: moment.Moment) => {
    let year = newDate.format('YYYY');
    let month = newDate.format('MM');
    let day = newDate.format('DD');
    return year + month + day;
  };

  const changeDate = async (e: React.MouseEvent) => {
    setModalStatus('load');
    let newDate: moment.Moment = moment();
    let changed: boolean = false;
    if (date > moment('01-03-2020', 'DD-MM-YYYY') && leftArrowRef.current === e.target) {
      newDate = date.add(-1, 'days');
      changed = true;
      setDate(newDate);
    } else if (date < moment().add(-1, 'days')) {
      newDate = date.add(1, 'days');
      changed = true;
      setDate(newDate);
    }
    if (changed) {
      const searchDate: string = getNewDate(newDate);
      await getData(`?startCreateDt=${searchDate}&endCreateDt=${searchDate}`);
    }
    setModalStatus('finished');
  };

  useEffect(() => {
    if (data.length === 0) return;
    setModalStatus('finished');
    setDate(moment(data[0][0].createDt));
  }, [data]);

  return (
    <div className="header-date">
      <img className="header-date-arrow" src={leftArrow} onClick={changeDate} ref={leftArrowRef}></img>
      <div className="header-date-text">{`${date.format('YYYY')}년 ${date.format('MM')}월 ${date.format('DD')}일 0시 기준`}</div>
      <img className="header-date-arrow" src={rightArrow} onClick={changeDate}></img>
    </div>
  );
};

export default HeaderDateInfo;
