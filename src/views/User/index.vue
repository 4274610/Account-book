<template>
  <div class="container">
 <div class="header">我的 </div>
  <div class="headportrait first" >头像</div>
    <div class="user">
      <van-cell-group inset>
        <van-cell title="修改信息" value="内容" size="large" ><van-icon name="arrow" /></van-cell>
        <van-cell title="账单导出" value="内容" size="large" @click="goExportFile"><van-icon name="arrow" /></van-cell>
        <van-cell title="统计分析" value="内容" size="large" ><van-icon name="arrow" /></van-cell>
        <van-cell title="收支类别" value="内容" size="large" ><van-icon name="arrow" /></van-cell>
      </van-cell-group>
      <van-cell-group inset>
        <van-cell title="绑定手机号" value="" size="large" />
        <van-cell title="绑定邮箱" value="" size="large" />
        <van-cell title="修改密码" value="" size="large" />
      </van-cell-group>
      <van-cell-group inset>
        <van-cell title="退出登录"  size="large" />
      </van-cell-group>
    </div>
  </div>
</template>

<script>
export default {
  name: "User",
  data(){
    return {
     selectTime:"2022/09/01",
     selectTime2:"2022/09/31"
    }
  },
  methods:{
    goExportFile(){
      this.$router.push("/exportFile")
    }
  },
 
  
};
</script>

<style scoped>
.first{
  background-color: antiquewhite;
  margin-top: 1rem;
  width:90%;
  height: 9rem;
}
.user {
  width: 100vw;
  height: 100vh;
  background-color: #eee;
}
.van-cell-group--inset {
  margin: 7px 5px;
}
.van-cell--large .van-cell__title {
  text-align: left;
}
.header{
height:10vh;
width:100vw;
background-color: pink;
display: flex;
justify-content: center;
align-items: center;
}
.van-cell-group--inset[data-v-bc0b5f70]{
  margin-top: 0;
}
</style>
