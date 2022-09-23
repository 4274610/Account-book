<template>
  <div>
    <div class="header">
      <span class="title_icon">
        <svg
          t="1663239639867"
          class="icon"
          viewBox="0 0 1024 1024"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          p-id="11904"
          width="20"
          height="20"
        >
          <path
            d="M257.2 567.1h584.5c29 0 52.5-23.4 52.5-52.2V512c0-28.8-23.5-52.2-52.5-52.2H255.9L431 284.1c20.2-20.3 20.2-53 0-73.3l-0.4-0.4c-20.2-20.3-53.1-20.5-73.6-0.5l-0.5 0.5L71.8 496.1a26.013 26.013 0 0 0 0 36.7l55.7 55.9L352 813.8c20.4 20.5 53.7 20.6 74.3 0.4l0.4-0.4 1.7-1.7c20.3-20.3 20.3-53.1 0-73.4L257.2 567.1z"
            p-id="11905"
            fill="#5A5A5A"
          ></path>
        </svg>
      </span>
      <span>个人信息</span>
      <span class="title_text">确认</span>
    </div>
    <van-uploader v-model="fileList" :after-read="afterRead"/>

    <van-cell-group>
      <van-cell title="昵称"
        >{{ nickname }}&nbsp;&nbsp;<van-icon name="arrow"
      /></van-cell>
      <van-cell title="手机号"
        >{{}}&nbsp;&nbsp;<van-icon name="arrow"
      /></van-cell>
      <van-cell title="邮箱"
        >{{}}&nbsp;&nbsp;<van-icon name="arrow"
      /></van-cell>
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
        fileList: [
          { url: 'https://img01.yzcdn.cn/vant/leaf.jpg' },
          // Uploader 根据文件后缀来判断是否为图片文件
          // 如果图片 URL 中不包含类型信息，可以添加 isImage 标记来声明
          { url: 'https://cloud-image', isImage: true },
        ],
    };
  },
  mounted() {
    this.$bus.$on("sendInfo", (nickname) => {
      this.nickname = nickname;
      console.log(nickname);
    });
  },
  methods: {
    afterRead(file) {
      // 此时可以自行将文件上传至服务器
      console.log(1111111, file);
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
</style>
