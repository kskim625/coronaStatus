import { createProxyMiddleware } from 'http-proxy-middleware';

module.exports = (app: any) => {
  app.use(createProxyMiddleware('api/data'), {
    target: 'http://localhost:5000',
    changeOrigin: true,
  });
};
