<template>
  <div>
    <div class="header">收支总览</div>

    <div class="title time">
      <DatetimePicker @sendTime="sendTime"></DatetimePicker>
    </div>

    <div v-if="show">
      <div @click="showIncome" class="title text">
        支出<svg
          t="1663144546629"
          class="icon"
          viewBox="0 0 1024 1024"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          p-id="2444"
          width="14"
          height="11"
        >
          <path
            d="M511.999488 819.413462 72.8374 204.586538 951.1626 204.586538Z"
            p-id="2445"
            fill="#E0617A"
          ></path>
        </svg>
        
      </div>
       
      <PeiCharts :times="times"></PeiCharts>
    </div>

    <div v-else>
      <div @click="showExpense" class="title text">
        收入<svg
          t="1663144546629"
          class="icon"
          viewBox="0 0 1024 1024"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          p-id="2444"
          width="14"
          height="11"
        >
          <path
            d="M511.999488 819.413462 72.8374 204.586538 951.1626 204.586538Z"
            p-id="2445"
            fill="#E0617A"
          ></path>
        </svg>
      </div>
      <IncomePei :times="times"></IncomePei>
    </div>
  </div>
  <!-- <BarCharts></BarCharts>     -->
</template>
<script>
import DatetimePicker from "@/views/DatetimePicker";
import BarCharts from "@/views/Charts/barCharts";
import PeiCharts from "@/views/Charts/peiCharts";
import IncomePei from "@/views/Charts/incomePei"
export default {
  name: "Charts",
  components: {
    DatetimePicker,
    BarCharts,
    PeiCharts,
    IncomePei
  },
  data() {
    return {
      show: true,
      times: "",
    };
  },
  methods: {
    showIncome() {
      this.show = false;
      this.$bus.$emit("showTime",this.times)
    },
    showExpense() {
      this.show = true;
    },
    //获得要展示的月份的数据
    sendTime(time) {
      this.times = time;
      // console.log("time",time);
      // localStorage.setItem("chartsTime",JSON.stringify (time))
    },
  },
};
</script>

<style scoped>
.header {
  height: 10vh;
  width: 100vw;
  background-color: rgb(252, 175, 188);
  display: flex;
  justify-content: center;
  /* align-items: center; */
  line-height: 13vh;
  font-weight :bold;
  font-size:1rem
}
.title {
  display: flex;
  justify-content: center;
  align-items: center;
  
}
.text {
  font-weight: bold;
  font-size: 20px;
}
.time {
  margin-top: 1rem;
  margin-bottom: 0.5rem;
}
/deep/.time span {
  font-size: 16px;
}


</style>
