import { ref, onMounted, onUnmounted } from 'vue'
import {
  Chart,
  LineController,
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js'

// Register Chart.js components
Chart.register(
  LineController,
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Title,
  Tooltip,
  Legend,
  Filler
)

export function useChart(canvasRef) {
  const chart = ref(null)

  const createChart = (config) => {
    if (chart.value) {
      chart.value.destroy()
    }

    if (canvasRef.value) {
      chart.value = new Chart(canvasRef.value, config)
    }
  }

  const updateChart = (data) => {
    if (chart.value) {
      chart.value.data = data
      chart.value.update()
    }
  }

  const destroyChart = () => {
    if (chart.value) {
      chart.value.destroy()
      chart.value = null
    }
  }

  onUnmounted(() => {
    destroyChart()
  })

  return {
    chart,
    createChart,
    updateChart,
    destroyChart
  }
}

export function createTemperatureChartConfig(labels, temperatures) {
  return {
    type: 'line',
    data: {
      labels,
      datasets: [
        {
          label: 'Temperatura (°C)',
          data: temperatures,
          borderColor: 'rgb(255, 99, 132)',
          backgroundColor: 'rgba(255, 99, 132, 0.1)',
          fill: true,
          tension: 0.4
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          display: true,
          position: 'top'
        },
        tooltip: {
          mode: 'index',
          intersect: false
        }
      },
      scales: {
        y: {
          beginAtZero: false,
          ticks: {
            callback: (value) => `${value}°C`
          }
        }
      }
    }
  }
}
