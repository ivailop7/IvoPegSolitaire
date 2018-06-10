import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Board from './components/Board/Board';
import { observe } from './components/Game/Game';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';

ReactDOM.render(<Header/>, document.getElementById('header'))

observe(moveHappened =>
  ReactDOM.render(<Board moveHappened={moveHappened} />, document.getElementById('root'))
);

ReactDOM.render(<Footer/>, document.getElementById('footer'))