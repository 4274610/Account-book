<template>
  <div id="app">
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
</style>
