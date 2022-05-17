import React, { useState, useEffect, useRef } from 'react';
import { Chart, BarElement, BarController, CategoryScale, LinearScale, Title, Legend } from 'chart.js';
import { objectType } from '../../App';
import '../../stylesheets/Graph.css';

interface datasetsType {
  label: string;
  backgroundColor: string;
  data: number[];
}

const Graph = ({ data }: { data: objectType[][] }) => {
  const [labels, setLabels] = useState<string[]>([]);
  const [datasetsOne, setDatasetsOne] = useState<datasetsType[]>([]);
  const [datasetsTwo, setDatasetsTwo] = useState<datasetsType[]>([]);
  const [charts, setCharts] = useState<Chart[]>([]);
  const graphOneRef = useRef<HTMLCanvasElement>(null);
  const graphTwoRef = useRef<HTMLCanvasElement>(null);

  Chart.register(BarElement, BarController, CategoryScale, LinearScale, Title, Legend);
  const labelsTemp: string[] = [];
  const datasetsOneTemp: datasetsType[] = [];
  const datasetsTwoTemp: datasetsType[] = [];
  const incDec: number[] = [];
  const deathCnt: number[] = [];

  const setData = () => {
    labelsTemp.length = 0;
    incDec.length = 0;
    deathCnt.length = 0;
    data.forEach((dataSet) => {
      dataSet.map((d) => {
        labelsTemp.push(d.gubun);
        incDec.push(d.incDec);
        deathCnt.push(d.deathCnt);
      });
    });
  };

  const drawChart = (ctx: CanvasRenderingContext2D, text: string, datasets: datasetsType[]) => {
    const chart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: labels,
        datasets: datasets,
      },
      options: {
        plugins: {
          title: {
            display: true,
            text: text,
          },
        },
        responsive: false,
      },
    });
    setCharts((c) => [...c, chart]);
  };

  const clearCtx = () => {
    if (!graphOneRef.current || !graphTwoRef.current) return;
    const ctxOne = graphOneRef.current.getContext('2d');
    const ctxTwo = graphTwoRef.current.getContext('2d');
    if (!ctxOne || !ctxTwo) return;
    ctxOne.clearRect(0, 0, graphOneRef.current.width, graphOneRef.current.height);
    ctxTwo.clearRect(0, 0, graphTwoRef.current.width, graphTwoRef.current.height);
  };

  const setDatasets = () => {
    clearCtx();
    setData();
    datasetsOneTemp.push({ label: '신규 확진자 수', backgroundColor: '#3e95cd', data: incDec });
    datasetsTwoTemp.push({ label: '누적 사망자 수', backgroundColor: '#8e5ea2', data: deathCnt });
    setLabels(labelsTemp);
  };

  useEffect(() => {
    setDatasets();
    setDatasetsOne(datasetsOneTemp);
    setDatasetsTwo(datasetsTwoTemp);
  }, []);

  useEffect(() => {
    if (charts.length >= 2) {
      setDatasets();
      charts[0].data.datasets = datasetsOneTemp;
      charts[1].data.datasets = datasetsTwoTemp;
      charts[0].update();
      charts[1].update();
    }
  }, [data]);

  useEffect(() => {
    if (datasetsOne.length === 0 || datasetsTwo.length === 0) return;
    if (!graphOneRef.current || !graphTwoRef.current) return;
    const ctxOne = graphOneRef.current.getContext('2d');
    const ctxTwo = graphTwoRef.current.getContext('2d');
    if (!ctxOne || !ctxTwo) return;
    drawChart(ctxOne, '코로나 오늘 확진자', datasetsOne);
    drawChart(ctxTwo, '누적 사망자 추이', datasetsTwo);
  }, [datasetsOne]);

  return (
    <div id="graph-set">
      <canvas className="graph-one" width={380} height={450} ref={graphOneRef}></canvas>
      <canvas className="graph-two" width={380} height={450} ref={graphTwoRef}></canvas>
    </div>
  );
};

export default React.memo(Graph);
