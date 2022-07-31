import { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
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
      <Route path="/card" element={<Card data={data} />}></Route>
      <Route path="/map" element={<Map data={data} />}></Route>
      <Route path="/graph" element={<Graph data={data} />}></Route>
      <Route path="/" element={<Main />}></Route>
    </Routes>
  );
};

const App = () => {
  const [data, setData] = useState<objectType[][]>([]);
  const [modalStatus, setModalStatus] = useState<string>(FETCH_STATUS.INIT);
  const FETCH_PATH = 'data/corona';

  const sortData = (response: objectType[]) => {
    response.sort((previous, next) => {
      if (previous.incDec < next.incDec) return 1;
      else if (previous.incDec > next.incDec) return -1;
      return 0;
    });
  };

  const divideData = (response: objectType[] | undefined) => {
    if (response === undefined) return;
    sortData(response);
    const total = response.shift();
    const dataSet: objectType[][] = [];
    if (total !== undefined) dataSet.push([total]);
    response.map((r: objectType, i: number) => {
      if (i % 3 === 0) dataSet.push([r]);
      else dataSet[dataSet.length - 1].push(r);
    });
    setData(dataSet);
  };

  const getData = async (query: string) => {
    try {
      const data = await (await fetch(FETCH_PATH + query)).json();
      divideData(data.response.body.items.item);
    } catch (error) {
      console.log(error);
      divideData(undefined);
    } finally {
      setModalStatus(FETCH_STATUS.FINISHED);
    }
  };

  useEffect(() => {
    getData('');
  }, []);

  return (
    <BrowserRouter>
      <Header data={data} modalStatus={modalStatus} setModalStatus={setModalStatus} getData={getData} />
      <Components data={data} />
      <Footer />
    </BrowserRouter>
  );
};

export default App;
