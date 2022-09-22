import Vue from 'vue'
import App from './App.vue'
import JsonExcel from 'vue-json-excel'
Vue.component('downloadExcel', JsonExcel)


import { Tabbar, TabbarItem,Icon ,DatetimePicker,Popup} from 'vant';
import { Tab, Tabs } from 'vant';
import { Grid, GridItem } from 'vant';
import { Cell, CellGroup } from 'vant';
import { Divider } from 'vant';
import { Calendar } from 'vant';
import { Dialog } from 'vant';
import { Field } from 'vant';
import { Badge } from 'vant';
import { Toast } from 'vant';
import { SwipeCell } from 'vant';
import { Button } from 'vant';
import { DropdownMenu, DropdownItem} from 'vant';
import { Overlay } from 'vant';
import { Circle } from 'vant';
import { Progress } from 'vant';
import { RadioGroup, Radio } from 'vant';
import { Collapse, CollapseItem } from 'vant';

Vue.use(Collapse);
Vue.use(CollapseItem);
Vue.use(Radio);
Vue.use(RadioGroup);
Vue.use(Progress);
Vue.use(Circle);
Vue.use(Overlay);

Vue.use(DropdownMenu);
Vue.use(DropdownItem);
Vue.use(Button);
Vue.use(SwipeCell);
Vue.use(Toast);

Vue.use(Badge);
Vue.use(Field);
Vue.use(Dialog);
Vue.use(Calendar)
Vue.use(Divider);
Vue.use(Cell);
Vue.use(CellGroup);
Vue.use(Grid);
Vue.use(GridItem);
Vue.use(Tabbar);
Vue.use(TabbarItem);
Vue.use(Icon);
Vue.use(DatetimePicker);
Vue.use(Popup);
Vue.use(Tab);
Vue.use(Tabs);
//引入路由器
import router from "./router";
import VueRouter from 'vue-router';
Vue.use(VueRouter)
//注册footer为全局组件
// import Footer from '@/components/Footer'
// Vue.component("Footer",Footer)
import * as audio from "./views/clickAudio"
Vue.config.productionTip = false
new Vue({
  render: h => h(App),
  router,
  beforeCreate(){
    Vue.prototype.$bus=this //安装全局事件总线,vm、所有的vc都能看见它
    Vue.prototype.$audio=audio
  }
}).$mount('#app')
 