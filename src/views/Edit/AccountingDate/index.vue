<template>
  <div>
    <!-- 弹出层 -->
    <van-cell is-link @click="showPopup">{{ date }} <van-icon name="arrow-down" /></van-cell>
    <van-popup v-model="show"  position="bottom" :style="{ height: '45vh' }">
      <van-datetime-picker
        v-model="currentDate"
        type="date"
        title="选择年月日"
        :min-date="minDate"
        :max-date="maxDate"
        @cancel="cancel"
        @confirm="confirm"
      />
    </van-popup>
  </div>
</template>

<script>
export default {
  name: "AccountingDate",
  data() {
    return {
      show: false,
      currentDate: "",
      maxDate: new Date(2025, 10, 1), 
      minDate: new Date(1990, 0, 1),
      date:"",
    };
  },
  mounted() {
    this.gettodayTime();
  },

  methods: {
    showPopup() {
      this.show = true;
      this.currentDate = new Date();
    },
    //调整日期格式
    formatDate(date) {
      let month = date.getMonth() + 1;
      let day = date.getDate();
      month = month < 10 ? "0" + month : month;
      day = day < 10 ? "0" + day : day;
      return `${date.getFullYear()}/${month}/${day}`;
    },
    //默认展示的日期
    gettodayTime() {
      let nowTime = new Date();
      let year = nowTime.getFullYear();
      let month = nowTime.getMonth() + 1;
      month = month < 10 ? "0" + month : month;
      let day = nowTime.getDate();
      day = day < 10 ? "0" + day : day;
    //   this.currentDate = `${year}/${month}/${day}`;
      this.date=`${year}/${month}/${day}`
    },
    // 确认按钮，时间下拉选择事件
    confirm(time) {
       this.date = this.formatDate(time);
      this.show = false;
      this.$emit("selectedTime", this.date);
    },
    //取消按钮
    cancel() {
      this.show = false;
      this.showmattertime = false
      this.gettodayTime()
    },
  },
};
</script>

<style scoped>
/deep/.van-cell__right-icon::before {
    display: none;
}
</style>
