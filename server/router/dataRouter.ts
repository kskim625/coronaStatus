import { Router, Request, Response, NextFunction } from 'express';
import axios from 'axios';
import cors from 'cors';

const dataRouter = Router();
const corsOptions = {
  origin: ['http://localhost:3000', 'https://kcsi.site'],
};

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

dataRouter.get('/corona', cors(corsOptions), async (req: Request, res: Response, next: NextFunction) => {
  const SERVICE_URL = 'http://openapi.data.go.kr/openapi/service/rest/Covid19/getCovid19SidoInfStateJson';
  const AUTHORIZATION_KEY = '?serviceKey=Fl9rhYMejA8nhCfRxunEiv8iCWEKK%2FAiNOgmkrp0onGw%2FGIpuTVQc7vH0Kmh%2BaiOeQ6SZSXjk8zaqOdbp9yYTg%3D%3D';

  axios
    .get(SERVICE_URL + AUTHORIZATION_KEY)
    .then((response) => {
      res.send(response.data);
    })
    .catch((error) => {
      console.log(error);
    });
});

export default dataRouter;