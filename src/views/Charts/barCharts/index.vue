<template>
  <div>
    <div class="barCharts" ref="barCharts"></div>
  </div>
</template>

<script>
import * as echarts from "echarts";
export default {
  name: "barCharts",

  mounted() {
    let barCharts = echarts.init(this.$refs.barCharts);
    barCharts.setOption({
      title: {
        text: "本周支出与收入",
        left: "center",
      },
      tooltip: {
        show: true,
        trigger: "axis",
      },

      calculable: true,
      xAxis: [
        {
          type: "category",
          data: ["周一", "周二", "周三", "周四", "周五", "周六", "周日"],
        },
      ],
      yAxis: [
        {
          type: "value",
        },
      ],
      series: [
        {
          name: "支出",
          type: "bar",
          data: [500, 250.6, 76.7, 135.6, 162.2, 32.6, 689],
          markLine: {
            data: [{ type: "average", name: "Avg" }],
          },

          itemStyle: {
            color: "yellowgreen",
          },
        },
        {
          name: "收入",
          type: "bar",
          data: [175.6, 182.2, 48.7, 18.8, 60.0, 20.3, 100],
          markLine: {
            data: [{ type: "average", name: "Avg" }],
          },
          itemStyle: {
            color: "blue",
          },
        },
      ],
    });
  },
};
</script>

<style scoped>
/* .barCharts {
  height: 300px;
  width: 300px;
} */
.barCharts {
  height: 50vh;
  width: 100vw;
}
</style>
