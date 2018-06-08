import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
// import App from './App';
// import registerServiceWorker from './registerServiceWorker';
import Board from './components/Board/Board';
import { observe } from './components/Game/Game';


// ReactDOM.render(<Board ballPosition={[2, 4]} />, document.getElementById('root'));
// registerServiceWorker();

observe(ballPosition =>
    ReactDOM.render(
      <Board ballPosition={ballPosition} />,
      document.getElementById('root')
    )
  );
