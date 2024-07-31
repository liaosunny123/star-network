<template>
  <div style="position:relative;">
    <div :id="id" style=" width: 280px; height: 100px;"></div>
    <div class="bg"></div>
    <div class="txt"><span>{{gaugeValue}}</span>km/h</div>
    <div class="car-btn">
      <img
           :src="getImg(item.flag ? item.active : item.def)"
           v-for="item in carBtn"
           @click="carBtnHandle(item)">
    </div>
  </div>
</template>

<script>
import icon15 from '@/assets/screen/icon15.svg'
export default {
  name: "gauge",
  data() {
    let value = this.gaugeValue / 100;
    let startAngle = 180;
    let endAngle = 0;
    let splitCount = 7; // 刻度数量
    let pointerAngle = (startAngle - endAngle) * (1 - value) + endAngle;

    return {
      icon15,
      myEcharts: null,
      startAngle : 180,
      endAngle : 0,
      splitCount : 7, // 刻度数量
      option: {
        grid: {
          show: false,
          left: "1%", //距离左边的距离
          right: "1%", //距离右边的距离
          bottom: "1%", //距离下边的距离
          top: "1%", //距离上边的距离
        },
        tooltip: {
          show: true, // 是否显示提示框，默认为true
        },
        series: [
          {
            // 值外
            type: "gauge",
            radius: "220%",
            center: ["42%", "106%"],
            startAngle: pointerAngle,
            endAngle: endAngle,
            splitNumber: 4,
            axisLine: {
              show: false,
              lineStyle: {
                width: 3,
                opacity: 0,
              },
            },
            title: { show: false },
            splitLine: { show: false },
            axisTick: {
              length: 15,
              splitNumber: Math.ceil((1 - value) * splitCount),
              lineStyle: {
                color: "#2E3C4C",
                width: 3,
              },
            },
            axisLabel: { show: false },
            pointer: { show: false },
          },
          {
            // 值内
            type: "gauge",
            radius: "220%",
            center: ["42%", "106%"],
            startAngle: startAngle,
            endAngle: pointerAngle,
            splitNumber: 4,
            axisLine: {
              show: false,
              lineStyle: {
                width: 3,
                opacity: 0,
              },
            },
            tooltip: {
              show: true,
            },
            splitLine: { show: false },
            axisTick: {
              length: 15,
              splitNumber: Math.ceil(value * splitCount),
              lineStyle: {
                color: '#0FA0F2',
                width: 3,
              },
            },
            axisLabel: { show: false },
            pointer: { show: false },

          },
          {
            type: "gauge",
            radius: 80,
            center: ["45%", "95%"], // 仪表位置
            z: 1,
            startAngle: 190,
            endAngle: -10,
            splitLine: {
              show: false,
            },
            detail: {
              show: false,
            },
            // 仪表盘的线，颜色值为一个数组
            axisLine: {
              show: false,
            },
            // 仪表盘刻度标签
            axisLabel: {
              show: false,
            },
            // 刻度
            axisTick: {
              show: false
            },
            pointer: { // 仪表盘指针
              show: true, // 是否显示指针
              showAbove: true, // 指针是否显示在标题和仪表盘详情上方
              // icon: `image://${icon15}`, // 标记类型，可选 'circle', 'rect', 'roundRect', 'triangle', 'diamond', 'pin', 'arrow', 'none'
              offsetCenter: [0,0], // 相对于仪表盘中心的偏移位置，数组第一项是水平方向的偏移，第二项是垂直方向的偏移。可以是绝对的数值，也可以是相对于仪表盘半径的百分比。
              length: '45%', // 指针长度，可以是绝对数值，也可以是相对于半径的半分比。
              width: 5, // 指针宽度
              itemStyle: { // 指针样式
                // color/**/: 'auto', // 图形颜色
                // 线性渐变，前四个参数分别是 x0, y0, x2, y2, 范围从 0 - 1，相当于在图形包围盒中的百分比，如果 globalCoord 为 `true`，则该四个值是绝对的像素位置
                color: { // 自定义渐变色
                  type: 'linear',
                  x: 0,
                  y: 0,
                  x2: 0,
                  y2: 1,
                  colorStops: [
                    {
                      offset: 0, color: '#1597A2' // 0% 处的颜色
                    },
                    // {
                    //   offset: 0.25, color: '#1597A2' // 25% 处的颜色
                    // },
                    {
                      offset: 0.75, color: '#20A4EA' // 75% 处的颜色
                    },
                    {
                      offset: 1, color: '#20A4EA' // 100% 处的颜色
                    }
                  ],
                  global: false // 缺省为 false
                },
                // borderColor: '#000', // 图形的描边颜色
                // borderWidth: 3, // 描边线宽。为 0 时无描边
                // borderType: 'solid', // 描边类型，可选：'solid' 'dashed' 'dotted'
              }
            },
            //指针，此设置仅对5.0以上的版本生效
            anchor: {
              show: true,
              // icon: `image://${icon15}`,
              showAbove: true,
              size: 6,
              fraction: 5,
              itemStyle: {
                // borderRadius: 6,
                // borderColor: "#0AB3F6",
                // borderColor: "#f00",
              }
            },
            data: [this.gaugeValue]
          }
        ],
      },
      carBtn: [
        { def: 'icon7', active: 'icon6', status: '0', flag: true },
        { def: 'icon8', active: 'icon14', status: '1', flag: false },
        { def: 'icon11', active: 'icon13', status: '-1', flag: false },
      ],
    };
  },
  props: {
    id: {
      type: String,
      default() {
        return "gaugeEcharts";
      },
    },
    gaugeValue: {
      type: Number,
      default() {
        return 0;
      },
    },
  },
  watch:{
    gaugeValue:{
      deep: true,
      handler(n,o){
        if(n){
          let value = this.gaugeValue / 100;
          let _pointerAngle = (this.startAngle - this.endAngle) * (1 - value) + this.endAngle;
          this.option.series[0].startAngle = _pointerAngle
          this.option.series[1].endAngle = _pointerAngle
          this.option.series[0].axisTick.splitNumber = Math.ceil((1 - value) * this.splitCount)
          this.option.series[1].axisTick.splitNumber = Math.ceil(value * this.splitCount)
          this.option.series[2].data = [n]
          this.myEcharts.setOption(this.option);
        }
      },
    }
  },
  mounted() {
    this.init();
  },
  methods: {
    init() {
      let gaugeEcharts = document.getElementById(this.id);
      this.myEcharts = this.$echarts.init(gaugeEcharts);
      this.myEcharts.setOption(this.option);
    },
    getImg(imgName){
      let imgUrl = new URL(`/src/assets/screen/${imgName}.svg`, import.meta.url).href;
      return imgUrl;
    },
    carBtnHandle(item){
      this.carBtn.forEach(opt => opt.flag = false);
      item.flag = true;
      this.$emit('speedHandle',item);
    },
  },
};
</script>

<style scoped lang="scss">
.bg{
  width: 140px;
  height: 80px;
  background: url("../../../assets/screen/img2.svg") no-repeat left top;
  background-size: 100% 100%;
  position: absolute;
  top: 25px;
  left: 48px;
}
.txt{
  text-align: center;
  padding: 10px 0 14px;
  span{
    color: #fff;
    font-size: 30px;
    font-weight: 700;
    padding-right: 5px;
  }
}
.car-btn{
  width: 160px;
  background: #2C3747;
  height: 40px;
  padding: 0 20px;
  border-radius: 20px;
  display: flex;
  justify-content: space-between;
  margin: 0 auto;
  img{
    width: 40px;
    cursor: pointer;
  }
}
</style>
