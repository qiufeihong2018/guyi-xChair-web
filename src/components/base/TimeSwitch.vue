<template>
  <div class="time-switch">
    <p
      v-for="item in timeOptions"
      :key="item.value"
      class="switch-button"
      :class="checkedTime === item.value ? 'active' : '' "
      @click="toggleSwitch(item.value)">
      {{item.label}}
    </p>
  </div>
</template>

<script>
export default {
  name: 'TimeSwitch',
  data() {
    return {
      checkedTime: 'week',
      timeOptions: [{
        label: '周',
        value: 'week'
      }, {
        label: '月',
        value: 'month'
      }]
    }
  },
  mounted() {
    this.getTimeRange()
  },
  methods: {
    toggleSwitch(value) {
      this.checkedTime = value
      this.getTimeRange()
    },
    getTimeRange() {
      let today = new Date(new Date(new Date().toLocaleDateString()).getTime()) // 今天零点
      const end = +new Date()
      let start = ''
      if (this.checkedTime === 'month') {
        start = +new Date(today.setDate(1))
      } else {
        const day = today.setDate(today.getDate() - today.getDay() + 1)
        start = +new Date(day)
      }
      this.$emit('getTimeRange', {
        start,
        end
      })
    }
  }
}
</script>

<style scoped lang="stylus">
.time-switch {
  position absolute
  right: 50px
  border 1px solid #5dc2fe
  z-index 100
  p {
    display inline-block
    cursor pointer
  }
  .switch-button {
    padding 5px 10px
    z-index 100
  }
  .active {
    background-color #5dc2fe
  }
}
</style>
