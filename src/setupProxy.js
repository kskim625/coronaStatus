import { createProxyMiddleware } from 'http-proxy-middleware';

module.exports = (app) => {
  app.use(createProxyMiddleware('/data/corona'), {
    target: 'https://korea-corona-status-info.herokuapp.com',
    changeOrigin: true,
  });
};
