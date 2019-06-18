import { createBrowserHistory } from 'history'
import * as React from 'react';
import { Route, Router } from "react-router-dom";
import BusinessCardLayout from 'src/layout/businessCard'
import ControlLayout from 'src/layout/control'

const history = createBrowserHistory({
  basename: '',
  forceRefresh: false,
  keyLength: 6,
  getUserConfirmation: (message, callback) => callback(window.confirm(message))
})
const About = React.lazy(() => import('src/pages/about/about'))
const Home = React.lazy(() => import('src/pages/home/home'))
const SignIn = React.lazy(() => import('src/pages/entry/signin/index'))
const SignUp = React.lazy(() => import('src/pages/entry/signup/index'))
const AgentSign = React.lazy(() => import('src/pages/entry/agentSign/index'))
const BusinessCardInfo = React.lazy(() => import('src/pages/businessCard/BaseInfo/index'))
const ControlMain = React.lazy(() => import('src/pages/control/main/index'))


class App extends React.Component {
  public render() {
    const pathname = history.location.pathname
    if (pathname.indexOf('/minprogram/businessCard') === 0) {
      return (
        <Router history={history}>
          {/* 垮Layout之间的路由跳转，使用<a>标签，或者location.href='***' */}
          <BusinessCardLayout history={history}>
            <Route path="/minprogram/businessCard/:appId/baseinfo" component={BusinessCardInfo} />
          </BusinessCardLayout>
        </Router>
      )
    }

    return (
      <Router history={history}>
        {/* 垮Layout之间的路由跳转，使用<a>标签，或者location.href='***' */}
        <ControlLayout history={history}>
          <Route exact={true} path="/" component={Home} />
          <Route path="/control/main" component={ControlMain} />
          <Route path="/about" component={About} />
          <Route path="/signin" component={SignIn} />
          <Route path="/signup" component={SignUp} />
          <Route path="/agentsign/:agentId" component={AgentSign} />
        </ControlLayout>
      </Router>
    )
  }
}

export default App;
