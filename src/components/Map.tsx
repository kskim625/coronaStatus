import React, { useState, useEffect } from 'react';
import { objectType } from '../App';
import { ReactComponent as KoreaMap } from '../images/koreaMap.svg';
import StatusCard from './StatusCard';
import '../stylesheets/Map.css';

const Map = ({ data }: { data: objectType[][] }) => {
  const [locData, setLocData] = useState<objectType[]>();

  const replaceAll = (strTemp: string, strValue1: string, strValue2: string) => {
    while (true) {
      if (strTemp.indexOf(strValue1) !== -1) strTemp = strTemp.replace(strValue1, strValue2);
      else break;
    }
    return strTemp;
  };

  const getLocationInfo = (e: React.MouseEvent | null) => {
    if (e === null) {
      setLocData([data[0][0]]);
      return;
    }
    const word = unescape(replaceAll((e.target as HTMLDivElement).id, '\\', '%'));
    data.forEach((dataSet) => {
      dataSet.map((d) => {
        if (word === d.gubun) setLocData([d]);
      });
    });
  };

  useEffect(() => {
    getLocationInfo(null);
  }, []);

  return (
    <div className="map-wrapper">
      <KoreaMap className="map" onClick={getLocationInfo} />
      {(() => {
        if (locData !== undefined) return <StatusCard dataSet={locData} from="map" />;
      })()}
    </div>
  );
};

export default Map;
