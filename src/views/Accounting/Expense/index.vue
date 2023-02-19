<template>
  <!-- 点击弹窗 -->
  <div class="all">
    <!-- <van-cell is-link @click="showPopup"> -->
      <van-grid :column-num="4" :border="false">
        <van-grid-item
          v-for="expense in expenseItem"
          :key="expense.id"
          @click="goEdit(expense)"
        >
          <van-icon
            :name="expense.icon"
            :color="expense.color"
            size="1.5rem"
            @click="changeColor(expense)"
          />
          <span>{{ expense.text }}</span>
        </van-grid-item>
      </van-grid>
    <!-- </van-cell> -->
  </div>
</template>

<script>
export default {
  name: "Expense",
  data() {
    return {
      expenseItem: [
        {
          id: "0001",
          icon: "plus",
          text: "新增",
          color: "inherit",
          type: "expense",
        },
        {
          id: "0002",
          icon: "birthday-cake-o",
          text: "餐饮",
          color: "inherit",
          type: "expense",
        },
        
        {
          id: "0003",
          icon: "goods-collect-o",
          text: "娱乐",
          color: "inherit",
          type: "expense",
        },
        {
          id: "0004",
          icon: "phone-o",
          text: "通讯",
          color: "inherit",
          type: "expense",
        },
        {
          id: "0005",
          icon: "star-o",
          text: "日用",
          color: "inherit",
          type: "expense",
        },
        {
          id: "0006",
          icon: "hot-sale-o",
          text: "购物",
          color: "inherit",
          type: "expense",
        },
        {
          id: "0007",
          icon: "fire-o",
          text: "水电",
          color: "inherit",
          type: "expense",
        },
        {
          id: "0008",
          icon: "like-o",
          text: "美容",
          color: "inherit",
          type: "expense",
        },
        {
          id: "0009",
          icon: "friends-o",
          text: "礼金",
          color: "inherit",
          type: "expense",
        },
        {
          id: "0010",
          icon: "free-postage",
          text: "快递",
          color: "inherit",
          type: "expense",
        },
        {
          id: "0011",
          icon: "wap-home-o",
          text: "住房",
          color: "inherit",
          type: "expense",
        },
        {
          id: "0012",
          icon: "logistics",
          text: "交通",
          color: "inherit",
          type: "expense",
        },
        {
          id: "0013",
          icon: "gift-o",
          text: "礼物",
          color: "inherit",
          type: "expense",
        },
        {
          id: "0014",
          icon: "chat-o",
          text: "社交",
          color: "inherit",
          type: "expense",
        },
        
          {
          id: "0015",
          icon: "failure",
          text: "服饰",
          color: "inherit",
          type: "expense",
        },
         {
          id: "0016",
          icon: "closed-eye",
          text: "美妆",
          color: "inherit",
          type: "expense",
        },
        {
          id: "0017",
          icon: "bulb-o",
          text: "医疗",
          color: "inherit",
          type: "expense",
        },
        {
          id: "0018",
          icon: "desktop-o",
          text: "电器",
          color: "inherit",
          type: "expense",
        },
        {
          id: "0019",
          icon: "hotel-o",
          text: "家居",
          color: "inherit",
          type: "expense",
        },
        {
          id: "0020",
          icon: "good-job-o",
          text: "健身",
          color: "inherit",
          type: "expense",
        },
      ],
      // show: false,
      expense: false,
      money: "",
    };
  },
  mounted() {
    this.sendNewAdd();
  },
  methods: {
    //排他
    changeColor(expense) {
      // this.$audio.playAudio()
      this.expenseItem.forEach((item) => {
        item.color = "inherit";
      });
      expense.color = "pink";
      this.expense = expense;
    },
    //控制弹窗的展示
    // showPopup() {
    //   this.show = true;
    // },
    goEdit(expense) {
      if (expense.text != "新增") {
        this.$router.push({
          path: "/edit",
          query: { category: expense },

        });
      } else {
        this.$router.push({
          path: "/add",
          query: {
            category: expense,
          },
        });
      }
    },
    //接收到新增的类别，添加到expenseItem数组中
    sendNewAdd() {
      if (this.$route.query) { 

       let list =JSON.parse (localStorage.getItem("newExpenseItem"))||[];
       this.expenseItem.push(...list)    
      }
      localStorage.setItem("expense",JSON.stringify (this.expenseItem))
    },
  },
};
</script>

<style scoped>
span {
  font-size: 0.8rem;
  margin-top: 0.5rem;
}
.all {
  height: 90vh;
  width: 100vw;
}

.van-cell__right-icon:before {
  display: none;
}
</style>
