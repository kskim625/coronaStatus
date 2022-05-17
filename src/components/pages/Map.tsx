import React, { useState, useEffect } from 'react';
import { objectType } from '../../App';
import { ReactComponent as KoreaMap } from '../../images/koreaMap.svg';
import CardColor from '../card/CardColor';
import StatusCard from '../card/StatusCard';
import { setCardColor } from '../card/StatusCard';
import '../../stylesheets/Map.css';

const Map = ({ data }: { data: objectType[][] }) => {
  const [locData, setLocData] = useState<objectType[]>([]);
  const classLists: string[] = ['land-black', 'land-red', 'land-yellow', 'land-blue', 'land-green'];

  const replaceAll = (strTemp: string, strValue1: string, strValue2: string) => {
    while (true) {
      if (strTemp.indexOf(strValue1) !== -1) strTemp = strTemp.replace(strValue1, strValue2);
      else break;
    }
    return strTemp;
  };

  const toUnicode = (word: string) => {
    if (word.length > 2) return '에러: 위치 데이터를 확인하세요.';
    const first = word[0].charCodeAt(0).toString(16).toUpperCase();
    const second = word[1].charCodeAt(0).toString(16).toUpperCase();
    return `\\u${first}\\u${second}`;
  };

  const getLocationInfo = (e: React.MouseEvent) => {
    const word = unescape(replaceAll((e.target as HTMLDivElement).id, '\\', '%'));
    data.forEach((dataSet) => {
      dataSet.map((d) => {
        if (word === d.gubun) setLocData([d]);
      });
    });
  };

  const setMapColor = () => {
    data.forEach((dataSet) => {
      dataSet.map((d) => {
        const locUnicode = document.getElementById(toUnicode(d.gubun));
        if (locUnicode) {
          classLists.forEach((classList) => {
            locUnicode.classList.remove(classList);
          });
          locUnicode.classList.add(`land-${setCardColor(d.incDec)}`);
        }
      });
    });
  };

  useEffect(() => {
    if (data.length === 0) return;
    setLocData([data[0][0]]);
    setMapColor();
  }, [data]);

  return (
    <div id="map">
      <CardColor />
      <div className="map-wrapper">
        <KoreaMap className="map" onClick={getLocationInfo} />
        <StatusCard dataSet={locData} from="map" />
      </div>
    </div>
  );
};

export default Map;
