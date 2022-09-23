<template>
  <div class="container">
 <div class="header"> 
  <div class="headportrait">
    <van-image
  round
  width="4rem"
  height="4rem"
  :src="img"
/></div>
  <div class="nickname"> 早上好：{{nickname}}</div>

 </div>

    <div class="user ">
      <van-cell-group inset>
        <van-cell title="修改信息" value="内容" size="large" @click="goInfo"><van-icon name="arrow" /></van-cell>
        <van-cell title="账单导出" value="内容" size="large" @click="goExportFile"><van-icon name="arrow" /></van-cell>
        <van-cell title="统计分析" value="内容" size="large" ><van-icon name="arrow" /></van-cell>
        <!-- <van-cell title= "收支类别" value="内容" size="large" ><van-icon name="arrow" /></van-cell> -->
      </van-cell-group>
      <van-cell-group inset>
        <van-cell title="绑定手机号" value="" size="large" />
        <van-cell title="绑定邮箱" value="" size="large" />
        <van-cell title="修改密码" value="" size="large" />
      </van-cell-group>
      <van-cell-group inset>
        <van-cell title="退出登录"  size="large" ><van-icon name="arrow" /></van-cell>
      </van-cell-group>
    </div>
  </div>
</template>

<script>
export default {
  name: "User",
  data(){
    return {
     nickname:"COCO",
     img:"https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fc-ssl.duitang.com%2Fuploads%2Fitem%2F202006%2F21%2F20200621031631_lggnn.thumb.400_0.png&refer=http%3A%2F%2Fc-ssl.duitang.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1666517578&t=b26be4463c31e69c4076d4cbf841dc56",

    }
  },
  methods:{
    goExportFile(){
      this.$router.push("/exportFile")
    },
    goInfo(){
       this.$router.push({path:"/info",query:{nickname:this.nickname}})
    //传数据给info页面
      // this.$bus.$emit("sendInfo",this.nickname)
      // console.log(this.img);
    },



  },
 
  
};
</script>

<style scoped>
.header {
  height: 30vh;
  width: 100vw;
   background:linear-gradient(to bottom, rgb(250, 163, 177),pink 85% );
   position: fixed;
   top:0;
}
.headportrait{
  width: 4rem;
  height: 4rem;
  border-radius:50% ;
  background-color: white;
  position: relative;
  top: 3rem;
  left: 2rem;
}
.nickname{
/* margin-top: 1rem; */
/* margin-left: 7rem; */
position: relative;
  top: 0.5rem;
  left: 7rem;
}
.user {
  margin-top: 10rem;
  width: 100vw;
  height: 70vh;
  background-color: #eee;
}
.van-cell-group--inset {
  margin: 7px 5px;
}
.van-cell--large .van-cell__title {
  text-align: left;
}
.van-cell-group--inset[data-v-bc0b5f70]{
  margin-top: 0;
}
</style>
