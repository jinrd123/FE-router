// 重写pushState方法
let _wrap = (type) => {
    let originFun = history[type];
    return function () {
        let result = originFun.apply(this, arguments);
        let e = new Event(type);
        e.arguments = arguments;
        window.dispatchEvent(e);
        return result;
    }
}

history.pushState = _wrap("pushState");
// history.replaceState = _wrap("replaceState");

// 给三个按钮绑定点击回调，从而可以修改url
const homeButt = document.querySelector(".home");
const centerButt = document.querySelector(".center");
const aboutButt = document.querySelector(".about");

homeButt.addEventListener("click", () => {
    history.pushState({path: "/"}, '', './');
})
centerButt.addEventListener("click", () => {
    history.pushState({path: "/center"}, '', './center');
})
aboutButt.addEventListener("click", () => {
    history.pushState({path: "/about"}, '', './about');
})

// 路由配置数组
const routes = [
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
];

// 路由匹配函数
const matchComponent = (path) => {
    const {component} = routes.find(((route) => route.path === path));
    document.querySelector(".page-content").innerHTML = component ? component : routes[0].component;
}

// 对pushState事件的监听，即点击按钮调用我们改造后的pushState方法，触发pushState事件
window.addEventListener("pushState", (e) => {
    matchComponent(e.arguments[0].path);
})

// 收尾工作，处理首屏展示 & 点击浏览器左上角的前进后退按钮问题
window.addEventListener("load", () => {
    matchComponent("/");
})

window.addEventListener("popstate", (e) => {
    if(window.history.state){
        matchComponent(window.history.state.path);
    }else {
        matchComponent("/");
    }    
})
