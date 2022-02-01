import express from 'express';
import dataRouter from './router/dataRouter';
import bodyParser from 'body-parser';
import path from 'path';
import cors from 'cors';

const app: express.Application = express();
const PORT = 8080;
const corsOptions = {
  origin: ['http://localhost:3000', 'https://korea-corona-status-info.herokuapp.com'],
  credentials: true,
};

app.use('/data', dataRouter);
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '../build')));
app.use(cors(corsOptions));
app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, '../build/index.html'));
});

app.listen(PORT, () => console.log(`listening on port ${PORT}`));
