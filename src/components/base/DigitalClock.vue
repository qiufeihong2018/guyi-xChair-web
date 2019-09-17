<template>
  <div>{{ time }}</div>
</template>

<script type="text/ecmascript-6">
export default {
  name: 'DigitalClock',
  components: {},
  data() {
    return {
      time: '',
      intervalId: undefined,
    }
  },
  computed: {},
  created() {
    this.getTime()
  },
  mounted() {
    this.intervalId = setInterval(() => {
      this.getTime()
    }, 1000)
  },
  beforeDestroy() {
    clearInterval(this.intervalId)
  },
  methods: {
    getTime() {
      let date = new Date()// 时间戳为10位需*1000，时间戳为13位的话不需乘1000
      let Y = `${date.getFullYear()}`
      let M = `${date.getMonth() + 1 < 10 ? `0${date.getMonth() + 1}` : date.getMonth() + 1}`
      let D = `${date.getDate() < 10 ? `0${date.getDate()}` : date.getDate()}`
      let h = `${date.getHours() < 10 ? `0${date.getHours()}` : date.getHours()}`
      let m = `${date.getMinutes() < 10 ? `0${date.getMinutes()}` : date.getMinutes()}`
      let s = (date.getSeconds() < 10 ? `0${date.getSeconds()}` : date.getSeconds())
      this.time = `${Y}-${M}-${D} ${h}:${m}:${s}`
    },
  },
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus"></style>
