<template>
  <div class="container">
    <van-popup
      v-model="show"
      @click-overlay="goHome"
      @click-close-icon="goHome"
      :style="{ height: '20%', width: '80%' }"
      closeable
      close-icon="success"
      close-icon-position="bottom-right"
      transition-appear
    >
      <!-- 内容 -->
      <div class="content">
        <van-cell-group>
          <van-field
            v-model="value"
            label="每月预算为"
            placeholder="请输入金额(元)"
          />
        </van-cell-group>
        <!-- 进度条 -->
        <van-progress
          :percentage="percentage"
          :pivot-text='percentage+"%"'
          pivot-color="rgb(173, 26, 51)"
          color="linear-gradient(to right,pink, rgb(236, 94, 117))"
          stroke-width="20"
        />
      </div>
    </van-popup>
  </div>
</template>

<script>
export default {
  name: "Budget",
  data() {
    return {
      show: true,
      value: this.$route.query.budget,
    };
  },
  computed: {
    percentage() {    
     let userMoney= 100
     if(this.$route.query.remainingBudget>0){
    userMoney= ((this.$route.query.budget - this.$route.query.remainingBudget) /this.$route.query.budget) * 100}
    else{userMoney= "100"}
    return userMoney
    },
  },
  methods: {
    goHome() {
      this.$router.push({
        name: "Home",
        query: { budgetValue: this.budgetValue() },
      });
    },
    budgetValue() {
      localStorage.setItem("budgetValue", this.value);
    },
  },
};
</script>

<style scoped>

.content {
  margin-top: 5vh;

}
img {
  height: 30vh;
  width: 50vw;
}
</style>
