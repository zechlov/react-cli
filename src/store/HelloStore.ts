import { action, observable } from 'mobx'

interface Hello {
  hello: number
};

export default class HelloStore implements Hello {
  @observable
  public hello: number = 1

  @action
  public sayHello() {
    this.hello ++
  }
}
