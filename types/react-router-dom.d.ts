export class BrowserRouter {
  constructor(...args: any[]);
  componentWillMount(): void;
  forceUpdate(callback: any): void;
  render(): any;
  setState(partialState: any, callback: any): void;
}
export namespace BrowserRouter {
  namespace propTypes {
    function basename(p0: any, p1: any, p2: any, p3: any, p4: any, p5: any): any;
    namespace basename {
      function isRequired(p0: any, p1: any, p2: any, p3: any, p4: any, p5: any): any;
    }
    function children(p0: any, p1: any, p2: any, p3: any, p4: any, p5: any): any;
    namespace children {
      function isRequired(p0: any, p1: any, p2: any, p3: any, p4: any, p5: any): any;
    }
    function forceRefresh(p0: any, p1: any, p2: any, p3: any, p4: any, p5: any): any;
    namespace forceRefresh {
      function isRequired(p0: any, p1: any, p2: any, p3: any, p4: any, p5: any): any;
    }
    function getUserConfirmation(p0: any, p1: any, p2: any, p3: any, p4: any, p5: any): any;
    namespace getUserConfirmation {
      function isRequired(p0: any, p1: any, p2: any, p3: any, p4: any, p5: any): any;
    }
    function keyLength(p0: any, p1: any, p2: any, p3: any, p4: any, p5: any): any;
    namespace keyLength {
      function isRequired(p0: any, p1: any, p2: any, p3: any, p4: any, p5: any): any;
    }
  }
}
export class HashRouter {
  constructor(...args: any[]);
  componentWillMount(): void;
  forceUpdate(callback: any): void;
  render(): any;
  setState(partialState: any, callback: any): void;
}
export namespace HashRouter {
  namespace propTypes {
    function basename(p0: any, p1: any, p2: any, p3: any, p4: any, p5: any): any;
    namespace basename {
      function isRequired(p0: any, p1: any, p2: any, p3: any, p4: any, p5: any): any;
    }
    function children(p0: any, p1: any, p2: any, p3: any, p4: any, p5: any): any;
    namespace children {
      function isRequired(p0: any, p1: any, p2: any, p3: any, p4: any, p5: any): any;
    }
    function getUserConfirmation(p0: any, p1: any, p2: any, p3: any, p4: any, p5: any): any;
    namespace getUserConfirmation {
      function isRequired(p0: any, p1: any, p2: any, p3: any, p4: any, p5: any): any;
    }
    function hashType(p0: any, p1: any, p2: any, p3: any, p4: any, p5: any): any;
    namespace hashType {
      function isRequired(p0: any, p1: any, p2: any, p3: any, p4: any, p5: any): any;
    }
  }
}
export class Link {
  static defaultProps: {
    replace: boolean;
  };
  constructor(...args: any[]);
  forceUpdate(callback: any): void;
  render(): any;
  setState(partialState: any, callback: any): void;
}
export namespace Link {
  namespace contextTypes {
    function router(p0: any, p1: any, p2: any, p3: any, p4: any, p5: any): any;
  }
  namespace propTypes {
    function innerRef(p0: any, p1: any, p2: any, p3: any, p4: any, p5: any): any;
    namespace innerRef {
      function isRequired(p0: any, p1: any, p2: any, p3: any, p4: any, p5: any): any;
    }
    function onClick(p0: any, p1: any, p2: any, p3: any, p4: any, p5: any): any;
    namespace onClick {
      function isRequired(p0: any, p1: any, p2: any, p3: any, p4: any, p5: any): any;
    }
    function replace(p0: any, p1: any, p2: any, p3: any, p4: any, p5: any): any;
    namespace replace {
      function isRequired(p0: any, p1: any, p2: any, p3: any, p4: any, p5: any): any;
    }
    function target(p0: any, p1: any, p2: any, p3: any, p4: any, p5: any): any;
    namespace target {
      function isRequired(p0: any, p1: any, p2: any, p3: any, p4: any, p5: any): any;
    }
    function to(p0: any, p1: any, p2: any, p3: any, p4: any, p5: any): any;
  }
}
export class MemoryRouter {
  constructor(...args: any[]);
  componentWillMount(): void;
  forceUpdate(callback: any): void;
  render(): any;
  setState(partialState: any, callback: any): void;
}
export namespace MemoryRouter {
  namespace propTypes {
    function children(p0: any, p1: any, p2: any, p3: any, p4: any, p5: any): any;
    namespace children {
      function isRequired(p0: any, p1: any, p2: any, p3: any, p4: any, p5: any): any;
    }
    function getUserConfirmation(p0: any, p1: any, p2: any, p3: any, p4: any, p5: any): any;
    namespace getUserConfirmation {
      function isRequired(p0: any, p1: any, p2: any, p3: any, p4: any, p5: any): any;
    }
    function initialEntries(p0: any, p1: any, p2: any, p3: any, p4: any, p5: any): any;
    namespace initialEntries {
      function isRequired(p0: any, p1: any, p2: any, p3: any, p4: any, p5: any): any;
    }
    function initialIndex(p0: any, p1: any, p2: any, p3: any, p4: any, p5: any): any;
    namespace initialIndex {
      function isRequired(p0: any, p1: any, p2: any, p3: any, p4: any, p5: any): any;
    }
    function keyLength(p0: any, p1: any, p2: any, p3: any, p4: any, p5: any): any;
    namespace keyLength {
      function isRequired(p0: any, p1: any, p2: any, p3: any, p4: any, p5: any): any;
    }
  }
}
export function NavLink(_ref: any): any;
export namespace NavLink {
  const defaultProps: {
    activeClassName: string;
    "aria-current": string;
  };
  namespace propTypes {
    function activeClassName(p0: any, p1: any, p2: any, p3: any, p4: any, p5: any): any;
    namespace activeClassName {
      function isRequired(p0: any, p1: any, p2: any, p3: any, p4: any, p5: any): any;
    }
    function activeStyle(p0: any, p1: any, p2: any, p3: any, p4: any, p5: any): any;
    namespace activeStyle {
      function isRequired(p0: any, p1: any, p2: any, p3: any, p4: any, p5: any): any;
    }
    function className(p0: any, p1: any, p2: any, p3: any, p4: any, p5: any): any;
    namespace className {
      function isRequired(p0: any, p1: any, p2: any, p3: any, p4: any, p5: any): any;
    }
    function exact(p0: any, p1: any, p2: any, p3: any, p4: any, p5: any): any;
    namespace exact {
      function isRequired(p0: any, p1: any, p2: any, p3: any, p4: any, p5: any): any;
    }
    function isActive(p0: any, p1: any, p2: any, p3: any, p4: any, p5: any): any;
    namespace isActive {
      function isRequired(p0: any, p1: any, p2: any, p3: any, p4: any, p5: any): any;
    }
    function location(p0: any, p1: any, p2: any, p3: any, p4: any, p5: any): any;
    namespace location {
      function isRequired(p0: any, p1: any, p2: any, p3: any, p4: any, p5: any): any;
    }
    function strict(p0: any, p1: any, p2: any, p3: any, p4: any, p5: any): any;
    namespace strict {
      function isRequired(p0: any, p1: any, p2: any, p3: any, p4: any, p5: any): any;
    }
    function style(p0: any, p1: any, p2: any, p3: any, p4: any, p5: any): any;
    namespace style {
      function isRequired(p0: any, p1: any, p2: any, p3: any, p4: any, p5: any): any;
    }
    function to(p0: any, p1: any, p2: any, p3: any, p4: any, p5: any): any;
  }
}
export class Prompt {
  static defaultProps: {
    when: boolean;
  };
  constructor(...args: any[]);
  componentWillMount(): void;
  componentWillReceiveProps(nextProps: any): void;
  componentWillUnmount(): void;
  disable(): void;
  enable(message: any): void;
  forceUpdate(callback: any): void;
  render(): any;
  setState(partialState: any, callback: any): void;
}
export namespace Prompt {
  namespace contextTypes {
    function router(p0: any, p1: any, p2: any, p3: any, p4: any, p5: any): any;
  }
  namespace propTypes {
    function message(p0: any, p1: any, p2: any, p3: any, p4: any, p5: any): any;
    function when(p0: any, p1: any, p2: any, p3: any, p4: any, p5: any): any;
    namespace when {
      function isRequired(p0: any, p1: any, p2: any, p3: any, p4: any, p5: any): any;
    }
  }
}
export class Redirect {
  static defaultProps: {
    push: boolean;
  };
  constructor(...args: any[]);
  componentDidMount(): void;
  componentDidUpdate(prevProps: any): void;
  componentWillMount(): void;
  computeTo(_ref: any): any;
  forceUpdate(callback: any): void;
  isStatic(): any;
  perform(): void;
  render(): any;
  setState(partialState: any, callback: any): void;
}
export namespace Redirect {
  namespace contextTypes {
    function router(p0: any, p1: any, p2: any, p3: any, p4: any, p5: any): any;
  }
  namespace propTypes {
    function computedMatch(p0: any, p1: any, p2: any, p3: any, p4: any, p5: any): any;
    namespace computedMatch {
      function isRequired(p0: any, p1: any, p2: any, p3: any, p4: any, p5: any): any;
    }
    function from(p0: any, p1: any, p2: any, p3: any, p4: any, p5: any): any;
    namespace from {
      function isRequired(p0: any, p1: any, p2: any, p3: any, p4: any, p5: any): any;
    }
    function push(p0: any, p1: any, p2: any, p3: any, p4: any, p5: any): any;
    namespace push {
      function isRequired(p0: any, p1: any, p2: any, p3: any, p4: any, p5: any): any;
    }
    function to(p0: any, p1: any, p2: any, p3: any, p4: any, p5: any): any;
  }
}
export class Route {
  constructor(...args: any[]);
  componentWillMount(): void;
  componentWillReceiveProps(nextProps: any, nextContext: any): void;
  computeMatch(_ref: any, router: any): any;
  forceUpdate(callback: any): void;
  getChildContext(): any;
  render(): any;
  setState(partialState: any, callback: any): void;
}
export namespace Route {
  namespace childContextTypes {
    function router(p0: any, p1: any, p2: any, p3: any, p4: any, p5: any): any;
  }
  namespace contextTypes {
    function router(p0: any, p1: any, p2: any, p3: any, p4: any, p5: any): any;
    namespace router {
      function isRequired(p0: any, p1: any, p2: any, p3: any, p4: any, p5: any): any;
    }
  }
  namespace propTypes {
    function children(p0: any, p1: any, p2: any, p3: any, p4: any, p5: any): any;
    namespace children {
      function isRequired(p0: any, p1: any, p2: any, p3: any, p4: any, p5: any): any;
    }
    function component(p0: any, p1: any, p2: any, p3: any, p4: any, p5: any): any;
    namespace component {
      function isRequired(p0: any, p1: any, p2: any, p3: any, p4: any, p5: any): any;
    }
    function computedMatch(p0: any, p1: any, p2: any, p3: any, p4: any, p5: any): any;
    namespace computedMatch {
      function isRequired(p0: any, p1: any, p2: any, p3: any, p4: any, p5: any): any;
    }
    function exact(p0: any, p1: any, p2: any, p3: any, p4: any, p5: any): any;
    namespace exact {
      function isRequired(p0: any, p1: any, p2: any, p3: any, p4: any, p5: any): any;
    }
    function location(p0: any, p1: any, p2: any, p3: any, p4: any, p5: any): any;
    namespace location {
      function isRequired(p0: any, p1: any, p2: any, p3: any, p4: any, p5: any): any;
    }
    function path(p0: any, p1: any, p2: any, p3: any, p4: any, p5: any): any;
    namespace path {
      function isRequired(p0: any, p1: any, p2: any, p3: any, p4: any, p5: any): any;
    }
    function render(p0: any, p1: any, p2: any, p3: any, p4: any, p5: any): any;
    namespace render {
      function isRequired(p0: any, p1: any, p2: any, p3: any, p4: any, p5: any): any;
    }
    function sensitive(p0: any, p1: any, p2: any, p3: any, p4: any, p5: any): any;
    namespace sensitive {
      function isRequired(p0: any, p1: any, p2: any, p3: any, p4: any, p5: any): any;
    }
    function strict(p0: any, p1: any, p2: any, p3: any, p4: any, p5: any): any;
    namespace strict {
      function isRequired(p0: any, p1: any, p2: any, p3: any, p4: any, p5: any): any;
    }
  }
}
export class Router {
  constructor(...args: any[]);
  componentWillMount(): void;
  componentWillReceiveProps(nextProps: any): void;
  componentWillUnmount(): void;
  computeMatch(pathname: any): any;
  forceUpdate(callback: any): void;
  getChildContext(): any;
  render(): any;
  setState(partialState: any, callback: any): void;
}
export namespace Router {
  namespace childContextTypes {
    function router(p0: any, p1: any, p2: any, p3: any, p4: any, p5: any): any;
  }
  namespace contextTypes {
    function router(p0: any, p1: any, p2: any, p3: any, p4: any, p5: any): any;
    namespace router {
      function isRequired(p0: any, p1: any, p2: any, p3: any, p4: any, p5: any): any;
    }
  }
  namespace propTypes {
    function children(p0: any, p1: any, p2: any, p3: any, p4: any, p5: any): any;
    namespace children {
      function isRequired(p0: any, p1: any, p2: any, p3: any, p4: any, p5: any): any;
    }
    function history(p0: any, p1: any, p2: any, p3: any, p4: any, p5: any): any;
  }
}
export class StaticRouter {
  static defaultProps: {
    basename: string;
    location: string;
  };
  constructor(...args: any[]);
  componentWillMount(): void;
  forceUpdate(callback: any): void;
  getChildContext(): any;
  render(): any;
  setState(partialState: any, callback: any): void;
}
export namespace StaticRouter {
  namespace childContextTypes {
    function router(p0: any, p1: any, p2: any, p3: any, p4: any, p5: any): any;
  }
  namespace propTypes {
    function basename(p0: any, p1: any, p2: any, p3: any, p4: any, p5: any): any;
    namespace basename {
      function isRequired(p0: any, p1: any, p2: any, p3: any, p4: any, p5: any): any;
    }
    function context(p0: any, p1: any, p2: any, p3: any, p4: any, p5: any): any;
    function location(p0: any, p1: any, p2: any, p3: any, p4: any, p5: any): any;
    namespace location {
      function isRequired(p0: any, p1: any, p2: any, p3: any, p4: any, p5: any): any;
    }
  }
}
export class Switch {
  constructor(...args: any[]);
  componentWillMount(): void;
  componentWillReceiveProps(nextProps: any): void;
  forceUpdate(callback: any): void;
  render(): any;
  setState(partialState: any, callback: any): void;
}
export namespace Switch {
  namespace contextTypes {
    function router(p0: any, p1: any, p2: any, p3: any, p4: any, p5: any): any;
  }
  namespace propTypes {
    function children(p0: any, p1: any, p2: any, p3: any, p4: any, p5: any): any;
    namespace children {
      function isRequired(p0: any, p1: any, p2: any, p3: any, p4: any, p5: any): any;
    }
    function location(p0: any, p1: any, p2: any, p3: any, p4: any, p5: any): any;
    namespace location {
      function isRequired(p0: any, p1: any, p2: any, p3: any, p4: any, p5: any): any;
    }
  }
}
export function generatePath(...args: any[]): any;
export function matchPath(pathname: any, ...args: any[]): any;
export function withRouter(Component: any): any;
