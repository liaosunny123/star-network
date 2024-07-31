<template>
<div class="equ-wrap">
  <div class="equ-data">
    <div class="item" v-for="(item, idx) in list" :key="idx">
      <div class="name">{{item.name}}</div>
      <div class="val"><span>{{item.value}}</span>{{item.unit}}</div>
    </div>
  </div>
</div>
</template>

<script>
export default {
  name: "equipmentInformation",
  data(){
    return {
      list: [
        { name: '网络延迟', value: '10', unit: 'ms' },
        { name: '数据丢包率', value: '32', unit: '%' },
        { name: '数据传输速率', value: '86', unit: '%' },
      ]
    }
  }
}
</script>

<style scoped lang="scss">
.equ-wrap{
  width: 100%;
  height: fit-content;
  .equ-data{
    background: #222836;
    border-radius: 8px;
    margin-bottom: 20px;
    display: flex;
    justify-content: space-between;
    padding: 15px 20px;
    .item{
      .name{
        font-weight: 400;
        font-size: 16px;
        margin-bottom: 6px;
      }
      span{
        color: #fff;
        font-size: 30px;
        font-weight: 700;
        margin-right: 8px;
      }
    }
  }
}
</style>
