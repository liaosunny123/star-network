<template>
  <router-view />
</template>

<script>
import autofit from 'autofit.js'
export default {
  mounted() {
    autofit.init({
      designHeight: 1080,
      designWidth: 1920,
      renderDom:"#app",
      resize: true
    })
  },
}
</script>
<style scoped lang="scss">

</style>
