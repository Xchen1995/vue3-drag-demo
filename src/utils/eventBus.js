class eventBus {
  constructor() {
    // 收集订阅信息,调度中心
    this.list = {};
  }
  $on(name, fn) {
    this.list[name] = this.list[name] || [];
    this.list[name].push(fn);
  }

  // 发布
  $emit(name, data) {
    if (this.list[name]) {
      this.list[name].forEach((fn) => {
        fn(data);
      });
    }
  }
}

export default new eventBus()