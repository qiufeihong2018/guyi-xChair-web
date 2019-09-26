import { mapState } from 'vuex'
export default {
  data() {
    return {
      
    }
  },
  computed: {
    ...mapState({
      year: state => state.visual.year
    })
  },
  watch: {
    year() {
      this.updateChartByYear()
    }
  },
  methods: {
    updateChartByYear() {
      this.chart.setOption(this.option)
    }
  }
}
