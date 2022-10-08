<template>

  <div class="col-md-6">
    <div id="line-chart">
      <Line :chart-data="chartData" :chart-options="chartOptions"/>
    </div>
  </div>
</template>

<script setup>
import {ref, computed} from 'vue'
import {Line} from 'vue-chartjs'
import {Chart as ChartJS, Title, Tooltip, Legend, LineElement, LinearScale, PointElement, CategoryScale} from 'chart.js'
import {useMortgageStore} from "../stores/mortgageSchedule";

const mortgageStore = useMortgageStore()
ChartJS.register(Title, Tooltip, Legend, LineElement, LinearScale, PointElement, CategoryScale)

let monthlyCount = [];
for (let i = 0; i <= 360; i++) {
  monthlyCount.push(i);
}

const name = ref('LineChart')

const chartData = computed(() => ({
  labels: monthlyCount,
  datasets: mortgageStore.datasets
}))

const chartOptions = computed(() => ({
  responsive: true,
  scales: {
    x: {
      max: 180,
    },
    y: {
      min: 0
    }
  }
}))
</script>

<style scoped>

</style>