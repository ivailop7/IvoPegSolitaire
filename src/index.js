import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Board from './components/Board/Board';
import { observe } from './components/Game/Game';

observe(moveHappened =>
  ReactDOM.render(<Board moveHappened={moveHappened} />, document.getElementById('root'))
);