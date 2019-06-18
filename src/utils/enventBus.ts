class EventBus {
    public events: object;
    constructor() {
        this.events = this.events || Object.create(null);
    }
    // 首先构造函数需要存储event事件，使用键值对存储
    // 然后我们需要发布事件，参数是事件的name和需要传递的参数
    public emit(name: string, ...args: any[]) {
        if (this.events[name]) {
            this.events[name].forEach( (fn: (...s: any) => void) => {
                fn(...args)
            })
        };
    }

    public on(name: string, fun: any) {
        if (!this.events[name]) {   // 如果从未注册过监听函数，则将函数放入数组存入对应的键名下
            this.events[name] = [fun];
        } else {  // 如果注册过，则直接放入
            this.events[name].push(fun);
        }
    }
}

const $Bus = new EventBus();
export default $Bus;