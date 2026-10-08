import React from 'react'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from 'chart.js'
import { Line } from 'react-chartjs-2'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
)

const DonorImpactChart = ({ donations }) => {
  // Get last 12 months of data
  const getLast12Months = () => {
    const months = []
    const now = new Date()
    for (let i = 11; i >= 0; i--) {
      const date = new Date(now.getFullYear(), now.getMonth() - i, 1)
      months.push(date.toLocaleDateString('en-US', { month: 'short' }))
    }
    return months
  }

  const months = getLast12Months()
  
  // Calculate cumulative donations over time
  const cumulativeDonations = []
  let runningTotal = 0
  
  months.forEach((month, index) => {
    const [monthName] = month.split(' ')
    const monthIndex = new Date(`${monthName} 1, 2024`).getMonth()
    
    const monthlyTotal = donations
      .filter(donation => {
        const donationDate = new Date(donation.createdAt)
        return donationDate.getMonth() === monthIndex
      })
      .reduce((sum, donation) => sum + donation.amount, 0)
    
    runningTotal += monthlyTotal
    cumulativeDonations.push(runningTotal)
  })

  const data = {
    labels: months,
    datasets: [
      {
        label: 'Cumulative Donations',
        data: cumulativeDonations,
        borderColor: 'rgba(16, 185, 129, 1)',
        backgroundColor: 'rgba(16, 185, 129, 0.1)',
        borderWidth: 3,
        fill: true,
        tension: 0.4,
        pointBackgroundColor: 'rgba(16, 185, 129, 1)',
        pointBorderColor: '#fff',
        pointBorderWidth: 2,
        pointRadius: 6,
        pointHoverRadius: 8,
      },
    ],
  }

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          color: '#374151',
          font: {
            size: 12,
            weight: '500'
          }
        }
      },
      title: {
        display: true,
        text: 'Donor Impact Over Time',
        color: '#111827',
        font: {
          size: 16,
          weight: 'bold'
        }
      },
      tooltip: {
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        titleColor: '#fff',
        bodyColor: '#fff',
        borderColor: 'rgba(255, 255, 255, 0.1)',
        borderWidth: 1,
        callbacks: {
          label: function(context) {
            return `Total: $${context.parsed.y.toLocaleString()}`
          }
        }
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          color: 'rgba(0, 0, 0, 0.1)',
        },
        ticks: {
          color: '#6B7280',
          callback: function(value) {
            return '$' + value.toLocaleString()
          }
        }
      },
      x: {
        grid: {
          display: false,
        },
        ticks: {
          color: '#6B7280',
        }
      },
    },
    elements: {
      point: {
        hoverBackgroundColor: 'rgba(16, 185, 129, 1)',
      }
    }
  }

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <div className="h-80">
        <Line data={data} options={options} />
      </div>
    </div>
  )
}

export default DonorImpactChart
