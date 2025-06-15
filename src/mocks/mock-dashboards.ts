import { Dashboard } from '../app/store/dashboard.state';

export const MOCK_DASHBOARDS: Dashboard[] = [
  {
    id: 1,
    name: 'Simulation Field Model Dashboard',
    description: 'Medical simulation and field data analysis',
    charts: [
      {
        id: 101,
        title: 'Patient Accrual',
        type: 'line',
        xName: 'Initial upload date',
        yName: 'Patients',
        data: {
          labels: ['Male', 'Female', 'Jul-2023', 'Aug-2023', 'Sep-2023', 'Oct-2023', 'Nov-2023', 'Dec-2023', 'Jan-2024', 'Feb-2024', 'Mar-2024', 'Apr-2024'],
          datasets: [{
            label: 'Patients',
            data: [1, 0, 0, 1, 0, 0, 0, 0, 3, 0, 2, 0],
            borderColor: '#d4a421',
            backgroundColor: 'rgba(212, 164, 33, 0.1)',
            tension: 0.1,
            pointBackgroundColor: '#d4a421',
            pointBorderColor: '#d4a421',
            pointRadius: 4
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: { display: false },
            title: { display: false }
          },
          scales: {
            x: { 
                title: {
                display: true,
                text: 'Gender', // X-axis label
                color: '#ffffff', // White color for your dark theme
                font: {
                  size: 12,
                  weight: 'bold'
                },
                padding: { top: 10 } // Space between axis and label
              },
              ticks: { color: '#888888', font: { size: 11 } }, 
              grid: { color: '#404040' },
              border: { color: '#404040' }
            },
            y: { 
              title: {
                display: true,
                text: 'Age', // Y-axis label
                color: '#ffffff',
                font: {
                  size: 12,
                  weight: 'bold'
                },
                padding: { bottom: 10 } // Space between axis and label
              },
              ticks: { color: '#888888', font: { size: 11 } }, 
              grid: { color: '#404040' },
              border: { color: '#404040' }
            }
          }
        }
      },
      {
        id: 102,
        title: 'Patient Gender',
        type: 'pie',
        xName: 'Gender',
        yName: 'Age',
        data: {
          labels: ['Male', 'Female'],
          datasets: [{
            data: [42.86, 57.14],
            backgroundColor: ['#9c4dcc', '#f8bbd9'],
            borderWidth: 0
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: { 
              display: true,
              position: 'right',
              labels: { 
                color: '#ffffff',
                font: { size: 12 },
                usePointStyle: true
              }
            }
          }
        }
      }
    ]
  },
  {
    id: 2,
    name: 'Lead Contacts Dashboard',
    description: 'Lead generation and contact management',
    charts: [
      {
        id: 201,
        title: 'Leads by Month',
        type: 'bar',
        xName: 'Leads',
        yName: 'Month',
        data: {
          labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
          datasets: [{
            label: 'Leads',
            data: [12, 19, 7, 14, 20, 9],
            backgroundColor: '#2196F3'
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: { display: false },
            title: { display: true, text: 'Leads by Month', color: '#ffffff' }
          },
          scales: {
            x: { ticks: { color: '#ffffff' }, grid: { color: '#4a4a4a' } },
            y: { ticks: { color: '#ffffff' }, grid: { color: '#4a4a4a' } }
          }
        }
      },
      {
        id: 202,
        title: 'Lead Source Distribution',
        type: 'pie',
        xName: 'Lead',
        yName: 'Source',
        data: {
          labels: ['Web', 'Referral', 'Event', 'Other'],
          datasets: [{
            data: [40, 25, 20, 15],
            backgroundColor: ['#4CAF50', '#FFC107', '#F44336', '#9C27B0'],
            borderWidth: 0
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              display: true,
              position: 'right',
              labels: {
                color: '#ffffff',
                font: { size: 12 },
                usePointStyle: true
              }
            }
          }
        }
      }
    ]
  },
  {
    id: 3,
    name: 'Fiber Tracts Dashboard',
    description: 'Network fiber and tract analysis',
    charts: []
  }
]; 