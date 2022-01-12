import React, { useState, useLayoutEffect } from 'react';
import { objectType } from '../App';
import '../stylesheets/StatusCard.css';

const INC_DEC_CONSTANTS = {
  severe: 1000,
  high: 700,
  elevated: 200,
  guarded: 50,
};

const StatusCard = ({ dataSet, from }: { dataSet: objectType[]; from: string }) => {
  const [className, setClassName] = useState('card-set');
  const setCardColor = (incDec: number) => {
    if (incDec >= INC_DEC_CONSTANTS.severe) return 'black';
    else if (incDec >= INC_DEC_CONSTANTS.high) return 'red';
    else if (incDec >= INC_DEC_CONSTANTS.elevated) return 'yellow';
    else if (incDec >= INC_DEC_CONSTANTS.guarded) return 'blue';
    else return 'green';
  };

  useLayoutEffect(() => {
    setClassName(`card-set-${from}`);
  }, [from]);

  return (
    <div className={className}>
      {dataSet.map((data, i) => {
        const cardColor = 'status-card card-color-' + setCardColor(data.incDec);
        return (
          <div key={`${data.gubun}-${i}`} className={cardColor}>
            <div className="status-card-location">{data.gubun === '검역' ? '해외' : data.gubun}</div>
            <div className="status-card-info">
              <div className="status-card-info-content">{`신규 확진자 수 : ${data.incDec.toLocaleString()}명`}</div>
              <div className="status-card-info-content">{`격리 해제 : ${data.isolClearCnt.toLocaleString()}명`}</div>
              <div className="status-card-info-content">{`누적 사망자 수 : ${data.deathCnt.toLocaleString()}명`}</div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default React.memo(StatusCard);
