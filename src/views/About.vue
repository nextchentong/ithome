<template>
  <div class="content">
    <iframe class="iframe"
            :src="href"></iframe>
  </div>
</template>
<script>
export default {
  data() {
    return {
      href: ''
    }
  },
  created() {
    this.href = this.$route.query.href
    console.log(this.href)
  }
}
</script>
<style lang="stylus" scoped>
.content
  height 100vh
  .iframe
    width 100%
    height 100%
</style>
