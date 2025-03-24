import React, { useState, useEffect } from 'react';
import { Bar, Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Tooltip,
  Legend,
} from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels'; // นำเข้า plugin

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Tooltip,
  Legend,
  ChartDataLabels // ลงทะเบียน plugin
);

export default function DataAnalytics() {
  const [feedData, setFeedData] = useState([]);

  // ฟังก์ชันดึงข้อมูลจาก ThingSpeak
  const fetchData = () => {
    fetch(
      'https://api.thingspeak.com/channels/2889223/feeds.json?results=100&api_key=C43A8HYXCLC2IJPH'
    )
      .then((res) => res.json())
      .then((data) => {
        const feeds = data.feeds || [];
        setFeedData(feeds);
      })
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    fetchData();
    const intervalId = setInterval(fetchData, 2000);
    return () => clearInterval(intervalId);
  }, []);

  // คำนวณผลรวมของแต่ละ Field
  const sumField1 = feedData.reduce((acc, feed) => acc + (Number(feed.field1) || 0), 0);
  const sumField2 = feedData.reduce((acc, feed) => acc + (Number(feed.field2) || 0), 0);
  const sumField3 = feedData.reduce((acc, feed) => acc + (Number(feed.field3) || 0), 0);

  const totalSum = sumField1 + sumField2 + sumField3;

  // หาว่า Field ไหนมีค่ามากที่สุด
  const maxSum = Math.max(sumField1, sumField2, sumField3);

  let highestBrand = '';
  let highestImage = '';
  if (maxSum === sumField1) {
    highestBrand = 'Grab Food';
    highestImage = '/image/GrabFood.png';
  } else if (maxSum === sumField2) {
    highestBrand = 'Line Man';
    highestImage = '/image/LineMan.jpg';
  } else if (maxSum === sumField3) {
    highestBrand = 'Shopee Food';
    highestImage = '/image/ShopeeFood.jpg';
  }

  // ข้อมูลสำหรับ Bar Chart
  const barChartData = {
    labels: ['Grab Food', 'Line Man', 'Shopee Food'],
    datasets: [
      {
        label: '',
        data: [sumField1, sumField2, sumField3],
        backgroundColor: [
          'rgba(60, 179, 113, 0.6)',
          'rgba(255, 206, 86, 0.6)',
          'rgba(255, 99, 132, 0.6)',
        ],
      },
    ],
  };

  const barChartOptions = {
    responsive: true,
    plugins: {
      legend: { display: false },
    },
    scales: {
      x: {
        grid: { display: false },
      },
      y: {
        beginAtZero: true,
        ticks: { stepSize: 1, precision: 0 },
        grid: { display: false },
      },
    },
  };

  // ข้อมูลสำหรับ Pie Chart
  const pieChartData = {
    labels: ['Grab Food', 'Line Man', 'Shopee Food'],
    datasets: [
      {
        data: [sumField1, sumField2, sumField3],
        backgroundColor: [
          'rgba(60, 179, 113, 0.6)',
          'rgba(255, 206, 86, 0.6)',
          'rgba(255, 99, 132, 0.6)',
        ],
      },
    ],
  };

  // ตั้งค่า Pie Chart ให้แสดงเปอร์เซ็นต์
  const pieChartOptions = {
    plugins: {
      legend: { position: 'top' },
      datalabels: {
        color: '#000',
        font: {
          weight: 'bold',
          size: 14,
        },
        formatter: (value) => {
          return totalSum > 0 ? `${((value / totalSum) * 100).toFixed(2)}%` : '0%';
        },
      },
      tooltip: {
        callbacks: {
          label: (context) => {
            const value = context.parsed || 0;
            const percentage = totalSum ? ((value / totalSum) * 100).toFixed(2) : 0;
            return `${context.label}: ${value} (${percentage}%)`;
          },
        },
      },
    },
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Data Dashboard</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Bar Chart */}
        <div className="bg-white p-4 rounded shadow flex flex-col">
          <h3 className="font-semibold mb-2">
            Bar Chart showing the total preferences for each food delivery brand.
          </h3>
          <Bar data={barChartData} options={barChartOptions} />

          {/* ส่วนแสดงรูปแบรนด์ที่มีค่าสูงสุด */}
          <div className="mt-10 flex flex-col items-center justify-center">
            {maxSum > 0 ? (
              <>
                <p className="text-lg font-semibold mb-5">
                  {highestBrand} has the highest value is {maxSum}
                </p>
                <img
                  src={highestImage}
                  alt={highestBrand}
                  className="w-40 h-40 object-contain"
                />
              </>
            ) : (
              <p className="text-red-500">No data available or all values are zero.</p>
            )}
          </div>
        </div>

        {/* Pie Chart */}
        <div className="bg-white p-4 rounded shadow">
          <h3 className="font-semibold mb-2">Pie Chart: Comparing proportions.</h3>
          <Pie data={pieChartData} options={pieChartOptions} />
        </div>
      </div>
    </div>
  );
}
