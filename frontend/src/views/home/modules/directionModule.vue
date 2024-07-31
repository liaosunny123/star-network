<template>
  <card-module :title="title">
    <div class="vehicle-direction">
      <img :class="item.className"
           :src="getImg(item.flag ? item.active : item.def)"
           v-for="item in directionData"
           @click="directionHandle(item)">
    </div>
    <slot></slot>
  </card-module>
</template>

<script>
import CardModule from "./cardModule.vue";
export default {
  name: "directionModule",
  components: {CardModule},
  props:{
    title: {
      type: String,
      default: ''
    },
    directionList: {
      type: Array,
      default: []
    }
  },
  data(){
    return {
      directionData: JSON.parse(JSON.stringify(this.directionList))
    }
  },
  methods:{
    getImg(imgName){
      let imgUrl = new URL(`/src/assets/screen/${imgName}.svg`, import.meta.url).href;
      return imgUrl;
    },
    directionHandle(item){
      this.directionData.forEach(opt => opt.flag = false);
      item.flag = true;
    }
  }
}
</script>

<style scoped lang="scss">
.vehicle-direction{
  width: 100%;
  position: relative;
  img{
    width: 40px;
    position: absolute;
    cursor: pointer;
  }
  .top{
    top: 38px;
    left: 100px;
  }
  .right{
    top: 84px;
    left: 148px;
    transform: rotate(90deg);
    transform-origin: center;
  }
  .bot{
    top: 131px;
    left: 100px;
    transform: rotate(60deg);
    transform-origin: center;
  }
  .left{
    top: 84px;
    left: 54px;
    transform: rotate(30deg);
    transform-origin: center;
  }
}
</style>
