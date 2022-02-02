import { Router, Request, Response, NextFunction } from 'express';
import axios from 'axios';

const dataRouter = Router();

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

dataRouter.get('/corona', async (req: Request, res: Response, next: NextFunction) => {
  const SERVICE_URL = 'http://openapi.data.go.kr/openapi/service/rest/Covid19/getCovid19SidoInfStateJson';
  const AUTHORIZATION_KEY = '?serviceKey=Fl9rhYMejA8nhCfRxunEiv8iCWEKK%2FAiNOgmkrp0onGw%2FGIpuTVQc7vH0Kmh%2BaiOeQ6SZSXjk8zaqOdbp9yYTg%3D%3D';

  const response = await axios.get(SERVICE_URL + AUTHORIZATION_KEY);
  res.send(response.data);
});

export default dataRouter;
