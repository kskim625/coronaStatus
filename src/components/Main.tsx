import { useState, useEffect } from "react";
import { XMLParser } from "fast-xml-parser";
import StatusCard from "./StatusCard";
import "../stylesheets/Main.css";

export interface objectType {
  createDt: string;
  deathCnt: number;
  defCnt: number;
  gubun: string;
  gubunCn: string;
  gubunEn: string;
  incDec: number;
  isolClearCnt: number;
  localOccCnt: number;
  overFlowCnt: number;
  qurRate: string;
  seq: number;
  stdDay: string;
  updateDt: string;
}

const Main = () => {
  const [data, setData] = useState<objectType[][]>([]);

  const SERVICE_URL =
    "http://openapi.data.go.kr/openapi/service/rest/Covid19/getCovid19SidoInfStateJson";
  const AUTHORIZATION_KEY =
    "?serviceKey=Fl9rhYMejA8nhCfRxunEiv8iCWEKK%2FAiNOgmkrp0onGw%2FGIpuTVQc7vH0Kmh%2BaiOeQ6SZSXjk8zaqOdbp9yYTg%3D%3D";
  const xhr = new XMLHttpRequest();
  const parser = new XMLParser();

  const sortData = (response: objectType[]) => {
    response.sort((previous, next) => {
      if (previous.incDec < next.incDec) return 1;
      else if (previous.incDec > next.incDec) return -1;
      return 0;
    });
  };

  const divideData = (response: objectType[], dataSet: objectType[][]) => {
    sortData(response);
    const total = response.shift();
    if (total !== undefined) dataSet.push([total]);
    response.map((r: objectType, i: number) => {
      if (i % 4 === 0) dataSet.push([r]);
      else dataSet[dataSet.length - 1].push(r);
    });
    setData(dataSet);
  };

  const getData = () => {
    xhr.onreadystatechange = () => {
      if (xhr.readyState === xhr.DONE) {
        if (xhr.status === 200) {
          const response = parser.parse(xhr.responseText).response;
          const dataSet: objectType[][] = [];
          divideData(response.body.items.item, dataSet);
        } else {
          console.log(`status code: ${xhr.status} fail`);
        }
      }
    };
    xhr.open("GET", SERVICE_URL + AUTHORIZATION_KEY);
    xhr.send();
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div id="wrapper">
      {data.map((dataSet, i) => {
        return <StatusCard key={`statusCard-${i}`} dataSet={dataSet} />;
      })}
      <button className="main-button" onClick={getData}></button>
    </div>
  );
};

export default Main;
