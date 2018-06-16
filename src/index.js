import React from 'react';
import ReactDOM from 'react-dom';
import Board from './components/Board/Board';
import { observe } from './components/Game/Game';
import './index.css';

observe(moveHappened =>
  ReactDOM.render(<Board moveHappened={moveHappened} />, document.getElementById('root'))
);