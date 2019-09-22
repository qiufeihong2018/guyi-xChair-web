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
  props: {
    timeOptions: {
      type: Array,
      default: () => [
        {
          label: '周',
          value: 'week'
        }, {
          label: '月',
          value: 'month'
        }
      ]
    }
  },
  data() {
    return {
      checkedTime: '',
    }
  },
  mounted() {
    this.checkedTime = this.timeOptions[0].value
    this.getTimeRange()
  },
  methods: {
    toggleSwitch(value) {
      this.checkedTime = value
      this.getTimeRange()
    },
    getTimeRange() {
      let today = +new Date(new Date(new Date().toLocaleDateString()).getTime()) // 今天零点
      let end = +new Date()
      let start = 0
      if (this.checkedTime === 'month') {
        start = today - 1000 * 60 * 60 * 24 * 30
      } else if (this.checkedTime === 'week') {
        const day = today - 1000 * 60 * 60 * 24 * 7
        start = today - 1000 * 60 * 60 * 24 * 7
      } else if (this.checkedTime === 'yester') {
        start = today - 1000 * 60 * 60 * 24
        end = today
      } else if (this.checkedTime === 'day') {
        start = today
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
