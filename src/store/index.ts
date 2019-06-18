import HelloStore from "./HelloStore";
import BusinessCardStore from "./BusinessCard";

class RootStore {
  public helloStore: HelloStore = new HelloStore()
  public businessCardStore: BusinessCardStore = new BusinessCardStore()
}

export default new RootStore()
export { HelloStore }
export { BusinessCardStore }
