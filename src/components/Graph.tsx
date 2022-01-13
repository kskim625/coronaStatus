import { useState, useEffect, useRef } from 'react';
import { Chart, BarElement, BarController, CategoryScale, LinearScale, Title } from 'chart.js';
import { objectType } from '../App';
import '../stylesheets/Graph.css';

interface datasetsType {
  label: string;
  backgroundColor: string;
  data: number[];
}

const Graph = ({ data }: { data: objectType[][] }) => {
  const [labels, setLabels] = useState<string[]>([]);
  const [datasets, setDatasets] = useState<datasetsType[]>([]);
  const graphRef = useRef<HTMLCanvasElement>(null);

  Chart.register(BarElement, BarController, CategoryScale, LinearScale, Title);
  const labelsTemp: string[] = [];
  const datasetsTemp: datasetsType[] = [];
  const incDec: number[] = [];
  const isolClearCnt: number[] = [];
  const deathCnt: number[] = [];

  const setData = () => {
    data.forEach((dataSet) => {
      dataSet.map((d, i) => {
        labelsTemp.push(d.gubun);
        incDec.push(d.incDec);
        isolClearCnt.push(d.isolClearCnt);
        deathCnt.push(d.deathCnt);
      });
    });
  };

  useEffect(() => {
    setData();
    datasetsTemp.push({ label: '신규 확진자 수', backgroundColor: '#3e95cd', data: incDec });
    datasetsTemp.push({ label: '격리 해제', backgroundColor: '#000', data: isolClearCnt });
    datasetsTemp.push({ label: '누적 사망자 수', backgroundColor: '#8e5ea2', data: deathCnt });
    setLabels(labelsTemp);
    setDatasets(datasetsTemp);
  }, []);

  useEffect(() => {
    if (datasets.length === 0 || graphRef.current === null) return;
    const ctx = graphRef.current.getContext('2d');
    if (ctx === null) return;
    ctx.canvas.width = 800;
    ctx.canvas.height = 700;
    new Chart(ctx, {
      type: 'bar',
      data: {
        labels: labels,
        datasets: datasets,
      },
      options: {
        plugins: {
          title: {
            display: true,
            text: '코로나 현황판',
          },
        },
        responsive: false,
      },
    });
  }, [datasets]);

  return <canvas id="graph" width={8} height={7} ref={graphRef}></canvas>;
};

export default Graph;
