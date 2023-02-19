<template>
  <div>
    <div class="header">
      <span @click="goUser" class="title_icon">
      <svg t="1676551117665" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2349" width="20" height="20"><path d="M493.44 152.32L448 106.88 312.32 242.56l-45.44 45.44 45.44 45.44L448 469.12l45.44-45.44L357.76 288l135.68-135.68z" fill="#2C2C2C" p-id="2350"></path><path d="M608 256H320v64h288a224 224 0 0 1 0 448H192a32 32 0 0 0 0 64h416a288 288 0 0 0 0-576z" fill="#2C2C2C" p-id="2351"></path></svg>
      </span>
      <span>账单导出</span>
      <span class="title_text" @click="exportFile">确认</span>
    </div>
    <van-radio-group v-model="radio">
      <van-cell-group>
        <van-cell title="默认导出" clickable>
          <template #right-icon>
            <van-radio name="1" />
          </template>
        </van-cell>
        <van-cell title="自定义导出" clickable>
          <template #right-icon>
            <van-radio name="2" />
          </template>
        </van-cell>
      </van-cell-group>
    </van-radio-group>

    <div class="second" v-show="radio == 2">
      <!-- 开始时间 -->
      <van-cell is-link @click="showPopup1">{{ start }}</van-cell>
      <van-popup v-model="show1" :style="{ width: '80%' }">
        <van-datetime-picker
          v-model="defaultStart"
          type="date"
          title="选择年月日"
          :min-date="minDate"
          :max-date="maxDate"
          @confirm="recordsStartTime"
          @cancel="cancel"
        />
      </van-popup>
      <!-- 结束时间 -->
      <van-cell is-link @click="showPopup2">{{ end }}</van-cell>
      <van-popup v-model="show2" :style="{ width: '80%' }">
        <van-datetime-picker
          v-model="defaultEnd"
          type="date"
          title="选择年月日"
          :min-date="minDate"
          :max-date="maxDate"
          @confirm="recordsEndTime"
          @cancel="cancel"
        />
      </van-popup>
    </div>
  </div>
</template>

<script>
import * as ExcelJs from "exceljs";
import { saveAs } from "file-saver";
import { formatDate } from "@/views/time";
export default {
  mane: "exportFile",
  data() {
    return {
      radio: "1",
      // 时间选择器
      minDate: new Date(2020, 0, 1),
      maxDate: new Date(2025, 10, 1),
      defaultStart: new Date(),
      defaultEnd: new Date(),
      //控制弹出框
      show1: false,
      show2: false,
      //开始和结束时间
      start: "开始时间",
      end: "结束时间",
    };
  },

  methods: {
    showPopup1() {
      this.show1 = true;
    },
    showPopup2() {
      this.show2 = true;
    },
    //时间选择器确认按钮
    recordsStartTime() {
      this.show1 = false;
      this.start = formatDate(this.defaultStart, "yyyy/MM/dd");
    },
    recordsEndTime() {
      this.show2 = false;
      this.end = formatDate(this.defaultEnd, "yyyy/MM/dd");
    },
    //时间选择器取消按钮
    cancel() {
      this.show1 = false;
      this.show2 = false;
    },
    //返回我的页面箭头
    goUser() {
      this.$router.push("/user");
    },
    //确认按钮,准备导出账单
    exportFile() {
      //1、创建workbook
      let workbook = new ExcelJs.Workbook();
      //2、给workbook添加一个worksheet
      let worksheet = workbook.addWorksheet();
      //3、给worksheet设置每一列的表头
      worksheet.columns = [
        { header: "日期", key: "date", width: 20 },
        { header: "记账方式", key: "category", width: 20 },
        { header: "金额", key: "money", width: 20 },
        { header: "类别", key: "project", width: 20 },
      ];
      //4、给worksheet添加数据
      let data = JSON.parse(localStorage.getItem("accuntData"));
      let obj = {};
      let list = [];
      for (let i of data) {
        if (this.radio == "1") {
          for (let k of i.items) {
            obj = {
              date: i.date,
              category: k.category == "expense" ? "支出" : "收入",
              money: Math.abs(k.money).toFixed(2) + "",
              project: k.project,
            };
            list.push(obj);
            list.sort((a, b) => {
              return (
                new Date(b.date.replace(/\//g, "-")).getTime() -
                new Date(a.date.replace(/\//g, "-")).getTime()
              );
            });
            console.log(list);
          }
        } else if (this.radio == "2") {
          if (this.start == "开始时间" || this.end == "结束时间") {
            this.$toast("还没有选择时间");
            return;
          } else if (i.date >= this.start && i.date <= this.end) {
            for (let k of i.items) {
              obj = {
                date: i.date,
                category: k.category == "expense" ? "支出" : "收入",
                money: Math.abs(k.money).toFixed(2) + "",
                project: k.project,
              };
              list.push(obj);
              list.sort((a, b) => {
                return (
                  new Date(b.date.replace(/\//g, "-")).getTime() -
                  new Date(a.date.replace(/\//g, "-")).getTime()
                );
              });
            }
          }
        }
      }
      worksheet.addRows(list);
      //给表头添加颜色
      let headerRow = worksheet.getRow(1); //获取到表格第一行
      //整行单元格都变颜色
      // headerRow.fill={
      //   type:"pattern",
      //   pattern:'solid',
      //   fgColor:{
      //     argb:"DCDCDC"
      //   }
      // }
      //只设置有数据的单元格颜色
      headerRow.eachCell((cell) => {
        cell.fill = {
          type: "pattern",
          pattern: "solid",
          fgColor: {
            argb: "DCDCDC", //注意不写#号
          },
        };
        //设置字体
        cell.font = {
          bold: true,
        };
      });
      //5、将内存的excel导出
      workbook.xlsx.writeBuffer().then((data) => {
        let blob = new Blob([data]);
        saveAs(blob, "记账本.xlsx");
      });
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

.datetime-picker {
  width: 100vw;
  position: fixed;
  bottom: 0;
}
.second {
  margin-left: 1rem;
}
</style>
