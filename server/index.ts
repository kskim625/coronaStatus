import express from 'express';
import dataRouter from './router/dataRouter';
import bodyParser from 'body-parser';
import path from 'path';
import sslRedirect from 'heroku-ssl-redirect';

const app: express.Application = express();
const PORT = process.env.PORT || 5000;

app.use(sslRedirect());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '../build')));
app.use('/data', dataRouter);
app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, '../build/index.html'));
});

app.listen(PORT, () => console.log(`listening on port ${PORT}`));
