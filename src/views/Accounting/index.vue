<template>
  <div>
    <div class="header">
      <van-tabs v-model="active" background="pink" color="black" animated swipeable  >
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
  padding-top: 3.5vh;
  height: 10vh;
  width:100vw;
  background-color: pink;
}

</style>
