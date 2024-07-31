<template>
  <div class="base-station">
    <img  :style="{ left: item.left+'px', top: item.top+'px' }"
         :src="getImg(item.imgName)"
         v-for="item in pointList">
    <div class="tips">
      <div class="normal">基站正常</div>
      <div class="malfunction">基站故障</div>
      <div class="curren">当前车辆位置</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "baseStationMap",
  data(){
    return {
      pointList: [
        { left: 60, top: 23, imgName: 'icon20' },
        { left: 45, top: 160, imgName: 'icon20' },
        { left: 175, top: 90, imgName: 'icon20' },
        { left: 200, top: 180, imgName: 'icon20' },
        { left: 430, top: 100, imgName: 'icon20' },
        { left: 400, top: 180, imgName: 'icon20' },
        { left: 500, top: 80, imgName: 'icon20' },
        { left: 230, top: 110, imgName: 'icon21' },
        { left: 340, top: 50, imgName: 'icon21' },
        { left: 182, top: 150, imgName: 'icon24' },
      ]
    }
  },
  methods:{
    getImg(imgName){
      let imgUrl = new URL(`/src/assets/screen/${imgName}.svg`, import.meta.url).href;
      return imgUrl;
    },
  }
}
</script>

<style scoped lang="scss">
.base-station{
  width: 100%;
  height: 268px;
  background: url("@/assets/screen/img3.svg") left top;
  position: relative;

  img{
    width: 25px;
    position: absolute;
  }
  .tips{
    display: flex;
    position: absolute;
    bottom: 10px;
    left: 20px;
    font-size: 14px;
    font-weight: 400;
    div{
      margin-right: 20px;
    }
  }
  .normal, .malfunction{
    &:before{
      content: '';
      width: 10px;
      height: 10px;
      display: inline-block;
      border-radius: 50%;
      margin-right: 10px;
    }
  }
  .normal{
    &:before{
      background: #2ED39F;
    }
  }
  .malfunction{
    &:before{
      background: #E63E52;
    }
  }
  .curren{
    &:before{
      content: url("@/assets/screen/icon24.svg");
      width: 12px;
      height: 12px;
      display: inline-block;
      margin-right: 10px;
    }
  }
}

</style>
