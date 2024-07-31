<template>
  <div class="screen-wrap">
    <screen-head></screen-head>
    <div class="screen-content">
      <video-module></video-module>
      <div class="content-r">
        <equipment-information></equipment-information>
        <direction-module title="车辆方向" :directionList="directionList"></direction-module>
        <card-module title="车辆速度">
          <gauge ref="gauge" :gaugeValue="gaugeVal" @speedHandle="speedHandle"></gauge>
        </card-module>
        <direction-module title="车辆摄像头方向" :directionList="cameraDirection" class="cameraDirection">
          <div class="focal-length">
            <div class="subtract" @click="countHandle('0')"></div>
            <div class="txt">焦距<span>{{count}}</span>mm</div>
            <div class="add" @click="countHandle('1')"></div>
          </div>
        </direction-module>
        <card-module class="mode" title="模式">
          <div class="title">自动导航模式</div>
          <div class="switch"
               @click="automaticValue = !automaticValue"
               :class="automaticValue ? 'open' : 'close'">
            <div class="switch-bar"></div>
            <div class="point"></div>
            <div class="txt">{{ automaticValue ? '开启' : '禁用' }}</div>
          </div>
          <div class="title">手动控制</div>
          <div class="switch"
               @click="handMovementValue = !handMovementValue"
               :class="handMovementValue ? 'open' : 'close'">
            <div class="switch-bar"></div>
            <div class="point"></div>
            <div class="txt">{{ handMovementValue ? '开启' : '禁用' }}</div>
          </div>
        </card-module>
        <base-station-map></base-station-map>
      </div>

    </div>
  </div>
</template>

<script>

import ScreenHead from "./modules/screenHead.vue";
import EquipmentInformation from "./modules/equipmentInformation.vue";
import CardModule from "./modules/cardModule.vue";
import DirectionModule from "./modules/directionModule.vue";
import Gauge from "./modules/gauge.vue";
import BaseStationMap from "./modules/baseStationMap.vue";
import VideoModule from "./modules/videoModule.vue";
export default {
  name: "index",
  components: {VideoModule, BaseStationMap, Gauge, DirectionModule, CardModule, EquipmentInformation, ScreenHead},
  data(){
    return {
      directionList:[
        { def: 'icon9', active: 'icon10', className: 'top', flag: true },
        { def: 'icon9', active: 'icon10', className: 'right', flag: false },
        { def: 'icon9', active: 'icon10', className: 'bot', flag: false },
        { def: 'icon9', active: 'icon10', className: 'left', flag: false },
      ],
      cameraDirection: [
        { def: 'icon4', active: 'icon5', className: 'top', flag: true },
        { def: 'icon4', active: 'icon5', className: 'right', flag: false },
        { def: 'icon4', active: 'icon5', className: 'bot', flag: false },
        { def: 'icon4', active: 'icon5', className: 'left', flag: false },
      ],
      // switchWidth: 0,
      automaticValue: false,
      handMovementValue: false,
      gaugeVal: 96,
      count: 56
    }
  },
  methods:{
    speedHandle(data){
      if(data.status == 1){
        this.gaugeVal += 1
        if(this.gaugeVal >= 100) this.gaugeVal = 100
      }else if(data.status == 0){
        this.gaugeVal -= 1
        if(this.gaugeVal <= 0) this.gaugeVal = 0
      }else{

      }
    },
    countHandle(type){
      if(type == 1){
        this.count += 1
      }else{
        this.count -= 1;
      }
    }
  }
}
</script>

<style scoped lang="scss">
.screen-wrap{
  width: 100%;
  height: 100%;
  overflow: hidden;
  font-size: 16px;
  font-weight: 400;
  color: #B8BAC2;

  .screen-content{
    height: inherit;
    display: flex;
    padding: 20px;

    .content-r{
      width: 580px;
      display: flex;
      flex-wrap: wrap;
      align-content: flex-start;
      margin-left: 20px;

      .cameraDirection{
        .focal-length{
          width: calc(100% - 40px);
          position: absolute;
          top: 194px;
          display: flex;
          align-items: center;
          justify-content: center;
          .txt{
            padding: 0 10px;
            span{
              color: #fff;
              font-size: 30px;
              font-weight: 700;
              padding: 0 5px;
            }
          }
          .subtract, .add{
            width: 40px;
            height: 40px;
            display: inline-block;
            cursor: pointer;
          }
          .subtract{
            background: url("@/assets/screen/icon7.svg") left top;
            &:hover{
              position: relative;
              z-index: 2;
              background: url("@/assets/screen/icon6.svg") left top;
            }
          }
          .add{
            background: url("@/assets/screen/icon8.svg") left top;
            &:hover{
              background: url("@/assets/screen/icon14.svg") left top;
            }
          }
        }
        :deep(.top){
          top: 12px;
          transform: rotate(-90deg);
        }
        :deep(.bot){
          top: 107px;
          transform: rotate(90deg);
        }
        :deep(.left){
          top: 60px;
          transform: rotate(180deg);
        }
        :deep(.right){
          top: 60px;
          transform: rotate(0deg);
        }
      }
      .mode{
        text-align: center;
        .title{
          margin-top: 30px;
        }
        .switch{
          position: relative;
          height: 40px;
          width: 100px;
          border-radius: 20px;
          margin: 10px auto 0;
          overflow: hidden;
          cursor: pointer;
          background: #2C3747;
          .switch-bar{
            height: 100%;
            border-radius: 7px;

          }
          .point{
            width: 26px;
            height: 26px;
            border-radius: 50%;
            background: #A3E8FC;
            position: absolute;
            top: 7px;
            left: 7px;
            transition: 0.3s linear all;
          }
          .txt{
            font-size: 16px;
            font-weight: 400;
            color: #fff;
            position: absolute;
            top: 10px;

          }
        }
        .close.switch{
          background: #2C3747;
          .point{
            left: 7px;
          }
          .txt{
            left: 45px;
          }
        }
        .open.switch{
          background: linear-gradient(to right, #07E7E5, #0AB1F7);
          .point{
            left: 67px;
          }
          .txt{
            left: 25px;
          }
        }
      }
      .base-station-map{
        width: 100%;
        margin-right: 0;
        margin-bottom: 0;
        padding: 0;
      }
    }

  }
}
</style>
