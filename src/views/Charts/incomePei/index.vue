<template>
  <div>
    <!-- 饼图 -->
    <div class="peiCharts" ref="peiCharts"></div>
  </div>
</template>

<script>
import * as echarts from "echarts";
export default {
  name: "IncomePei",
  props: ["times"],
  data() {
    return {
      chart_time: localStorage.getItem("chartsTime"),
      chartsData: JSON.parse(localStorage.getItem("accuntData")), //数组
      outArr: [],
      total:0,
    };
  },
  methods: {
    //默认展示的月份,应该是从支出那里传过来的时间
    // gettodayMonthAndYear() {
        // let nowTime = new Date();
        // let year = nowTime.getFullYear();
        // let month = nowTime.getMonth() + 1;
        // month = month < 10 ? "0" + month : month;
        // let defaultTime = `${year}/${month}`;
      // if(this.times!=defaultTime){
        // this.chart_time=defaultTime
      // }else     
      // { 
        // this.chart_time=this.times
      // }
      
    // },
    //饼图的数据
    peiChartsData() {
      let category = []; //数组里对象
      this.chartsData.forEach((i) => {
        this.outArr = [];
        // console.log('i.date',i.date)
        if (i.date.substring(0, 7) == this.chart_time) {
          category.push(...i.items);
        }
      });
      // console.log("category",category);
      category = category.filter((item) => {
        if (item.category == "income") return true;
      });
      let nameArr = [...new Set(category.map((i) => i.project))];
      // console .log("nameArr",nameArr);
      let list = [];
      nameArr.forEach((v) => {
        let filterlist = category.filter((a) => v == a.project);
        //把明细相同的放到同一个数组中
        list.push(filterlist);
        // console.log("list", list);
      });
      //求出明细相同的总和
      list.forEach((item, index) => {
        let moneyAdd = item.reduce((total, g) => {
          return total + Number(g.money);
        }, 0);
        this.outArr.push({
          value: moneyAdd,
          name: nameArr[index],
        });
      });
      let moneyTotal =0
      for(let k of this.outArr){
       moneyTotal+=k.value
       this.total=moneyTotal.toFixed(2)+"元"
      }
    },
    //饼图
    charts() {
      let _this = this;
      let option = {
         title: {
         subtext:"本月收入"+this.total,
         left: 'center'  
         },
        toolbox: {
          right: 10,
          feature: {
            magicType: {
              type: ["pei", "bar"],
            },
            restore: {}, //还原
            saveAsImage: {}, //保存为图片
          },
        },
        tooltip: {
          trigger: "item",
          formatter: "{a}{b} : {c}元 &nbsp; ({d}%)",
        },
        legend: {
          type: "scroll",
          textStyle: {
            rich: {
              name: {
                align: "left",
                width: 90,
                fontSize: 15,
                // padding: [0, 5, 0, 5],
              },
              value: {
                align: "center",
                width: 90,
                fontSize: 14,
                padding: [0, 0, 0, 0],
              },
              count: {
                align: "right",
                width: 110,
                fontSize: 14,
                padding: [0, 10, 0, 0],
              },
            },
          },
          handletextpad: 15,
          itemGap: 15, //设置图例之间的间距
          orient: "vertical",
          left: "7%",
          top: "45%",
          itemWidth: 15, // 设置宽度
          itemHeight: 15, // 设置高度
          formatter: function (name) {
            let data = _this.outArr;
            // let data = option.series[0].data;
            // console.log(data, "data");
            var total = 0;
            var target;
            for (var i = 0, l = data.length; i < l; i++) {
              total += data[i].value;
              if (data[i].name == name) {
                target = data[i].value;
              }
            }
            let p = ((target / total) * 100).toFixed(2);
            return (
              "{name| " +
              name +
              "}  " +
              "{value| " +
              p +
              "%}" +
              "{count|" +
              target.toFixed(2) +
              "}"
            );
          },
        },
        series: [
          {
            data: this.outArr,
            name: "",
            type: "pie",
            radius: ["30%", "70%"],
            center: ["83%", "40%"],
            width: "60%",
            height: "60%",
            avoidLabelOverlap: false,
            itemStyle: {
              borderRadius: 4,
              borderColor: "#fff",
              borderWidth: 2,
            },
            label: {
              show: false,
              position: "center",
            },
            emphasis: {
              label: {
                show: true,
                fontSize: "16",
                fontWeight: "bold",
              },
            },
            labelLine: {
              show: false,
            },
          },
        ],
      };
      this.peiCharts = echarts.init(this.$refs.peiCharts);
      this.peiCharts.setOption(option);
    },
  },
  watch: {
    times(newVal, oldVal) {
      this.chart_time = newVal;
      console.log("incomenewVal", this.chart_time);
      this.peiChartsData();
      this.peiCharts.setOption({
         title:{subtext:"本月支出"+this.total},
        series: { data: this.outArr },
      });
    },

    deep: true,
    immediate: true,
  },
  // beforeMount() {
  //     this.gettodayMonthAndYear();
  // },
  mounted() {
    this.peiChartsData();
    this.charts();
  },
};
</script>

<style scoped>
.peiCharts {
  height: 72vh;
  width: 100vw;
  overflow: auto;
}
.noList {
  width: 100vw;
  margin-top: 5rem;
}
.noListText {
  display: flex;
  justify-content: center;
  align-items: center;
  color: rgb(182, 179, 179);
}
</style>
