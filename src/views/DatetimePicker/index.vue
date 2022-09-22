<template>
  <div>
    <span>
    <van-cell is-link @click="showPopup">
      <div class="time">
    <span>{{ currentDate }}</span>
      <van-icon name="arrow-down" />
      </div>
    </van-cell>
    </span>
    <van-popup v-model="show" position="bottom"  style="height:40vh">
      <van-datetime-picker
        :value="currentDate"
        type="year-month"
        title="选择年月"
        :min-date="minDate"
        :max-date="maxDate"
        :formatter="formatter"
        @confirm="getSelectMonthAndYear"
        @cancel="cancel"
       
      />
    </van-popup>
  </div>
</template>

<script>
export default {
  name: "DatetimePicker",
  data() {
    return {
      minDate: new Date(2022, 0, 1),
      maxDate: new Date(2100, 10, 1),
      currentDate: "",
      show: false,
    };
  },
  methods: {
    showPopup() {
      this.show = true;
    },
    formatter(type, val) {
      if (type === "year") {
        return `${val}`;
      } else if (type === "month") {
        return `${val}`;
      }
      return val;
    },
    //默认展示的时间
    gettodayMonthAndYear(){
      let nowTime = new Date();
      let year = nowTime.getFullYear();
      let month = nowTime.getMonth() + 1;
      month=month<10?"0"+month:month;
      this.currentDate = `${year}/${month}`
      localStorage.setItem("chartsTime",this.currentDate)
    },
    //选中的时间和确认按钮的回调
    getSelectMonthAndYear(value){
      let year = value.getFullYear();
      let month = value.getMonth() + 1;
      month=month<10?"0"+month:month;
      let result=`${year}/${month}`
      // console.log("value",value,result);
      this.currentDate=result
      this.show=false
      //把选中的时间传给父组件
      this.$emit("sendTime",this.currentDate)
      localStorage.setItem("chartsTime",this.currentDate)
    },
    //取消按钮的回调
    cancel(){
      this.show=false
    },
  },
  mounted(){
    this.gettodayMonthAndYear()
  }
};
</script>

<style scoped>
.van-popup {
  height: 30%;
  width: 100%;
}
.van-cell__right-icon {
  display: none;
}
/* .time{
  margin-top:1rem ;
} */

.van-cell{
  padding: 0;
  /* line-height: 0; */
}

</style>
