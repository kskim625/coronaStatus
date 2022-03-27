import { useEffect, useState } from 'react';
import { useLocation } from 'react-router';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import Header from './components/header/Header';
import Footer from './components/footer/Footer';
import Main from './components/pages/Main';
import Card from './components/pages/Card';
import Map from './components/pages/Map';
import Graph from './components/pages/Graph';
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
    let data;
    try {
      data = await (await fetch(FETCH_PATH + query)).json();
      divideData(data.response.body.items.item);
    } catch (error) {
      console.log(error);
      divideData(undefined);
    }
  };

  useEffect(() => {
    getData('');
  }, []);

  return (
    <BrowserRouter>
      <Header data={data} getData={getData} />
      <Transition data={data} />
      <Footer />
    </BrowserRouter>
  );
};

export default App;
