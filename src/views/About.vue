<template>
  <div class="content">
    <h1 class="title">{{title}}</h1>
    <h2 class="time">{{time}}</h2>
    <div v-html="content">

    </div>

  </div>
</template>
<script>
export default {
  name: 'About',
  data() {
    return {
      href: '',
      content: '',
      title: '',
      time: ''
    }
  },
  created() {
    this.href = this.$route.query.href
    this.title = this.$route.query.title
    this.time = this.$route.query.time
    this.$axios
      .post('https://undefined.net.cn/api/ithome-content', {
        href: this.href
      })
      .then(response => {
        console.log(response.data)
        console.log(response.data.indexOf('<dir>'))
        if (response.data.indexOf('<dir>') !== -1) {
          this.content = response.data.substring(
            0,
            response.data.indexOf('<dir>')
          )
        } else {
          this.content = response.data
        }
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
  color #000
  padding 5%
  box-sizing border-box
  width 100vw
  overflow hidden
  >>> a
    color #d22222
    border-bottom solid 0.1rem #d22222
    text-decoration none
  .title
    font-size 30px
    margin-bottom 2.5%
    line-height 1.5
  .time
    font-size 20px
    margin-bottom 5%
  >>> p
    line-height 1.5
    margin 2% 0
  >>> img
    width 100%
    margin 5% 0
</style>
