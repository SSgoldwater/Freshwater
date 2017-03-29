import path from 'path';
import express from 'express';
import webpack from 'webpack';
import webpackMiddleware from 'webpack-dev-middleware';
import devConfig from '../webpack.config.dev.js';

const app = express();
const compiler = webpack(devConfig);

app.use(webpackMiddleware(compiler));
app.get('*', function response(req, res) {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(3000);
