<template>
  <div class="card-wrap">
    <div class="name">{{title}}</div>
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: "cardModule",
  props:{
    title: {
      type: String,
      default: ''
    }
  }
}
</script>

<style scoped lang="scss">
.card-wrap{
  width: 240px;
  height: 228px;
  background: #222836;
  border-radius: 8px;
  margin-bottom: 20px;
  padding: 10px 20px 30px;
  margin-right: 20px;
  position: relative;
  &:nth-child(odd){
    margin-right: 0;
  }
  .name{
    text-align: left;
    font-size: 16px;
    font-weight: 400;
  }
}
</style>
