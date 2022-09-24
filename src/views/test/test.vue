<template>
  <div>
    <van-cell title="选择单个日期" :value="date" @click="show = true" />
    <van-calendar v-model="show" @confirm="" />
  </div>
</template>

<script>
export default {
  data() {
    return {
      show: false,
      date: "",
    };
  },
  methods: {},
};
</script>

<style lang="scss" scoped></style>
