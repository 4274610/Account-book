<template>
  <div >
    <div class="top">
      <div class="header">
        <span class="user" style="font-weight: bold"
          >柚子的账本 <van-icon name="description"
        /></span>
        <span><DatetimePicker @sendTime="sendTime"></DatetimePicker></span>
      </div>

      <div class="back">
        <div class="title title1">
          <span>支出</span>
          <span>收入</span>
          <span @click="displayBudget">剩余预算</span>
        </div>
        <div class="title title2">
          <span>{{ expenseTotalAndincomeTotal()[0] }}</span>
          <span>{{ expenseTotalAndincomeTotal()[1] }}</span>
          <span>{{ remainingBudget }}</span>
        </div>
      </div>
    </div>
    <!-- 没有列表数据时展示的内容 -->
<div class="noList" v-show="expenseTotalAndincomeTotal()[0]=='0.00'&&expenseTotalAndincomeTotal()[1]=='0.00'">
  <div class="noListText"><van-icon name="records" size="5rem" /></div>
 <div class="noListText">暂无数据~</div>    
</div>
    <!-- 列表开始 -->
    <div class="items"  v-show="expenseTotalAndincomeTotal()[0]!='0.00'||expenseTotalAndincomeTotal()[1]!='0.00'">
      <div v-for="(dayList, index) in accunt_newlist" :key="index">
        <ul>
          <div class="xtitle" v-if="dayList.items.length">
            <span class="outer">
              <span
                ><svg
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
                  ></path></svg
              ></span>
              <span>{{ dayList.date }}</span>
            </span>
            <span class="outer">
              <span v-show="pay(dayList.items)[0]"
                >支出&nbsp;{{ pay(dayList.items)[0] }}&nbsp;&nbsp;</span
              >
              <span v-show="pay(dayList.items)[1]"
                >收入&nbsp;{{ pay(dayList.items)[1] }}&nbsp;&nbsp;</span
              >
            </span>
          </div>
          <li v-for="(project, index) in dayList.items" :key="index">
            <!-- 明细 -->
            <van-swipe-cell>
              <div class="project">
                <div><van-icon :name="project.icon" /></div>
                <van-cell
                  :border="false"
                  :title="project.project"
                  :value="project.money"
                ></van-cell>
              </div>
              <!-- 删除 -->
              <template #right>
                <van-button square type="danger" color="grey">
                  <van-icon
                    class="smallicon"
                    name="delete-o"
                    color="white"
                    size="large"
                    @click="cancel(index, dayList)"
                  />
                </van-button>
              </template>
              <!-- 编辑 -->
              <template #left>
                <van-button square type="primary" color="grey">
                  <van-icon
                    class="smallicon"
                    name="edit"
                    color="white"
                    size="large"
                  />
                </van-button>
              </template>
            </van-swipe-cell>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Home",
  components: {
    DatetimePicker: () => import("@/views/DatetimePicker"),
  },
  data() {
    return {
      name: "柚子", //后续要获取到名字
      accunt_newlist: [],
      displayMonth: "",
      dayexpense: 0,
      dayincome: 0,
      accunt_list: [],
    };
  },
  mounted() {
    this.getAccuntData();
    this.displayDetail();
  },
  computed: {
    //剩余预算
    remainingBudget() {
      let count = Number(this.expenseTotalAndincomeTotal()[0]).toFixed(2);
      let budget = JSON.parse(localStorage.getItem("budgetValue")) - count;
      // console.log("budget",budget.toFixed(2));
      return budget.toFixed(2) || "0.00 ";
    },
  },
  methods: {
    //计算每月的总支出和总收入
    expenseTotalAndincomeTotal() {
      let expenseTotal = [];
      let incomeTotal = [];
      let expensesum = 0;
      let incomesum = 0;
      for (let k of this.accunt_newlist) {
        //得到每一项的items
        for (let i of k.items) {
          // console.log("itmes",i);//i是对象
          let obj = {};
          obj["category"] = i["category"];
          // obj["icon"]=i["icon"]
          obj["money"] = i["money"];
          // obj["project"]=i["project"]
          if (obj.category == "expense") {
            expenseTotal.push(Number(obj.money.substring(1, obj.money.length)));
            let sum = 0;
            for (let i in expenseTotal) {
              sum += expenseTotal[i];
              expensesum = sum;
            }
          } else if (obj.category == "income") {
            incomeTotal.push(Number(obj.money.substring(1, obj.money.length)));
            let sum = 0;
            for (let i in incomeTotal) {
              sum += incomeTotal[i];
              incomesum = sum;
            }
          }
        }
      }
      return [expensesum.toFixed(2), incomesum.toFixed(2)];
    },
    //删除某一项消费明细，还需要改变整个accunt_newlist数组
    cancel(index, dayList) {
      dayList.items.splice(index, 1);
      this.accunt_newlist.forEach((item) => {
        if (item.date == dayList.date) {
          item = dayList;
        }
        console.log(this.accunt_newlist);
      });
      //把这个月的全部数据删除
      let list = JSON.parse(localStorage.getItem("accuntData"));
      list = list.filter((item) => {
        if (item.date.substring(0, 7) !== this.displayMonth) {
          return true;
        }
      });
      list.push(...this.accunt_newlist);
      localStorage.setItem("accuntData", JSON.stringify(list));
      this.$toast("删除成功");
    },
    //通知剩余预算展示弹出层
    displayBudget() {
      this.$router.push({
        path: "/budget",
        query: {
          budget: this.budget(),
          remainingBudget: Number(this.remainingBudget),
        },
      });
    },
    //传给预算的值
    budget() {
      let count = this.expenseTotalAndincomeTotal()[0] - 0;
      if (Number(this.remainingBudget) != 0 && count != 0) {
        return Number(this.remainingBudget) + count;
      } else {
        return 1000;
      }
    },
    //每天的总支出和总收入
    pay(items) {
      let total_expense = 0;
      let total_income = 0;
      for (let k of items) {
        if (k.category == "expense") {
          total_expense += Number(k.money.substring(1, k.money.length));
        } else {
          total_income += Number(k.money.substring(1, k.money.length));
        }
      }
      return [total_expense, total_income];
    },
    //从本地获取消费明细
    getAccuntData() {
      this.accunt_list = JSON.parse(localStorage.getItem("accuntData")) || [];
      this.accunt_list.sort((a, b) => {
        return (
          new Date(b.date.replace(/\//g, "-")).getTime() -
          new Date(a.date.replace(/\//g, "-")).getTime()
        );
      });
    },
    //获得要展示的月份,不包含默认的月份
    sendTime(time) {
      // console.log(time, "展示该月份的数据");
      this.accunt_newlist = this.accunt_list.filter((item) => {
        return item.date.substring(0, 7) == time;
      });
      //改变了原数组，所以再次过滤就不行了,所以要生成一个新的数组
      // console.log(this.accunt_newlist);
      // localStorage.setItem("chartsData", JSON.stringify(this.accunt_newlist));
    },

    //默认展示当月的数据
    displayDetail() {
      let nowTime = new Date();
      let year = nowTime.getFullYear();
      let month = nowTime.getMonth() + 1;
      month = month < 10 ? "0" + month : month;
      this.displayMonth = `${year}/${month}`;
      this.accunt_newlist = this.accunt_list.filter((item) => {
        return item.date.substring(0, 7) == this.displayMonth;
      });
      // console.log(this.accunt_newlist);
      // localStorage.setItem("chartsData", JSON.stringify(this.accunt_newlist));
    },
    //展示内存的显示月份的数据
    // localTime() {
    //   this.$nextTick(() => {
    //     let time = JSON.parse(localStorage.getItem("chartsTime"));
    //     this.accunt_newlist = this.accunt_list.filter((item) => {
    //       return item.date.substring(0, 7) == time;
    //     });
    //   });

    //   localStorage.setItem("chartsData", JSON.stringify(this.accunt_newlist));
    // },
  },
};
</script>

<style scoped>
.smallicon {
  margin-bottom: 10px;
}

.top {
  position: fixed;
  top: 0rem;
  width: 100vw;
  height: 20vh;
  z-index: 999;
}
.header {
  color: rgb(118, 113, 113);
  display: flex;
  padding: 3rem 1rem 1rem 1rem;
  justify-content: space-between;
  font-size: 18px;
}
.back {
  background-color: pink;
  border-radius: 1rem;
  height: 5rem;
}
.title {
  display: flex;
  /* padding: 0.5rem; */
  text-align: center;
}
.title1 {
  font-size: 0.8rem;
  height: 2.5rem;
  line-height: 2.5rem;
}
.title2 {
  font-size: 1.2rem;
  height: 2.5rem;
  /* line-height:3rem; */
}
.title span {
  flex: 1;
}
.xtitle {
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid rgb(244, 97, 122);
  width: 96vw;
  margin: 0.5rem auto;

  /* margin-bottom:1rem */
}
.xtitle .outer {
  margin: 0.6rem 0.6rem 0 0.6rem;
  font-size: 0.5rem;
}

.project {
  display: flex;
  margin-left: 1rem;
  margin-right: 1rem;
  align-items: center;
}
.van-cell {
  padding: 0.3rem;
}
.items {
  height: 65vh;
  overflow: auto;
  margin-top: 11rem;
  margin-bottom: 5rem;
}
.noList{ 
  width: 100vw;
  margin-top: 20rem; 
} 
.noListText{
display: flex;
justify-content: center;
align-items: center;
color:rgb(182, 179, 179)
}

</style>
