import createBrowserHistory from 'history/createBrowserHistory'
import * as React from 'react';
import { Suspense } from 'react'
import { Route, Router, Switch } from "react-router-dom";
import style from './router.scss';

const history = createBrowserHistory()
const About = React.lazy(() => import('src/pages/about/about'))
const Home = React.lazy(() => import('src/pages/home/home'))
const SignIn = React.lazy(() => import('src/pages/entry/signin/index'))

class App extends React.Component {
  public render() {
    return (
      <Router history={history}>
        <div className={style.App}>
        <Suspense fallback={<div>loading</div>}>
          <Switch>
              <Route exact={true} path="/">
                <Home/>
              </Route>
              <Route path="/about">
                <About/>
              </Route>
              <Route path="/signin">
                <SignIn/>
              </Route>
          </Switch>
        </Suspense>
        </div>
      </Router>
    )
  }
}

export default App;
