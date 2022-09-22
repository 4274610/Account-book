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
          <svg
            t="1663239639867"
            class="icon"
            viewBox="0 0 1024 1024"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            p-id="11904"
            width="18"
            height="16"
          >
            <path
              d="M257.2 567.1h584.5c29 0 52.5-23.4 52.5-52.2V512c0-28.8-23.5-52.2-52.5-52.2H255.9L431 284.1c20.2-20.3 20.2-53 0-73.3l-0.4-0.4c-20.2-20.3-53.1-20.5-73.6-0.5l-0.5 0.5L71.8 496.1a26.013 26.013 0 0 0 0 36.7l55.7 55.9L352 813.8c20.4 20.5 53.7 20.6 74.3 0.4l0.4-0.4 1.7-1.7c20.3-20.3 20.3-53.1 0-73.4L257.2 567.1z"
              p-id="11905"
              fill="#5A5A5A"
            ></path>
          </svg>
        </span>
        <span>新增{{ category }}类别</span>
        <span class="yesorno" @click="confirm">完成</span>
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
            autofocus
            style="border: none"
            maxlength="4"
        /></span>
      </div>
      <!-- 选择图标区域 -->
      <van-grid :border="false">
        <van-grid-item v-for="(icon, index) in icons" :key="index">
          <van-icon
            :name="icon.name"
            size="1.5rem"
            :color="icon.color"
            @click="changeColor(icon)"
          />
        </van-grid-item>
      </van-grid>
    </van-popup>
  </div>
</template>

<script>
import mp3 from "../../../assets/音效.aac";
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
      value: "",
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
    playAudio() {
      let audio = new Audio();
      audio.src = mp3;
      audio.play();
    },
    //点击事件改变颜色
    changeColor(icon) {
      this.playAudio();
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
      if (this.value != "") {      
        if(this.category=="支出"){     
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
          }else{
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
          }
         this.show = false;
      } else {
        this.$toast("还没有添加类别")}
      }
  },
};
</script>

<style scoped>
.title {
  height: 10vh;
  width: 100vw;
  background-color: pink;
  line-height: 10vh;
  text-align: center;
  display: flex;
  justify-content: space-between;
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
</style>
