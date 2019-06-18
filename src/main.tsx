import { Provider } from 'mobx-react';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import 'src/assets/base.scss';
// import registerServiceWorker from 'src/registerServiceWorker';
import Router from 'src/router/router';
import rootStore from 'src/store/index'

const render = (Component: any) => {
  ReactDOM.render(
    <Provider {...rootStore}>
      <Router />
    </Provider>,
    document.getElementById('root') as HTMLElement
  )
}

render(Router);

if (module.hot) {
  module.hot.accept('src/router/router', () => {
    render(Router);
  })
}

// registerServiceWorker();
