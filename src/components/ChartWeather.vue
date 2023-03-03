<template>
  <div class="card__graphik">
    <div class="card__graphik-title">Chart Temparerature</div>
    <canvas ref="chartRef"></canvas>
  </div>
</template>

<script setup>
import Chart from 'chart.js/auto'
import { computed, ref, onMounted, watch, onUnmounted, defineProps } from 'vue'

const props = defineProps({
  data: {
    type: Array,
    required: true
  }
})
const weatherChartData = computed(() => ({
  type: 'line',
  color: 'rgb(75, 192, 192)',
  data: {
    labels: props.data?.map((item) => item.dt),
    datasets: [
      {
        label: false,
        data: props.data?.map((item) => item.temp),
        fill: false,
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.4
      }
    ]
  },
  options: {
    plugins: {
      legend: {
        display: false
      }
    },
    scales: {
      x: {
        display: true,
        ticks: {
          color: '#fff'
        },
        title: {
          display: true,
          text: 'Date',
          color: '#0091BF'
        }
      },
      y: {
        display: true,
        ticks: {
          color: '#fff'
        },
        title: {
          display: true,
          text: 'Temp °C',
          color: '#0091BF'
        }
      }
    }
  }
}))

const chartRef = ref()
const renderChart = () => {
  chart = new Chart(chartRef.value, weatherChartData.value)
}
let chart
onMounted(() => {
  if (props.data) {
    renderChart()
  }
})
watch(
  () => props.data,
  () => {
    if (chart) {
      chart.destroy()
      renderChart()
    }
  }
)
onUnmounted(() => {
  if (chart) {
    chart.destroy()
  }
})
</script>

<style lang="scss" scoped>
.card {
  &__graphik {
  }
  // .card__graphik-title
  &__graphik-title {
    font-weight: 700;
    margin-bottom: 20px;
    font-size: 30px;
    @media (max-width: $mobile) {
      font-size: 20px;
    }
  }
}
</style>
