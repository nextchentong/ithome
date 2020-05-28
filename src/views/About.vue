<template>
  <div class="content">
    <h1 class="title">{{title}}</h1>
    <div v-html="content">

    </div>

  </div>
</template>
<script>
export default {
  data() {
    return {
      href: '',
      content: '',
      title: ''
    }
  },
  created() {
    this.href = this.$route.query.href
    this.title = this.$route.query.title
    this.$axios
      .post('https://undefined.net.cn/api/ithome-content', {
        href: this.href
      })
      .then(response => {
        console.log(response)
        this.content = response.data
      })
      .catch(function(error) {
        console.log(error)
      })
    console.log(this.href)
  }
}
</script>
<style lang="stylus" scoped>
.content
  color #fff
  padding 5%
  box-sizing border-box
  width 100vw
  overflow hidden
  .title
    font-size 30px
    margin-bottom 10%
  >>> p
    line-height 1.5
    margin 2% 0
  >>> img
    width 100%
    margin 5% 0
</style>
