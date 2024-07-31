<template>
  <div class="video-box">
    <!--      <img id="streamimage" class="xform" src="./?action=stream" />-->

    <div class="car-name">
      当前操作车辆：
      <div :class="{ on: curIdx == idx}"
           v-for="(item,idx) in videoList" :key="idx"
           @click="chageCar(item,idx)">
        {{item.name}}
      </div>
    </div>
    <div class="video-list">
      <div class="video-item" :class="{ on: curIdx == idx}" v-for="(item,idx) in videoList" :key="idx">
        <video class="video"
               loop="loop" poster="" muted="muted"
               preload="auto" autoplay="autoplay">
          <source :src="item.src">
        </video>

        <img v-if="!item.fullFlag" class="icon" @click="reqFullVideo(item, idx)" src="@/assets/screen/icon23.svg" />
      </div>
      <div class="view-video" v-if="currVideo && currVideo.fullFlag" >
        <video class="full-video"
               loop="loop" poster="" muted="muted"
               preload="auto" autoplay="autoplay">
          <source :src="currVideo.src">
        </video>
        <img class="icon" @click="exitFullVideo" src="@/assets/screen/icon22.svg" />
      </div>
    </div>
  </div>
</template>

<script>
import video1 from '@/assets/video/video1.mp4'
import video2 from '@/assets/video/video2.mp4'
import video3 from '@/assets/video/video3.mp4'
import video4 from '@/assets/video/video4.mp4'
export default {
  name: "videoModule",
  data(){
    return {
      curIdx: 0,
      videoList:[
        { name: '车辆一', src: video1, fullFlag: false },
        { name: '车辆二', src: video2, fullFlag: false },
        { name: '车辆三', src: video3, fullFlag: false },
        { name: '车辆四', src: video4, fullFlag: false },
      ],
      currVideo: {},
      isFull: false
    }
  },
  methods:{
    chageCar(item,idx){
      this.curIdx = idx;
      this.currVideo.fullFlag = false;

      this.$nextTick(() => {
        this.currVideo = item;
       if(this.isFull){
         item.fullFlag = true;
       }
      })
    },
    reqFullVideo(item, idx){
      this.currVideo = item;
      item.fullFlag = true;
      this.isFull = true;
      console.log(this.videoList,'full')
    },
    exitFullVideo(){
      this.currVideo.fullFlag = false;
      this.isFull = false;
    }
  }
}
</script>

<style scoped lang="scss">
.video-box{
  width: calc(100% - 600px);
  .car-name{
    height: 60px;
    display: flex;
    align-items: center;
    background: #222836;
    margin-bottom: 20px;
    border-radius: 8px;
    padding: 20px;
    div{
      padding: 9px 20px;
      border-radius: 20px;
      background: #272e3e;
      margin-right: 20px;
      color: #fff;
      cursor: pointer;
    }
    .on{
      background: linear-gradient(to left, #07E7E5, #0AB1F7);
    }
  }
  .video-list{
    height: 844px;
    display: flex;
    flex-wrap: wrap;
    position: relative;
    .video-item{
      width: calc(50% - 14px);
      height: calc(50% - 14px);
      border-radius: 8px;
      margin-right: 20px;
      border: 2px solid transparent;
      background: #222836;
      position: relative;
      overflow: hidden;
      &:nth-child(even){
        margin-right: 0;
      }
      &:nth-child(1), &:nth-child(2){
        margin-bottom: 20px;
      }
    }
    .video{
      width: 100%;
      height: 100%;
    }
    .on{
      border: 2px solid #1493DA;
      //box-shadow: inset 0 0 2px #1493DA;
    }
    .view-video{
      width: 100%;
      height: 100%;
      position: absolute;
      .full-video{
        width: 100%;
        height: 100%;
        background: #222836;
        position: absolute;
        z-index: 3;
      }
      .icon{
        z-index: 3;
      }
    }

    .icon{
      width: 20px;
      height: 20px;
      position: absolute;
      right: 5px;
      bottom: 5px;
      z-index: 1;
      cursor: pointer;
    }
  }
}
</style>
