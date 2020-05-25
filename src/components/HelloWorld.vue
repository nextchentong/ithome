<template>
  <div class="home">
    <div v-for="(item,index) in list"
         :key="index"
         class="item">
      <div v-for="(item2,index2) in item"
           :key="index2"
           class="item2">
        <h1 class="h1">
          <a class="a"
             :href="item2.href">{{item2.title}}</a>
        </h1>
      </div>

    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      list: []
    }
  },
  name: 'HelloWorld',
  props: {
    msg: String
  },
  created() {
    this.$axios
      .get('https://undefined.net.cn/api/ithome', {})
      .then(res => {
        console.log(res.data)
        this.list = res.data
      })
      .catch(error => {
        console.log(error)
      })
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="stylus">
.home
  .item
    .item2
      margin 2% 0
      background-color #556677
      line-height 1.5
      .h1
        a
          color #fff
a
  text-decoration none
a:link /* 未访问的链接 */
  color #000
/* 未访问的链接 */
a:visited /* 已访问的链接 */
  color green
/* 已访问的链接 */
a:hover /* 鼠标移动到链接上 */
  color black
/* 鼠标移动到链接上 */
a:active /* 选定的链接，即鼠标按下去的时候不松开显示的状态 */
  color yellow
/* 选定的链接，即鼠标按下去的时候不松开显示的状态 */
</style>
