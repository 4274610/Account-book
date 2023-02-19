<template>
  <div>
    <div class="header">
      <van-tabs v-model="active" background="rgb(252, 175, 188)" color="black" animated swipeable  >
        <van-tab title="支出" title-style="font-weight :bold;font-size:1rem"> <Expense></Expense></van-tab>
        <van-tab title="收入" title-style="font-weight :bold;font-size:1rem"><Income></Income></van-tab>
      </van-tabs>
    </div>
  </div>
</template>

<script>
import Expense from "./Expense";
import Income from "./Income";
export default {
  name: "Accounting",
  components: { Expense, Income },
  data() {
    return {
      active: 2,
    };
  },
};
</script>

<style scoped>
.header {
  padding-top: 4vh;
  height: 10vh;
  width:100vw;
  background-color: rgb(252, 175, 188);
}
/deep/.van-tabs__wrap{
height: 6vh;
}

</style>
