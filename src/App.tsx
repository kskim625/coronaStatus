import { useEffect, useState, useCallback } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { XMLParser } from 'fast-xml-parser';
import Header from './components/header/Header';
import Footer from './components/footer/Footer';
import Main from './components/pages/Main';
import Card from './components/pages/Card';
import Map from './components/pages/Map';
import Graph from './components/pages/Graph';
import { FETCH_STATUS } from './util/constants';

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

const Components = ({ data }: { data: objectType[][] }) => {
  return (
    <Routes>
      <Route path="/card" element={<Card data={data} />} />
      <Route path="/map" element={<Map data={data} />} />
      <Route path="/graph" element={<Graph data={data} />} />
      <Route path="/" element={<Main />} />
      <Route path="/*" element={<Navigate to="/" />} />
    </Routes>
  );
};

const App = () => {
  const [data, setData] = useState<objectType[][]>([]);
  const [modalStatus, setModalStatus] = useState<string>(FETCH_STATUS.INIT);

  const sortData = (response: objectType[]) => {
    response.sort((previous, next) => {
      if (previous.incDec < next.incDec) return 1;
      else if (previous.incDec > next.incDec) return -1;
      return 0;
    });
  };

  const divideData = useCallback((response: objectType[] | undefined) => {
    if (response === undefined) return;
    sortData(response);
    const total = response.shift();
    const dataSet: objectType[][] = [];
    if (total !== undefined) dataSet.push([total]);
    response.forEach((r: objectType, i: number) => {
      if (i % 3 === 0) dataSet.push([r]);
      else dataSet[dataSet.length - 1].push(r);
    });
    setData(dataSet);
  }, []);

  const getData = useCallback(
    async (query: string) => {
      try {
        const SERVICE_URL = 'http://openapi.data.go.kr/openapi/service/rest/Covid19/getCovid19SidoInfStateJson';
        const AUTHORIZATION_KEY = '?serviceKey=Fl9rhYMejA8nhCfRxunEiv8iCWEKK%2FAiNOgmkrp0onGw%2FGIpuTVQc7vH0Kmh%2BaiOeQ6SZSXjk8zaqOdbp9yYTg%3D%3D';

        const data = await fetch(SERVICE_URL + AUTHORIZATION_KEY + query);
        const itemArr = new XMLParser().parse(await data.text()).response.body?.items?.item || [];
        divideData(itemArr);
      } catch (error) {
        console.log(error);
        divideData(undefined);
      } finally {
        setModalStatus(FETCH_STATUS.FINISHED);
      }
    },
    [divideData]
  );

  useEffect(() => {
    getData('');
  }, [getData]);

  return (
    <BrowserRouter>
      <Header data={data} modalStatus={modalStatus} setModalStatus={setModalStatus} getData={getData} />
      <Components data={data} />
      <Footer />
    </BrowserRouter>
  );
};

export default App;
