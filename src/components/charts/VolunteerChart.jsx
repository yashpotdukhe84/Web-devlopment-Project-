import React from 'react'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js'
import { Bar } from 'react-chartjs-2'

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
)

const VolunteerChart = ({ volunteers, campaigns }) => {
  // Get volunteer count by campaign category
  const categoryData = campaigns.reduce((acc, campaign) => {
    if (!acc[campaign.category]) {
      acc[campaign.category] = 0
    }
    acc[campaign.category] += campaign.currentVolunteers
    return acc
  }, {})

  const categories = Object.keys(categoryData)
  const volunteerCounts = Object.values(categoryData)

  const data = {
    labels: categories,
    datasets: [
      {
        label: 'Volunteers',
        data: volunteerCounts,
        backgroundColor: [
          'rgba(59, 130, 246, 0.8)',
          'rgba(16, 185, 129, 0.8)',
          'rgba(245, 158, 11, 0.8)',
          'rgba(239, 68, 68, 0.8)',
          'rgba(139, 92, 246, 0.8)',
          'rgba(236, 72, 153, 0.8)',
        ],
        borderColor: [
          'rgba(59, 130, 246, 1)',
          'rgba(16, 185, 129, 1)',
          'rgba(245, 158, 11, 1)',
          'rgba(239, 68, 68, 1)',
          'rgba(139, 92, 246, 1)',
          'rgba(236, 72, 153, 1)',
        ],
        borderWidth: 2,
        borderRadius: 8,
        borderSkipped: false,
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
        text: 'Volunteers by Category',
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
            return `${context.parsed.y} volunteers`
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
          stepSize: 1,
        }
      },
      x: {
        grid: {
          display: false,
        },
        ticks: {
          color: '#6B7280',
          maxRotation: 45,
        }
      },
    },
  }

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <div className="h-80">
        <Bar data={data} options={options} />
      </div>
    </div>
  )
}

export default VolunteerChart
