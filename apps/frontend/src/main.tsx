import React from 'react';
import ReactDOM from 'react-dom';
import 'typeface-roboto';
import './styles.css'

import { BrowserRouter } from 'react-router-dom';

import { App } from './app/app';

ReactDOM.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.getElementById('root')
);
