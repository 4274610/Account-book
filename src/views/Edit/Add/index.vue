<template>
  <div>
    <van-popup
      v-model="show"
      position="right"
      :style="{ height: '100%', width: '100%' }"
      transition-appear
      duration="0.3"
    >
      <div class="title">
        <span class="yesorno" @click="cancel">
          <svg t="1676551117665" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2349" width="20" height="20"><path d="M493.44 152.32L448 106.88 312.32 242.56l-45.44 45.44 45.44 45.44L448 469.12l45.44-45.44L357.76 288l135.68-135.68z" fill="#2C2C2C" p-id="2350"></path><path d="M608 256H320v64h288a224 224 0 0 1 0 448H192a32 32 0 0 0 0 64h416a288 288 0 0 0 0-576z" fill="#2C2C2C" p-id="2351"></path></svg>
        </span>
        <span>新增{{ category }}类别</span>
        <span class="yesorno" @click="confirm">确认</span>
      </div>
      <!-- 新增项目 -->
      <div class="selection-container">
        <span class="selection"
          ><van-icon
            :name="defaultIcon"
            size="1.5rem"
            color="rgb(236, 107, 128)"
        /></span>
        <span class="selection"
          ><input
            v-model="value"
            type="text"
            placeholder="请输入类别(最多四个字)"
            style="border: none"
            maxlength="4"
        /></span>
      </div>
      <!-- 选择图标区域 -->
      <div class="selectionIcon">请选择图标</div>
      <van-grid :border="false">
        <van-grid-item v-for="(icon, index) in icons" :key="index">
          <van-icon
            :name="icon.name"
            size="1.7rem"
            :color="icon.color"
            @click="changeColor(icon)"
          />
        </van-grid-item>
      </van-grid>
    </van-popup>
  </div>
</template>

<script>
// import mp3 from "../../../assets/radio.aac";
import { nanoid } from "nanoid";
export default {
  name: "Add",
  data() {
    return {
      icons: [
        { name: "pending-payment", color: "inherit" },
        { name: "phone-circle-o", color: "inherit" },
        { name: "video-o", color: "inherit" },
        { name: "photo-o", color: "inherit" },
        { name: "bulb-o", color: "inherit" },
        { name: "gift-o", color: "inherit" },
        { name: "like-o", color: "inherit" },
        { name: "edit", color: "inherit" },
        { name: "points", color: "inherit" },
        { name: "bullhorn-o", color: "inherit" },
        { name: "cashier-o", color: "inherit" },
        { name: "brush-o", color: "inherit" },
        { name: "notes-o", color: "inherit" },
        { name: "flower-o", color: "inherit" },
        { name: "refund-o", color: "inherit" },
        { name: "label-o", color: "inherit" },
        { name: "gift-card-o", color: "inherit" },
        { name: "cluster-o", color: "inherit" },
        { name: "shop-o", color: "inherit" },
        { name: "bag-o", color: "inherit" },
        { name: "service-o", color: "inherit" },
        { name: "gem-o", color: "inherit" },
        { name: "setting-o", color: "inherit" },
        { name: "star-o", color: "inherit" },
      ],
      defaultIcon: "add-o",
      show: true,
      value: "", //类别名称
    };
  },
  computed: {
    category() {
      if (this.$route.query.category.type == "expense") return "支出";
      else return "收入";
    },
  },
  methods: {
    //播放音频
    // playAudio() {
      // let audio = new Audio();
      // audio.src = mp3;
      // audio.play();
    // },
    //点击事件改变颜色
    changeColor(icon) {
      // this.playAudio();
      this.icons.forEach((item) => {
        item.color = "inherit";
      });
      icon.color = "pink";
      this.defaultIcon = icon.name;
    },
    cancel() {
      this.show = false;
      this.$router.push("/accounting");
    },
    //添加类别成功后,完成按钮
    confirm() {
      if (this.value != ""&&this.defaultIcon!="add-o") {
        if (this.category == "支出") {
          let expense = JSON.parse(localStorage.getItem("expense"));
          let flag = expense.some((item) => {
            return this.value == item.text;
          });
          console.log(flag);
          if (flag) {
            this.$toast("类别不能重复");
            return          
          } else {
            let newExpenseItem = {
              id: nanoid(),
              icon: this.defaultIcon,
              text: this.value,
              color: "inherit",
              type: "expense",
            };
            //存进去
            let oldList = JSON.parse(localStorage.getItem("newExpenseItem"));
            if (oldList) {
              oldList.push(newExpenseItem);
              localStorage.setItem("newExpenseItem", JSON.stringify(oldList));
            } else {
              let newList = [];
              newList.push(newExpenseItem);
              localStorage.setItem("newExpenseItem", JSON.stringify(newList));
            }
            this.$router.push({
              path: "/accounting",
              query: { category: "expense" },
            });
          } //else的括号
        } else if (this.category == "收入") {
          let income = JSON.parse(localStorage.getItem("income"));
          let flag = income.some((item) => {
            return this.value == item.text;
          });
          console.log(flag);
          if (flag) {
            this.$toast("类别不能重复");
            return          
          } else {

          let newIncomeItem = {
            id: nanoid(),
            icon: this.defaultIcon,
            text: this.value,
            color: "inherit",
            type: "income",
          };
          //存进去
          let oldList = JSON.parse(localStorage.getItem("newIncomeItem"));
          if (oldList) {
            oldList.push(newIncomeItem);
            localStorage.setItem("newIncomeItem", JSON.stringify(oldList));
          } else {
            let newList = [];
            newList.push(newIncomeItem);
            localStorage.setItem("newIncomeItem", JSON.stringify(newList));
          }

          this.$router.push({
            path: "/accounting",
            query: { category: "income" },
          });
           } //else的括号
        }
        this.show = false;
      } else {
        this.$toast("请添加类别或选择图标");
      }
    },
  },
};
</script>

<style scoped>
.title {
  height: 10vh;
  width: 100vw;
  background-color: rgb(252, 175, 188);
  line-height: 10vh;
  text-align: center;
  display: flex;
  justify-content: space-between;
  line-height: 13vh;
  font-size:0.9rem
}
.selection-container {
  margin: 1rem;
  display: flex;
  justify-content: center;
  align-items: center;
  border-bottom: 1px solid black;
}
.selection {
  margin: 0.5rem;
}
.yesorno {
  margin-left: 1rem;
  margin-right: 1rem;
  font-size: 14px;
  color: rgb(60, 59, 59);
}
.selectionIcon {
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 2rem 0;
}
</style>
