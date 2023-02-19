<template>
  <div class="container">
    <div class="header">
      <div class="headportrait">
        <!-- <van-image
  round
  width="4rem"
  height="4rem"
  :src="img"
/> -->
        <van-uploader
          v-model="fileList"
          multiple
          :max-count="1"
          :max-size="1024 * 1024"
          @oversize="onOversize"
        />
      </div>
      <div class="nickname">{{ greetings }}&nbsp;!&nbsp;{{ nickname }}</div>
    </div>

    <div class="user">
      <van-cell-group inset>
        <van-cell title="修改信息" value="内容" size="large" @click="goInfo"
          ><van-icon name="arrow"
        /></van-cell>
        <van-cell title="ID" :value="ID" size="large" />
        <van-cell title="绑定手机号" :value="showPhone" size="large" />
        <van-cell title="绑定邮箱" :value="showEmail" size="large" />
        <van-cell
          title="账单导出"
          value="内容"
          size="large"
          @click="goExportFile"
          ><van-icon name="arrow"
        /></van-cell>
        <!-- <van-cell title="统计分析" value="内容" size="large"
          ><van-icon name="arrow"
        /></van-cell> -->
        <!-- <van-cell title= "收支类别" value="内容" size="large" ><van-icon name="arrow" /></van-cell> -->
        <!-- </van-cell-group> -->
        <!-- <van-cell-group inset> -->

        <!-- <van-cell title="修改密码" value="" size="large" /> -->
      </van-cell-group>
      <van-cell-group inset>
        <van-cell title="退出登录" size="large"
          ><van-icon name="arrow"
        /></van-cell>
      </van-cell-group>
    </div>
  </div>
</template>

<script>
import { nanoid } from "nanoid";
export default {
  greetings: "",
  name: "User",
  data() {
    return {
      greetings: "",
      nickname: this.$route.query.nickname,
      fileList: [
      //   {
      //   url: 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fc-ssl.duitang.com%2Fuploads%2Fitem%2F202006%2F21%2F20200621031631_lggnn.thumb.400_0.png&refer=http%3A%2F%2Fc-ssl.duitang.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1666517578&t=b26be4463c31e69c4076d4cbf841dc56',
      // }
      ],
     
      truePhone: "",
      trueEmail: "",
    };
  },
  methods: {
    goExportFile() {
      this.$router.push("/exportFile");
    },
    goInfo() {
      this.$router.push({
        path: "/info",
        query: {
          nickname: this.nickname,
          truePhone: this.truePhone,
          trueEmail: this.trueEmail,
        },
      });
      //传数据给info页面
      // this.$bus.$emit("sendInfo",this.nickname)
      // console.log(this.img);
    },
    onOversize(file) {
      console.log(file);
      this.$toast("文件大小不能超过 500kb");
    },
    // 问候语
    getTimeState() {
      let timeNow = new Date();
      let hours = timeNow.getHours();
      if (hours >= 0 && hours <= 10) {
        this.greetings = ` 早上好`;
      } else if (hours > 10 && hours <= 11) {
        this.greetings = ` 上午好`;
      } else if (hours > 11 && hours <= 13) {
        this.greetings = ` 中午好`;
      } else if (hours > 13 && hours <= 18) {
        this.greetings = ` 下午好`;
      } else if (hours > 18 && hours <= 24) {
        this.greetings = ` 晚上好`;
      }
    },
  },
  computed: {
    showPhone() {
      let personInfo = JSON.parse(localStorage.getItem("personInfo"));
      if (personInfo) {
        let start = personInfo.phone.slice(0, 3);
        let end = personInfo.phone.slice(7);
        return start + "****" + end;
      } else {
        return "还未绑定";
      }
    },
    ID() {
      return nanoid().slice(0, 10);
    },
    showEmail() {
      let personInfo = JSON.parse(localStorage.getItem("personInfo"));
      if (personInfo) {
        let start = personInfo.email.slice(0, 3);
        let end = personInfo.email.slice(11);
        return start + "****" + end;
      } else {
        return "还未绑定";
      }
    },
  },
  mounted() {
    this.getTimeState();
  },
};
</script>

<style scoped>
.header {
  height: 30vh;
  width: 100vw;
  background: linear-gradient(to bottom, rgb(250, 163, 177), pink 85%);
  position: fixed;
  top: 0;
}
.headportrait {
  width: 5rem;
  height: 5rem;
  border-radius: 50%;
  /* background-color: white; */
  position: relative;
  top: 3rem;
  left: 2rem;
}
.nickname {
  /* margin-top: 1rem; */
  /* margin-left: 7rem; */
  position: relative;
  top: 0.2rem;
  left: 8rem;
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
.van-cell-group--inset[data-v-bc0b5f70] {
  margin-top: 0;
}
/deep/.van-uploader__upload {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
}
/deep/.van-image__img {
  width: 100%;
  height: 100%;
  border-radius: 50%;
}
/deep/.van-uploader__wrapper {
  width: 5.5rem;
  height: 5rem;
  border-radius: 50%;
}
/deep/.van-uploader__input {
  width: 100%;
  height: 100%;
  border-radius: 50%;
}
</style>
