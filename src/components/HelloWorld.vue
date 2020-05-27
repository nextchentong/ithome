<template>
  <div class="home">
    <div v-for="(item,index) in list"
         :key="index"
         class="item"
         @click="toContent(item.href)">
      <div class="left">
        <h1 class="title">
          {{item.title}}
        </h1>
        <span>{{item.time}}</span>
      </div>
      <img class="img"
           :src="item.img"
           v-if="! (item.img instanceof Array)">
      <img class="img"
           :src="item.img[0]"
           v-else>

    </div>

  </div>
</template>

<script>
export default {
  data() {
    return {
      list: [],
      lastDate: -1
    }
  },
  name: 'HelloWorld',
  props: {
    msg: String
  },
  created() {
    this.$axios({
      url: 'https://undefined.net.cn/api/ithome',
      method: 'GET'
    })
      .then(res => {
        console.log(res.data)
        this.list = res.data
        this.lastDate = Date.parse(this.list[0].lastDate)
      })
      .catch(error => {
        console.log(error)
      })
  },
  mounted() {
    window.onscroll = () => {
      // 变量scrollTop是滚动条滚动时，距离顶部的距离
      const scrollTop =
        document.documentElement.scrollTop || document.body.scrollTop
      // 变量windowHeight是可视区的高度
      const windowHeight =
        document.documentElement.clientHeight || document.body.clientHeight
      // 变量scrollHeight是滚动条的总高度
      const scrollHeight =
        document.documentElement.scrollHeight || document.body.scrollHeight
      // 滚动条到底部的条件
      if (scrollTop + windowHeight === scrollHeight) {
        // 写后台加载数据的函数
        // console.log(
        //   '距顶部' +
        //     scrollTop +
        //     '可视区高度' +
        //     windowHeight +
        //     '滚动条总高度' +
        //     scrollHeight
        // )
        this.debounce(this.nextData(), 50, 300)
      }
    }
  },
  methods: {
    debounce(callBack, delay, intervalTime) {
      var timer = null // 定时器变量
      var time = 0 // 时间变量
      return function() {
        var context = this
        var curTime = new Date() // 当前执行的时间
        clearTimeout(timer) //  清除上次的定时器

        if (!time) {
          time = curTime
        }
        // 当前执行时间距离上次执行的时间是否大于等于间隔时间
        if (curTime - time >= intervalTime) {
          time = curTime
          callBack.apply(context, arguments)
        } else {
          timer = setTimeout(() => {
            callBack.apply(context, arguments)
          }, delay)
        }
      }
    },
    toContent(href) {
      this.$router.push({ name: 'About', query: { href: href } })
    },
    nextData() {
      console.log('执行了')
      this.$axios
        .post('https://undefined.net.cn/api/ithome', {
          time: this.lastDate
        })
        .then(response => {
          const result = response.data
          const data = []
          result.forEach((item, index) => {
            let img = ''
            if (item.images) {
              img = item.images
            } else {
              img = item.image
            }
            data.push({
              title: item.title,
              href: item.WapNewsUrl,
              time: item.orderdate,
              img: img
            })
          })
          this.list = this.list.concat(data)
          this.lastDate = Date.parse(this.list[this.list.length - 1].time)
          console.log('最后:' + this.list[this.list.length - 1].time)
        })
        .catch(function(error) {
          console.log(error)
        })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="stylus">
.home
  .item
    display flex
    margin 3.5% 0
    line-height 1.5
    overflow hidden
    width 100%
    box-sizing border-box
    align-items center
    padding 0 2.5%
    .left
      width 69%
      margin-right 1%
      color #fff
      .title
        margin-bottom 1%
    .img
      width 30%
      object-fit contain
      border-radius 0.2rem
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
