<template>
  <div>

    <van-tabbar
      v-model="active"
      active-color="rgb(249, 146, 164)"
      inactive-color="#000"  
      route
    >
      <van-tabbar-item icon="records" replace to="/home">账单</van-tabbar-item>
      <van-tabbar-item icon="add-o" to="/accounting">记账</van-tabbar-item>
      <van-tabbar-item icon="chart-trending-o" replace to="/charts">月报</van-tabbar-item>
      <!-- <van-tabbar-item icon="gold-coin-o" replace to="/saveMoney">存钱</van-tabbar-item> -->
      <van-tabbar-item icon="contact" replace to="/user">我的</van-tabbar-item>
    </van-tabbar>
  </div>

</template>

<script>
export default {
  name: "footerNavbar",
  data() {
    return {
      active: 0,
    };
  },
  
};
</script>

<style scoped>
.footer {
  display: flex;
  justify-content: space-between;
  /* position: fixed;
  left: 0;
  bottom: 0; */
  background-color: #eee;
  /* background-color:rgb(249, 146, 164); */
  
  height:10vh
}
.footer button {
  display: flex;
  justify-content: space-between;
}

.van-tabbar{
  height:7vh
}
</style>
