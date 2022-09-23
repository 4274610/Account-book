<template>
  <div>
    <van-cell  :value="date" @click="show = true" />
    <van-calendar
     :show-confirm="false"
      v-model="show"
      @confirm="onConfirm"
      color="pink"
      :min-date="min"
      :max-date="max"
      :show-mark="false" 
      :round="false"
      :show-title="false" 
      :style="{ height:'50vh' }"
      
    />
  </div>
</template>
<script>
export default {
  name: "AcountingDate",
  data() {
    return {
      date: "", //选中的日期
      show: false,
      min: new Date(2001, 1, 1),
      max:new Date(),
    };
  },
  
  methods: {
    //默认展示的日期
    gettodayTime(){
      let nowTime = new Date();
      let year = nowTime.getFullYear();
      let month = nowTime.getMonth() + 1;
      month=month<10?"0"+month:month;
      let day = nowTime.getDate();  
      day=day<10?"0"+day:day;
      this.date = `${year}/${month}/${day}`
    },
    //调整日期格式
    formatDate(date) {
      let month= date.getMonth() + 1
      let day=date.getDate()
      month=month<10?"0"+month:month;
      day=day<10?"0"+day:day;
      return `${date.getFullYear()}/${month}/${day}`;
    },
   //日期选择完成后会触发 confirm 事件，外面展示选中的日期
    onConfirm(date) { 
      this.date = this.formatDate(date);
      this.show = false;   
      this.$emit('selectedTime',this.date)
    },
  
  },
 
  mounted(){
     this.gettodayTime()   
  },

};
</script>

<style scoped>
.van-cell{
    padding:0;
    line-height: 12px;
}

</style>
