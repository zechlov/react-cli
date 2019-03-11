import 'antd/dist/antd.css';
import { Provider } from 'mobx-react';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import 'src/assets/base.scss';
import 'src/assets/normalize.css';
import registerServiceWorker from 'src/registerServiceWorker';
import Router from 'src/router/router';
import rootStore from 'src/store/index'

ReactDOM.render(
  <Provider {...rootStore}>
    <Router />
  </Provider>,
  document.getElementById('root') as HTMLElement
);
registerServiceWorker();
