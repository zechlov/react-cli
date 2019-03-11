import HelloStore from "./HelloStore";

class RootStore {

  public helloStore: HelloStore = new HelloStore()
  
}

export default new RootStore()
export { HelloStore }
