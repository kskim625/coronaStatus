import { XMLParser } from 'fast-xml-parser';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import Header from './components/Header';
import Main from './components/Main';
import Card from './components/Card';
import Map from './components/Map';
import Graph from './components/Graph';
import './stylesheets/Transition.css';

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

const Transition = ({ data }: { data: objectType[][] }) => {
  const location = useLocation();

  return (
    <TransitionGroup className="transition-group">
      <CSSTransition key={location.key} timeout={500} classNames="page-slider">
        <Routes>
          <Route path="/card" element={<Card data={data} />}></Route>
          <Route path="/map" element={<Map data={data} />}></Route>
          <Route path="/graph" element={<Graph data={data} />}></Route>
          <Route path="/" element={<Main />}></Route>
        </Routes>
      </CSSTransition>
    </TransitionGroup>
  );
};

const App = () => {
  const [data, setData] = useState<objectType[][]>([]);
  const FETCH_PATH = 'http://localhost:5000/data/corona';

  const sortData = (response: objectType[]) => {
    response.sort((previous, next) => {
      if (previous.incDec < next.incDec) return 1;
      else if (previous.incDec > next.incDec) return -1;
      return 0;
    });
  };

  const divideData = (response: objectType[]) => {
    if (response === undefined) return;
    sortData(response);
    const total = response.shift();
    const dataSet: objectType[][] = [];
    if (total !== undefined) dataSet.push([total]);
    response.map((r: objectType, i: number) => {
      if (i % 4 === 0) dataSet.push([r]);
      else dataSet[dataSet.length - 1].push(r);
    });
    setData(dataSet);
  };

  const getData = async () => {
    const data = await (await fetch(FETCH_PATH)).json();
    divideData(data.response.body.items.item);
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <BrowserRouter>
      <Header data={data} />
      <Transition data={data} />
    </BrowserRouter>
  );
};

export default App;
