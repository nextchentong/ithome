<template>
  <div class="home"  ref="wrapper">
    <div class="content-wrapper">
      <div v-for="(item,index) in list"
           :key="index"
           class="item"
           @click="toContent(item)">
        <div class="left">
          <h1 class="title">
            {{item.title}}
          </h1>
          <span v-if="item.time&&!item.time.time">{{item.time}}</span>
          <span v-if="item.time&&item.time.time">{{item.time.time}}</span>
        </div>
        <img class="
                img"
             :src="item.img"
             v-if="! (item.img instanceof Array)">
        <img class="img"
             :src="item.img[0]"
             v-else>

      </div>
      <div class="back-top"
           v-show="showBackTop"
           @click="goBackTop">Top</div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      scroll: 0,
      list: [],
      lastDate: -1,
      showBackTop: false,
      busy: true
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
        const data = res.data
        data.forEach((item, index) => {
          if (index !== 0) {
            if (item.time) {
              let time = item.time
              time = '今天' + time
              data[index].time = time
            } else {
              data[index].time = '置顶'
            }
          }
        })
        this.list = res.data
        this.lastDate = Date.parse(this.list[0].lastDate)
        this.list.splice(0, 1)
      })
      .catch(error => {
        console.log(error)
      })
  },
  mounted() {
    const listDom = document.getElementsByClassName('content-wrapper')[0]
    const callback = (mutationsList, observer) => {
      for (const mutation of mutationsList) {
        if (mutation.type === 'childList') {
        }
      }
    }
    /**
     * 使用MutationObserver监听列表的 DOM 改变
     */

    const observer = new MutationObserver(callback)
    const config = {
      attributes: true,
      childList: true,
      subtree: true
    }
    observer.observe(listDom, config)
    console.log(listDom)

    /**
     * clientHeight 滚动可视区域高度
     * scrollTop 当前滚动位置
     * scrollHeight 整个滚动高度
     */
    // const scrollDom = document.getElementsByClassName('home')[0]
    const scrollDom = this.$refs.wrapper
    scrollDom.onscroll = () => {
      if (
        scrollDom.clientHeight + parseInt(scrollDom.scrollTop) + 40 >
        scrollDom.scrollHeight
      ) {
        if (this.busy) {
          this.nextData()
        }
      }
      if (scrollDom.scrollTop === 0) {
        this.showBackTop = false
      }
      if (scrollDom.scrollTop >= scrollDom.clientHeight) {
        this.showBackTop = true
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
    goBackTop() {
      this.$refs.wrapper.scrollTop = 0
      // const scrollDom = document.getElementsByClassName('home')[0]
      // scrollDom.scrollTop = 0
      this.showBackTop = false
    },
    toContent(item) {
      const wrapperScrollTop = this.$refs.wrapper.scrollTop
      console.log(wrapperScrollTop)
      this.scroll = wrapperScrollTop
      this.$router.push({
        name: 'About',
        query: {
          href: item.href,
          title: item.title,
          time: item.time.time || item.time
        }
      })
    },
    nextData() {
      this.busy = false
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
            if (item.orderdate) {
              let time = item.orderdate.replace('T', ' ')
              // console.log(this.$moment(time).format('MMMM Do YYYY, HH:mm:ss a'))
              time = this.$moment(time).calendar()

              // const nowTime = new Date().getDate()
              // const year = new Date().getFullYear()
              // if (time.indexOf(nowTime) !== -1) {
              //   time = time.substr(10, 6)
              // }
              // if (time.indexOf(year) !== -1) {
              //   time = time.substr(5)
              // }
              if (item.NewsTips.length === 0) {
                data.push({
                  title: item.title,
                  href: item.WapNewsUrl,
                  time: { time: time, orderdate: item.orderdate },
                  img: img
                })
              }
            }
          })
          this.list = this.list.concat(data)
          this.lastDate = Date.parse(
            this.list[this.list.length - 1].time.orderdate
          )

          console.log('最后:' + this.list[this.list.length - 1].time.orderdate)
          this.busy = true
        })
        .catch(error => {
          console.log(error)
        })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="stylus">
.home
  height 100vh
  overflow auto
  .back-top
    background-color red
    position fixed
    right 5%
    bottom 5%
    border-radius 50%
    width 50px
    height 50px
    display flex
    justify-content center
    align-items center
    background-color #f2f5f6
    box-shadow 0 0 6px rgba(0, 0, 0, 0.12)
    color #1989fa
    font-size 20px
  .content-wrapper
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
        color #000
        .title
          margin-bottom 1%
      .img
        width 30%
        object-fit contain
        border-radius 0.2rem
        height 80.16px
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
