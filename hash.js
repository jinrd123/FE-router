class HashRouter {
  constructor(routes = []) {
    this.routes = routes; // 路由映射数组
    this.currentHash = ""; // 记录当前被选中的hash
    // 坑点: 本质上HashRouter类中的refresh函数是作为事件的回调函数，它里面要正确的调用其他类的方法，需要保证调用refresh的this为类实例
    this.refresh = this.refresh.bind(this);
    window.addEventListener("load", this.refresh);
    window.addEventListener("hashchange", this.refresh);
  }
  matchComponent() {
    const { component } = this.routes.find(route => route.path === this.currentHash);
    document.querySelector(".page-content").innerHTML = component;
  }
  refresh(event) {
    if (event.newURL) {
      this.currentHash = event.newURL.split("#")[1];
    } else {
      this.currentHash = window.location.hash.slice(1);
    }
    this.matchComponent();
  }
}
new HashRouter([
  {
    path: '/',
    component: '<div>首页</div>'
  },
  {
    path: '/center',
    component: '<div>个人中心</div>'
  },
  {
    path: '/about',
    component: '<div>关于</div>'
  },
]);
