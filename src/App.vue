<template>
  <div id="app"  @touchmove.prevent>
    <!-- 路由组件出口的地方 -->
    <router-view/>
    <footerNavbar v-if="$route.meta.isShowFooter"></footerNavbar>
  </div>
</template>

<script>
import footerNavbar from "@/components/Footer/index.vue";
export default {
  name: "App",
  components: {
    footerNavbar,
  },
};
</script>

<style>
#app {
  /* font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50; */
  /* margin-top: 30px; */
}
body {
    padding-top: constant(safe-area-inset-top);
    padding-top: env(safe-area-inset-top);
    padding-bottom: constant(safe-area-inset-bottom);
    padding-bottom: env(safe-area-inset-bottom);
    padding-left: constant(safe-area-inset-left);
    padding-left: env(safe-area-inset-left);
    padding-right: constant(safe-area-inset-right);
    padding-right: env(safe-area-inset-right);
}
</style>
