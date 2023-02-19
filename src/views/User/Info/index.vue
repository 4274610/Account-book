<template>
  <div>
    <div class="header">
      <span class="title_icon" @click="cancel">
        <svg t="1676551117665" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2349" width="20" height="20"><path d="M493.44 152.32L448 106.88 312.32 242.56l-45.44 45.44 45.44 45.44L448 469.12l45.44-45.44L357.76 288l135.68-135.68z" fill="#2C2C2C" p-id="2350"></path><path d="M608 256H320v64h288a224 224 0 0 1 0 448H192a32 32 0 0 0 0 64h416a288 288 0 0 0 0-576z" fill="#2C2C2C" p-id="2351"></path></svg>
      </span>
      <span>个人信息</span>
      <span class="title_text" @click="goUser">确认</span>
    </div>
    <!-- <van-uploader v-model="fileList" :after-read="afterRead"/> -->

    <van-cell-group>
      <!-- 修改昵称 -->
      <van-cell title="昵称" is-link @click="showPopup1"
        >{{ nickname }}&nbsp;&nbsp;</van-cell
      >
      <van-popup v-model="show1" :style="{ width: '86%' }">
        <div class="submitTitle">昵称</div>
        <van-form label-width="50%">
          <van-field
            v-model="username"
            placeholder="请输入用户名"
            :rules="[{ required: true, message: '请填写用户名' }]"
          />
          <div class="submitButton">
            <van-button
              size="small"
              native-type="submit"
              color="pink"
              @click="cancelName"
              >取消</van-button
            >&nbsp;
            <van-button
              size="small"
              native-type="submit"
              color="pink"
              @click="submitName"
              >确定</van-button
            >
          </div>
        </van-form>
      </van-popup>

      <!-- 修改手机号 -->
      <van-cell title="手机号" is-link @click="showPopup2"
        >{{ phone }}&nbsp;&nbsp;
      </van-cell>
      <van-popup v-model="show2" :style="{ width: '86%' }">
        <div class="submitTitle1">手机号</div>
        <van-form>
          <van-field
            v-model="truePhone"
            placeholder="请输入手机号"
            :rules="[{ pattern, required: true, message: '格式不正确' }]"
          />
          <div class="submitButton">
            <van-button
              size="small"
              native-type="submit"
              color="pink"
              @click="cancelPhone"
              >取消</van-button
            >&nbsp;
            <van-button
              size="small"
              native-type="submit"
              color="pink"
              @click="submitPhone"
              >确定</van-button
            >
          </div>
        </van-form>
      </van-popup>

      <!-- 修改邮箱 -->
      <van-cell title="邮箱" is-link @click="showPopup3"
        >{{ email }}&nbsp;&nbsp;
      </van-cell>
      <van-popup v-model="show3" :style="{ width: '86%' }">
        <div class="submitTitle">邮箱</div>
        <van-form>
          <van-field
            v-model="trueEmail"
            placeholder="请输入邮箱"
            :rules="[
              { pattern: pattern1, required: true, message: '格式不正确' },
            ]"
          />
          <div class="submitButton">
            <van-button
              size="small"
              native-type="submit"
              color="pink"
              @click="cancelEmail"
              >取消</van-button
            >&nbsp;
            <van-button
              size="small"
              native-type="submit"
              color="pink"
              @click="submitEmail"
              >确定</van-button
            >
          </div>
        </van-form>
      </van-popup>
    </van-cell-group>
  </div>
</template>

<script>
export default {
  name: "Info",
  data() {
    return {
      defaultImg: "",
      nickname: this.$route.query.nickname,
      show1: false,
      show2: false,
      show3: false,

      username: this.$route.query.nickname,
      truePhone: this.$route.query.truePhone,
      phone: this.$route.query.truePhone,
      trueEmail: this.$route.query.trueEmail,
      email: this.$route.query.trueEmail,
      pattern:
        /^1(3[0-9]|4[01456879]|5[0-35-9]|6[2567]|7[0-8]|8[0-9]|9[0-35-9])\d{8}$/,
      pattern1: /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/,
    };
  },
  methods: {
    showPopup1() {
      this.show1 = true;
    },
    showPopup2() {
      this.show2 = true;
    },
    showPopup3() {
      this.show3 = true;
    },
    //提交修改后的昵称
    submitName() {
      this.nickname = this.username;
      this.show1 = false;
    },
    cancelName() {
      this.username = this.nickname;
      this.show1 = false;
    },
    //修改手机号
    submitPhone() {
      this.show2 = false;
      this.phone = this.truePhone;
    },
    cancelPhone() {
      this.show2 = false;
      this.truePhone = this.phone;
    },
    //修改邮箱
    cancelEmail() {
      this.show3 = false;
      this.trueEmail = this.email;
    },
    submitEmail() {
      this.show3 = false;
      this.email = this.trueEmail;
    },
    goUser() {
      let personInfo = {
        "nickname": this.nickname,
        "phone": this.phone,
        "email": this.email,
      };
      localStorage.setItem("personInfo", JSON.stringify(personInfo));

      this.$router.push({
        path: "/user",
        query: {
          nickname: this.nickname,
          phone: this.phone,
          email: this.email,
        },
      });
    },
    cancel() {
      this.$router.push("/user");
    },
  },
};
</script>

<style scoped>
.header {
  height: 10vh;
  width: 100vw;
  background-color: rgb(252, 175, 188);
  display: flex;
  justify-content: center;
  align-items: center;
  justify-content: space-between;
}
.title_icon {
  margin-left: 1rem;
}
.title_text {
  margin-right: 1rem;
}
.submitButton {
  margin-left: 65%;
  margin-bottom: 1rem;
  margin-top: 1.5rem;
}
.submitTitle {
  margin: 1.5rem;
  margin-left: 45%;
  font-size: 1rem;
}
.submitTitle1 {
  margin: 1.5rem;
  margin-left: 42%;
  font-size: 1rem;
}
</style>
