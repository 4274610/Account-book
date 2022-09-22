<template>
  <div>
    <!-- <van-cell is-link @click="showPopup"> -->
    <van-grid :column-num="3" :border="false">
      <van-grid-item
        v-for="income in incomeItem"
        :key="income.id"
        @click="goEdit(income)"
      >
        <van-icon
          :name="income.icon"
          :color="income.color"
          size="1.5rem"
          @click="changeColor(income)"
        />
        <span>{{ income.text }}</span>
      </van-grid-item>
    </van-grid>
    <!-- </van-cell> -->
  </div>
</template>

<script>
export default {
  name: "Income",
  data() {
    return {
      incomeItem: [
        {
          id: "001",
          icon: "plus",
          text: "新增",
          color: "inherit",
          type: "income",
        },
        {
          id: "002",
          icon: "balance-o",
          text: "工资",
          color: "inherit",
          type: "income",
        },
        {
          id: "003",
          icon: "aim",
          text: "兼职",
          color: "inherit",
          type: "income",
        },
        {
          id: "004",
          icon: "certificate",
          text: "理财",
          color: "inherit",
          type: "income",
        },
        {
          id: "005",
          icon: "cash-on-deliver",
          text: "红包",
          color: "inherit",
          type: "income",
        },
      ],
      income: false,
    };
  },
   mounted() {
    this.sendNewAdd();
  },
  methods: {
    //排他
    changeColor(income) {
      this.incomeItem.forEach((item) => {
        item.color = "inherit";
      });
      income.color = "pink";
      this, (income = income);
    },
    //控制弹窗的展示
    // showPopup() {
    //   this.show = true;
    // },
    //消费明细记录弹窗关闭前的回调
    // closePopup() {
    //   console.log(123);
    // },
    //
    // newProjectObj(obj) {
    //   this.closePopup();
    // },

    goEdit(income) {
      if (income.text != "新增") {
        this.$router.push({
          path: "/edit",
          query: { category: income },

        });
      } else {
        this.$router.push({
          path: "/add",
          query: {
            category: income,
          },
        });
      }
    },
     //接收到新增的类别，添加到incomeItem数组中
    sendNewAdd() {
      if (this.$route.query) { 
       let list =JSON.parse (localStorage.getItem("newIncomeItem"))||[];
       this.incomeItem.push(...list)    
      }
    },
  },

};
</script>

<style scoped>
span {
  font-size: 0.8rem;
  margin-top: 0.5rem;
}
.van-cell__right-icon:before {
  display: none;
}
</style>
