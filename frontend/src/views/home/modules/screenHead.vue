<template>
  <div class="screen-head">
    <img class="logo" src="@/assets/screen/logo.svg" />
    <div class="head-r">
      <div class="item">
        <img src="@/assets/screen/icon1.svg">
        车辆电量：
        <div class="bar-box">
          <span class="bar" :style="{ width: barWidth+'%' }"></span>
        </div>
        <label>{{barWidth}}%</label>
      </div>
      <div class="item">
        <img src="@/assets/screen/icon2.svg">
        车辆位置：<label>新疆维吾尔自治区塔克拉玛沙漠</label>
      </div>
      <div class="item">
        <img src="@/assets/screen/icon3.svg">
        车辆状态：<span class="c-green">正常行驶</span>
      </div>
      <div class="weather" style="border-right: 1px solid #B8BAC2; padding-right: 14px; margin-right: 14px">
        <img src="@/assets/screen/icon16.svg" width="36">
        <div>
          <div>晴</div>
          <div>26.5℃</div>
        </div>
      </div>
      <div class="weather">
        <div class="time">{{time}}</div>
        <div>
          <div>{{ week }}</div>
          <div>{{ date }}</div>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
export default {
  name: "screenHead",
  data(){
    return {
      time: "",
      date: "",
      week: '',
      barWidth: 72
    }
  },
  created() {
    this.getTime();
    setInterval(() => {
      this.getTime();
    },1000)
    this.getDate();
  },
  methods:{
    getTime() {
      let d = new Date();
      let hours = d.getHours() < 10 ? "0" + d.getHours() : d.getHours();
      let minutes = d.getMinutes() < 10 ? "0" + d.getMinutes() : d.getMinutes();
      let seconds = d.getSeconds() < 10 ? "0" + d.getSeconds() : d.getSeconds();
      this.time = hours + ":" + minutes + ":" + seconds;
    },
    getDate() {
      let d = new Date();
      let years = d.getFullYear();
      let month =
          d.getMonth() + 1 < 10 ? "0" + (d.getMonth() + 1) : d.getMonth() + 1;
      let days = d.getDate() < 10 ? "0" + d.getDate() : d.getDate();

      let weekDay = d.getDay();
      let weekDayChinese = "";
      switch(weekDay) {
        case 0:
          weekDayChinese = "星期日";
          break;
        case 1:
          weekDayChinese = "星期一";
          break;
        case 2:
          weekDayChinese = "星期二";
          break;
        case 3:
          weekDayChinese = "星期三";
          break;
        case 4:
          weekDayChinese = "星期四";
          break;
        case 5:
          weekDayChinese = "星期五";
          break;
        case 6:
          weekDayChinese = "星期六";
          break;
      }

      this.date = years + "." + month + "." + days;
      this.week = weekDayChinese;
    },
  }
}
</script>

<style scoped lang="scss">
.screen-head{
  height: 40px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #272e3e;
  color: #B8BAC2;
  padding: 20px 20px 20px 30px;

  .logo{
    width: 400px;
    height: 40px;
  }
  .head-r{
    display: flex;
    align-items: center;
    font-size: 16px;
    font-weight: 400;

    .item{
      display: flex;
      margin-right: 30px;
      &:last-child{
        margin-right: 0;
      }
      label{
        color: #fff;
      }
      img{
        width: 16px;
        margin-right: 3px;
      }
      .c-green{
        color: #00AD7F;
      }
      .bar-box{
        position: relative;
        height: 20px;
        width: 80px;
        border-radius: 10px;
        background: #1e232d;
        overflow: hidden;
        margin-right: 10px;
        .bar{
          height: 100%;
          border-radius: 10px;
          background: linear-gradient(to right, #06B282 , #41E1AA);
          display: block;
        }
      }
    }
    .weather{
      display: flex;
      img{
        margin-right: 10px;
      }
      .time{
        width: 150px;
        font-family: "Microsoft YaHei";
        font-size: 36px;
        margin-right: 12px;
      }
    }
  }
}
</style>
