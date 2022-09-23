<template>
<div class="outer-container">
  <!-- 遮罩层 -->
    <!-- <van-popup v-model="show" position="bottom " @click-overlay="goAccounting"> -->
    <div class="header">
      <span @click="goAccounting">
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

    </div>
    <div class="container">
    <div class="category">
      <span v-if="category">
        <van-icon :name="category.icon" color="rgb(250, 90, 117)"/>&nbsp;{{category.text}}
      </span>
      <span>{{ operator }}</span>
    </div>
    <!-- 日期选择器 -->
    <div class="operate">
      <span><AcountingDate @selectedTime="selected_time"></AcountingDate></span>
      <!-- <span>
        <span><van-icon name="edit" size="1rem" /></span>
        <span><van-icon name="photo-o" size="1rem" /></span>
      </span> -->
    </div>

    <!-- 简易计算器功能 -->  
    <van-grid :column-num="4"  clickable >
      <van-grid-item
        v-for="(keyword, index) in keywords"
        :key="index"
        :text="keyword"
        @click="calculator(keyword)"
        
      />
    </van-grid>
  </div>
 <!-- </van-popup> -->
</div>
</template>

<script>
export default {
  name: "Edit",
  // props: ["expense"],
  components: {
    AcountingDate: () => import("./AcountingDate"),
  },
  data() {
    return {
      show:true,
      category: "",
      // selected_timeValue: "",
      flag: false,
      //16个按键的值
      keywords: [
        "7",
        "8",
        "9",
        "清除",
        "4",
        "5",
        "6",
        "+",
        "1",
        "2",
        "3",
        "-",
        ".",
        "0",
        "=",
        "确认",
      ],
      operator: (0.0).toFixed(2),
      result: "",
      timeValue: "",
    };
  },
  mounted() {
    if(this.$route.query.category){
      this.category = this.$route.query.category
    }
  },
  computed: {
    //获取记录消费时的时间
    selected_timeValue() {
      if (this.timeValue) {
        return this.timeValue;
      } else {
        return this.today;
      }
    },
    today() {
      let nowTime = new Date();
      let year = nowTime.getFullYear();
      let month = nowTime.getMonth() + 1;
      let day = nowTime.getDate();
      month = month < 10 ? "0" + month : month;
      day = day < 10 ? "0" + day : day;
      return `${year}/${month}/${day}`;
    },
  },
  methods: {
    goAccounting(){
      this.$toast('取消添加');
       this.$router.push("/accounting")
    },
    //接收更改选中的时间数据
    selected_time(date) {
      this.timeValue = date;
    },
    // 简易计算器功能
    calculator(keyword) {
      if (this.flag) {
        if (/^[0-9]$/.test(keyword)) {
          this.operator = "";
        }
        this.flag = false;
      }

      if (this.operator == "0.00") {
        this.operator = "";
      }

      if (
        this.operator.length == 0 ||
        (this.operator.length == 1 && this.operator == "0")
      ) {
        //首次
        if (/^[0-9]$/.test(keyword)) {
          this.operator = keyword;
        } else {
          if (keyword == "=") {
            if (this.flag) {
              this.flag = false;
              return;
            }
            this.operator = eval(this.operator).toFixed(2);
            this.flag = true;
          } else if (keyword == "清除") {
            if (this.operator.length == 1 || this.operator.length == 0) {
              this.operator = "0";
            } else {
              this.operator = this.operator.substring(
                0,
                this.operator.length - 1
              );
            }
          } else if (keyword == "确认") {
            this.flag = false;
            return 0.0;
          } else {
            let arr = this.operator.split("");
            let str = arr[this.operator.length - 1];
            let list = ["+", "-", "."];
            if (!(list.includes(str) && list.includes(keyword))) {
              this.operator += keyword;
            }
          }
        }
      } else {
        //后续的
        if (keyword == "=") {
          if (this.flag) {
            this.flag = false;
            return;
          }
          this.operator = eval(this.operator).toFixed(2);
          this.flag = true;
        } else if (keyword == "清除") {
          if (this.operator.length == 1) {
            this.operator = "0";
          } else {
            this.operator = this.operator.substring(
              0,
              this.operator.length - 1
            );
          }
        } else if (keyword == ".") {
          let arr = this.operator.split("");
          let str = arr[this.operator.length - 1];
          console.log(12121);
          let bol = false;
          console.log("arr", arr.includes("."));
          if (arr.includes(".")) {
            console.log("h_list");
            let spit_arr = this.operator.split(".");
            let obj = spit_arr[spit_arr.length - 1];
            let h_list = obj.split("");
            console.log("h_list", h_list);
            bol = h_list.every((e) => {
              return /^[0-9]$/.test(e);
            });
          }
          if (keyword != str && !bol) {
            this.operator += keyword;
          }
        } else if (keyword == "确认") {
          this.operator = eval(this.operator).toFixed(2);
          this.flag = true;
          //整理数据
          let money = 0;
          if (this.$route.query.category) {
            if (this.$route.query.category.type == "expense") {
              money = "-" + this.operator;
            } else if(this.$route.query.category.type == "income") {
              money = "+" + this.operator;
            }else return;
          }
          const payDetail = {
            icon: this.$route.query.category.icon,
            project: this.$route.query.category.text,
            money,
            category:this.$route.query.category.type,
          };
          let date_list = {
            date: this.selected_timeValue,
            items: [payDetail],
          };

          let oldList = JSON.parse(localStorage.getItem("accuntData")); //数组
          if (oldList) {
            //判断数组里有没有该日期的数据
            if (
              oldList.findIndex(
                (item) => item.date == this.selected_timeValue
              ) != -1
            ) {
              let idx = oldList.findIndex(
                (item) => item.date == this.selected_timeValue
              );
              oldList[idx].items.push(payDetail);
            } else {
              oldList.push(date_list); 
            }
            localStorage.setItem("accuntData", JSON.stringify(oldList));
          } else {
            let newlist = [];
            newlist.push(date_list);
            console.log(newlist);
            localStorage.setItem("accuntData", JSON.stringify(newlist));
          }
          this.$toast('添加成功');
          this.$router.push("/accounting");
        } else {
          let arr = this.operator.split("");
          let str = arr[this.operator.length - 1];
          let list = ["+", "-"];
          if (!(list.includes(str) && list.includes(keyword))) {
            this.operator += keyword;
          }
        }
      }
    }
  },
};
</script>

<style scoped>
.outer-container{
height:100vh;
width:100vw;
}
.container{
 width:100vw;
 position: fixed;
 bottom:0rem;
 background-color: white;
}
/deep/.van-grid-item{
    height:6rem;
  }

.header{
  height: 10vh;
  width:100vw;
  background-color: rgb(252, 175, 188);
  display: flex;
  align-items: center;

}
.header span {
  margin-left:1rem
}
.category {
  display: flex;
  justify-content: space-between;
  margin-top:2rem;
}
.category span {
  margin: 0 1rem 2rem 1rem;
  font-size: 1.2rem;
}
.operate {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 2rem;
  border-bottom: 1px solid black;
}
.operate span {
  margin: 1rem;
  font-size: 12px;
}
/deep/.van-grid-item__text {
  font-size: 1.2rem;
}
</style>
