//该文件专门用于创建整个应用的路由器
import Vue from "vue";
import VueRouter from "vue-router";
// Vue.use(VueRouter);
const VueRouterPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(to) {
  return VueRouterPush.call(this, to).catch((err) => err);
};
const VueRouterReplace = VueRouter.prototype.replace;
VueRouter.prototype.replace = function replace(to) {
  return VueRouterReplace.call(this, to).catch((err) => err);
};

let router = new VueRouter({
  routes: [
    { path: "*", redirect: "/home" },
    //账单路由
    {
      name: "Home",
      path: "/home",
      component: () => import("@/views/Home"),
      meta: { isShowFooter: true },
    },
    //月报路由
    {
      name: "Charts",
      path: "/charts",
      component: () => import("@/views/Charts"),
      meta: { isShowFooter: true },
    },
    //记账路由
    {
      name: "Accounting",
      path: "/accounting",
      component: () => import("@/views/Accounting"),
      meta: { isShowFooter: true },
    },
    //我的路由
    {
      name: "User",
      path: "/user",
      component: () => import("@/views/User"),
      meta: { isShowFooter: true },
    },
    //计算机页面
    {
      name: "Edit",
      path: "/edit",
      component: () => import("@/views/Edit"),
      meta: { isShowFooter: false },
    },
    //预算页面
    {
      name: "Budget",
      path: "/budget",
      component: () => import("@/views/Home/Budget"),
      meta: { isShowFooter: false },
    },
    //新增类别页面
    {
      name: "Add",
      path: "/add",
      component: () => import("@/views/Edit/Add"),
      meta: { isShowFooter: false },
    },
    //账单导出页面
    {
      name: "ExportFile",
      path: "/exportFile",
      component: () => import("@/views/User/exportFile"),
      meta: { isShowFooter: false },
    },
    //修改信息页面
    {
      name: "Info",
      path: "/info",
      component: () => import("@/views/User/Info"),
      meta: { isShowFooter: false },
    },
  ],
});
export default router;
