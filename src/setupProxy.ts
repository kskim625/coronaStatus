import { createProxyMiddleware } from 'http-proxy-middleware';

module.exports = (app: any) => {
  app.use(createProxyMiddleware('/data/corona'), {
    target: 'http://localhost:5000',
    changeOrigin: true,
  });
};
